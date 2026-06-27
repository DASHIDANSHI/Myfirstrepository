package com.example.intentlauncher.data

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.example.intentlauncher.model.Goal
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

private val Context.dataStore by preferencesDataStore(name = "intent_launcher")

/** 目的（とアプリ割り当て）の永続化。DataStore に JSON で保存する。 */
class GoalRepository(private val context: Context) {

    private val json = Json { ignoreUnknownKeys = true }
    private val goalsKey = stringPreferencesKey("goals")

    val goals: Flow<List<Goal>> = context.dataStore.data.map { prefs ->
        val raw = prefs[goalsKey]
        if (raw.isNullOrBlank()) {
            defaultGoals
        } else {
            runCatching { json.decodeFromString<List<Goal>>(raw) }.getOrDefault(defaultGoals)
        }
    }

    suspend fun saveGoals(goals: List<Goal>) {
        context.dataStore.edit { prefs ->
            prefs[goalsKey] = json.encodeToString(goals)
        }
    }

    companion object {
        /** 初回起動時に表示されるデフォルトの目的。 */
        val defaultGoals: List<Goal> = listOf(
            Goal("contact", "💬", "連絡する"),
            Goal("search", "🔍", "調べる"),
            Goal("move", "🚃", "移動する"),
            Goal("work", "📝", "仕事・勉強"),
            Goal("record", "📷", "写真・記録"),
            Goal("relax", "☕", "ひと休み"),
        )
    }
}
