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
 * - がまんリストのアプリが「許可セッション中」なら、1秒ごとに残り時間を見張り、
 *   終了時刻になったらホームへ戻して閉じる。
 * - 許可セッションが無い（＝検索→確認→時間決めの手順を踏まずに開いた）なら、すぐホームへ戻す。
 *
 * これを動かすには、端末の「設定 → ユーザー補助」でこのサービスをONにする必要がある。
 */
class AppBlockerService : AccessibilityService() {

    private val handler = Handler(Looper.getMainLooper())
    private var monitor: Runnable? = null
    private lateinit var store: BlockerStore

    override fun onCreate() {
        super.onCreate()
        store = BlockerStore(this)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event?.eventType != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) return
        val pkg = event.packageName?.toString() ?: return

        val friction = store.getFrictionPackages()
        val now = System.currentTimeMillis()

        when {
            pkg in friction -> {
                if (store.isSessionActive(pkg, now)) {
                    // 許可中。時間切れを1秒ごとに見張り続ける。
                    // （キーボードなど別ウィンドウが出ても止めないのがポイント）
                    startMonitor()
                } else {
                    // 手順を踏んでいない or 時間切れ → すぐ閉じる。
                    stopMonitor()
                    blockNow(timeUp = false)
                }
            }
            // キーボードや他アプリの一時的なウィンドウでは何もしない（見張りは維持）。
        }
    }

    /** 1秒ごとに残り時間をチェックする見張りを開始（多重起動しない）。 */
    private fun startMonitor() {
        if (monitor != null) return
        val r = object : Runnable {
            override fun run() {
                val active = store.activePackage()
                if (active == null) {
                    stopMonitor()
                    return
                }
                if (System.currentTimeMillis() >= store.endTime()) {
                    blockNow(timeUp = true)
                    stopMonitor()
                    return
                }
                handler.postDelayed(this, 1_000L)
            }
        }
        monitor = r
        handler.postDelayed(r, 1_000L)
    }

    private fun stopMonitor() {
        monitor?.let { handler.removeCallbacks(it) }
        monitor = null
    }

    private fun blockNow(timeUp: Boolean) {
        store.clearSession()
        val msg = if (timeUp) "時間になりました。おつかれさま！" else "ここからは開けません。目的を選んでね。"
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
        performGlobalAction(GLOBAL_ACTION_HOME)
    }

    override fun onInterrupt() {}

    override fun onDestroy() {
        stopMonitor()
        super.onDestroy()
    }
}
