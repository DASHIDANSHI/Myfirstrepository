package com.example.intentlauncher.model

import android.graphics.drawable.Drawable

/** インストール済みの起動可能なアプリ1件分の情報。 */
data class AppInfo(
    val packageName: String,
    val label: String,
    val icon: Drawable?,
)
