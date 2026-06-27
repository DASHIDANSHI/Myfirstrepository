package com.example.intentlauncher.data

import android.content.Context
import android.content.Intent
import com.example.intentlauncher.model.AppInfo

/** インストール済みアプリの取得と起動を担当する。 */
class AppRepository(private val context: Context) {

    /** ホーム画面に出る起動可能なアプリ一覧を、表示名で並べて返す。 */
    fun loadLaunchableApps(): List<AppInfo> {
        val pm = context.packageManager
        val intent = Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER)
        return pm.queryIntentActivities(intent, 0)
            .asSequence()
            .mapNotNull { ri ->
                val pkg = ri.activityInfo?.packageName ?: return@mapNotNull null
                if (pkg == context.packageName) return@mapNotNull null // ランチャー自身は除外
                AppInfo(
                    packageName = pkg,
                    label = ri.loadLabel(pm).toString(),
                    icon = runCatching { ri.loadIcon(pm) }.getOrNull(),
                )
            }
            .distinctBy { it.packageName }
            .sortedBy { it.label.lowercase() }
            .toList()
    }

    /** 指定パッケージのアプリを起動する。起動できなければ false。 */
    fun launch(packageName: String): Boolean {
        val launchIntent = context.packageManager.getLaunchIntentForPackage(packageName)
            ?: return false
        launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(launchIntent)
        return true
    }
}
