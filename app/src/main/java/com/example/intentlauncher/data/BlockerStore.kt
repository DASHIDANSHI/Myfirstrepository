package com.example.intentlauncher.data

import android.content.Context

/**
 * 「がまんリスト（誘惑アプリ）」・許可中セッション・クールダウンを保存する。
 *
 * UI（Activity）と見張り役（AccessibilityService）の両方から読むので、
 * すぐ読める SharedPreferences を使う。
 */
class BlockerStore(context: Context) {

    private val prefs =
        context.applicationContext.getSharedPreferences("blocker", Context.MODE_PRIVATE)

    /** ボタンには出さず、検索＋確認＋時間制限を通さないと開けないアプリ。 */
    fun getFrictionPackages(): Set<String> =
        prefs.getStringSet(KEY_FRICTION, emptySet())?.toSet() ?: emptySet()

    fun setFrictionPackages(packages: Set<String>) {
        prefs.edit().putStringSet(KEY_FRICTION, packages).apply()
    }

    /** これから durationMs だけ pkg の利用を許可する、と記録する。 */
    fun startSession(packageName: String, durationMs: Long) {
        prefs.edit()
            .putString(KEY_ACTIVE_PKG, packageName)
            .putLong(KEY_END_TIME, System.currentTimeMillis() + durationMs)
            .putLong(KEY_ACTIVE_DURATION, durationMs)
            .apply()
    }

    fun clearSession() {
        prefs.edit()
            .remove(KEY_ACTIVE_PKG)
            .remove(KEY_END_TIME)
            .remove(KEY_ACTIVE_DURATION)
            .apply()
    }

    fun activePackage(): String? = prefs.getString(KEY_ACTIVE_PKG, null)

    fun endTime(): Long = prefs.getLong(KEY_END_TIME, 0L)

    /** 直近セッションで選ばれた利用時間（ミリ秒）。クールダウンの長さに使う。 */
    fun activeDurationMs(): Long = prefs.getLong(KEY_ACTIVE_DURATION, 0L)

    /** いま pkg を許可中で、まだ時間が残っているか。 */
    fun isSessionActive(packageName: String, now: Long): Boolean =
        activePackage() == packageName && now < endTime()

    /** クールダウン（時間切れ後、しばらく開けない期間）の終了時刻を設定・取得する。 */
    fun setCooldownUntil(packageName: String, until: Long) {
        prefs.edit().putLong(cooldownKey(packageName), until).apply()
    }

    fun cooldownUntil(packageName: String): Long =
        prefs.getLong(cooldownKey(packageName), 0L)

    private fun cooldownKey(pkg: String) = "cooldown_$pkg"

    private companion object {
        const val KEY_FRICTION = "friction_packages"
        const val KEY_ACTIVE_PKG = "active_package"
        const val KEY_END_TIME = "end_time"
        const val KEY_ACTIVE_DURATION = "active_duration"
    }
}
