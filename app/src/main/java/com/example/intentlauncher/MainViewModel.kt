package com.example.intentlauncher

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.intentlauncher.data.AppRepository
import com.example.intentlauncher.data.BlockerStore
import com.example.intentlauncher.data.GoalRepository
import com.example.intentlauncher.model.AppInfo
import com.example.intentlauncher.model.Goal
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainViewModel(app: Application) : AndroidViewModel(app) {

    private val goalRepo = GoalRepository(app)
    private val appRepo = AppRepository(app)
    private val blockerStore = BlockerStore(app)

    val goals: StateFlow<List<Goal>> = goalRepo.goals
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), GoalRepository.defaultGoals)

    private val _installedApps = MutableStateFlow<List<AppInfo>>(emptyList())
    val installedApps: StateFlow<List<AppInfo>> = _installedApps.asStateFlow()

    /** 現在選択中の目的。null ならまだ目的を選んでいない（＝目的選択画面）。 */
    private val _activeGoalId = MutableStateFlow<String?>(null)
    val activeGoalId: StateFlow<String?> = _activeGoalId.asStateFlow()

    /** 目的に添えた自由メモ（任意）。 */
    private val _intentionNote = MutableStateFlow("")
    val intentionNote: StateFlow<String> = _intentionNote.asStateFlow()

    /** がまんリスト（ボタンに出さず、検索＋確認＋時間制限で開くアプリ）のパッケージ名。 */
    private val _frictionPackages = MutableStateFlow(blockerStore.getFrictionPackages())
    val frictionPackages: StateFlow<Set<String>> = _frictionPackages.asStateFlow()

    init {
        refreshApps()
    }

    fun refreshApps() {
        viewModelScope.launch {
            val apps = withContext(Dispatchers.IO) { appRepo.loadLaunchableApps() }
            _installedApps.value = apps
        }
    }

    fun selectGoal(goalId: String, note: String = "") {
        _activeGoalId.value = goalId
        _intentionNote.value = note.trim()
    }

    /** 目的をリセット（目的選択画面へ戻す）。ランチャーに戻るたびに呼ぶ。 */
    fun clearGoal() {
        _activeGoalId.value = null
        _intentionNote.value = ""
    }

    fun launchApp(packageName: String) = appRepo.launch(packageName)

    fun setAllowedApps(goalId: String, packages: List<String>) {
        viewModelScope.launch {
            val updated = goals.value.map {
                if (it.id == goalId) it.copy(allowedPackages = packages) else it
            }
            goalRepo.saveGoals(updated)
        }
    }

    fun addGoal(goal: Goal) {
        viewModelScope.launch { goalRepo.saveGoals(goals.value + goal) }
    }

    fun removeGoal(goalId: String) {
        viewModelScope.launch { goalRepo.saveGoals(goals.value.filterNot { it.id == goalId }) }
    }

    /** がまんリストを更新する。 */
    fun setFrictionApps(packages: Set<String>) {
        blockerStore.setFrictionPackages(packages)
        _frictionPackages.value = packages
    }

    /**
     * がまんアプリを「○分だけ」許可して起動する。
     * 強制ブロックがONなら、time が過ぎると見張り役が自動で閉じる。
     */
    fun openFrictionApp(packageName: String, minutes: Int) {
        blockerStore.startSession(packageName, minutes * 60_000L)
        appRepo.launch(packageName)
    }
}
