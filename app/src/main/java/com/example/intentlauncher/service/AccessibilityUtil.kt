package com.example.intentlauncher.service

import android.content.ComponentName
import android.content.Context
import android.provider.Settings

/** 強制ブロック（ユーザー補助サービス）が今ONになっているかを調べる。 */
object AccessibilityUtil {

    fun isBlockerEnabled(context: Context): Boolean {
        val expected = ComponentName(context, AppBlockerService::class.java).flattenToString()
        val enabled = Settings.Secure.getString(
            context.contentResolver,
            Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES,
        ) ?: return false
        return enabled.split(':').any { it.equals(expected, ignoreCase = true) }
    }
}
