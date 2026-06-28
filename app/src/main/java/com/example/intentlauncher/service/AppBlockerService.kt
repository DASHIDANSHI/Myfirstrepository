package com.example.intentlauncher.service

import android.accessibilityservice.AccessibilityService
import android.os.Handler
import android.os.Looper
import android.view.accessibility.AccessibilityEvent
import android.widget.Toast
import com.example.intentlauncher.data.BlockerStore

/**
 * 前面に出ているアプリを見張る役。
 *
 * - がまんリストのアプリが「許可セッション中」なら、終了時刻にホームへ戻して閉じる。
 * - 許可セッションが無い（＝検索→確認→時間決めの手順を踏まずに開いた）なら、すぐホームへ戻す。
 *
 * これを動かすには、端末の「設定 → ユーザー補助」でこのサービスをONにする必要がある。
 */
class AppBlockerService : AccessibilityService() {

    private val handler = Handler(Looper.getMainLooper())
    private var kickRunnable: Runnable? = null
    private lateinit var store: BlockerStore

    override fun onCreate() {
        super.onCreate()
        store = BlockerStore(this)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event?.eventType != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) return
        val pkg = event.packageName?.toString() ?: return

        // 画面が変わるたびに、予約していた「閉じる」をいったん取り消して評価し直す。
        cancelKick()

        if (pkg == packageName) return // 自分（ランチャー）は対象外

        val friction = store.getFrictionPackages()
        if (pkg !in friction) return // がまんリスト以外は何もしない

        val now = System.currentTimeMillis()
        if (store.isSessionActive(pkg, now)) {
            // 許可中。残り時間が経ったら閉じるよう予約する。
            scheduleKick(store.endTime() - now)
        } else {
            // 手順を踏んでいない or 時間切れ → すぐ閉じる。
            blockNow(timeUp = false)
        }
    }

    private fun scheduleKick(delayMs: Long) {
        val r = Runnable { blockNow(timeUp = true) }
        kickRunnable = r
        handler.postDelayed(r, delayMs.coerceAtLeast(0L))
    }

    private fun cancelKick() {
        kickRunnable?.let { handler.removeCallbacks(it) }
        kickRunnable = null
    }

    private fun blockNow(timeUp: Boolean) {
        store.clearSession()
        val msg = if (timeUp) "時間になりました。おつかれさま！" else "ここからは開けません。目的を選んでね。"
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
        performGlobalAction(GLOBAL_ACTION_HOME)
    }

    override fun onInterrupt() {}

    override fun onDestroy() {
        cancelKick()
        super.onDestroy()
    }
}
