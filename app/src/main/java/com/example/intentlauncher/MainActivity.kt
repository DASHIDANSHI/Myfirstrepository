package com.example.intentlauncher

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.intentlauncher.ui.screens.AppListScreen
import com.example.intentlauncher.ui.screens.GoalScreen
import com.example.intentlauncher.ui.screens.SettingsScreen
import com.example.intentlauncher.ui.theme.IntentLauncherTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            IntentLauncherTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background,
                ) {
                    AppRoot()
                }
            }
        }
    }
}

@Composable
private fun AppRoot(vm: MainViewModel = viewModel()) {
    val goals by vm.goals.collectAsState()
    val apps by vm.installedApps.collectAsState()
    val activeGoalId by vm.activeGoalId.collectAsState()
    val note by vm.intentionNote.collectAsState()

    var showSettings by remember { mutableStateOf(false) }

    // ランチャーに戻る（＝ON_RESUME）たびに目的をリセットし、毎回目的を選び直させる。
    // これが「使いすぎ防止」の核となる仕組み。
    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_RESUME) {
                vm.refreshApps()
                if (!showSettings) vm.clearGoal()
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    val activeGoal = goals.find { it.id == activeGoalId }

    when {
        showSettings -> {
            LaunchedEffect(Unit) { vm.refreshApps() }
            BackHandler { showSettings = false }
            SettingsScreen(
                goals = goals,
                installedApps = apps,
                onSetAllowedApps = vm::setAllowedApps,
                onAddGoal = vm::addGoal,
                onRemoveGoal = vm::removeGoal,
                onBack = { showSettings = false },
            )
        }

        activeGoal != null -> {
            BackHandler { vm.clearGoal() }
            AppListScreen(
                goal = activeGoal,
                note = note,
                apps = apps,
                onLaunch = { vm.launchApp(it) },
                onBack = { vm.clearGoal() },
                onOpenSettings = { showSettings = true },
            )
        }

        else -> {
            // 目的選択画面ではバックで何もしない（ホームに留まる）。
            BackHandler(enabled = true) { }
            GoalScreen(
                goals = goals,
                onGoalSelected = { goal, n -> vm.selectGoal(goal.id, n) },
                onOpenSettings = { showSettings = true },
            )
        }
    }
}
