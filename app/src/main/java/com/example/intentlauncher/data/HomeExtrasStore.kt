package com.example.intentlauncher.data

import android.content.Context

/** ホーム画面下段の「好きな画像」枠（2つ）の URI を保存する。 */
class HomeExtrasStore(context: Context) {

    private val prefs =
        context.applicationContext.getSharedPreferences("home_extras", Context.MODE_PRIVATE)

    fun getImageUri(slot: Int): String? = prefs.getString(key(slot), null)

    fun setImageUri(slot: Int, uri: String?) {
        prefs.edit().apply {
            if (uri == null) remove(key(slot)) else putString(key(slot), uri)
        }.apply()
    }

    private fun key(slot: Int) = "image_uri_$slot"

    companion object {
        const val SLOT_COUNT = 2
    }
}
