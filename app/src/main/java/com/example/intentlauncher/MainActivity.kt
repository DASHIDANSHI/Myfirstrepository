package com.example.intentlauncher

import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.compose.AsyncImage
import com.example.intentlauncher.data.BlockerStore
import com.example.intentlauncher.data.HomeExtrasStore
import com.example.intentlauncher.service.AccessibilityUtil
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
    val frictionPackages by vm.frictionPackages.collectAsState()

    val context = LocalContext.current
    val extrasStore = remember { HomeExtrasStore(context) }
    val blockerStore = remember { BlockerStore(context) }

    var showSettings by remember { mutableStateOf(false) }

    // 強制ブロックが「本当に動いているか」を判断する。
    // ユーザー補助がオフ、または見張り役の心拍が2分以上途切れていたら警告する。
    // （がまんリストを使っている人にだけ出す）
    val blockerWarning = frictionPackages.isNotEmpty() && run {
        val enabled = AccessibilityUtil.isBlockerEnabled(context)
        val heartbeatFresh =
            System.currentTimeMillis() - blockerStore.serviceHeartbeat() < 120_000L
        !(enabled && heartbeatFresh)
    }

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
                frictionPackages = frictionPackages,
                onSetAllowedApps = vm::setAllowedApps,
                onSetFrictionApps = vm::setFrictionApps,
                onAddGoal = vm::addGoal,
                onUpdateGoal = vm::updateGoal,
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
                frictionPackages = frictionPackages,
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
                apps = apps,
                frictionPackages = frictionPackages,
                onGoalSelected = { goal, n -> vm.selectGoal(goal.id, n) },
                onLaunchApp = { vm.launchApp(it) },
                onOpenFrictionApp = { app, minutes -> vm.openFrictionApp(app.packageName, minutes) },
                cooldownRemainingMs = { vm.cooldownRemainingMs(it) },
                blockerWarning = blockerWarning,
                onFixBlocker = {
                    context.startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))
                },
                onOpenSettings = { showSettings = true },
                imageCell0 = { ImageSlot(slot = 0, store = extrasStore) },
                imageCell1 = { ImageSlot(slot = 1, store = extrasStore) },
            )
        }
    }
}

/** 好きな画像を1枚置ける枠。タップで選び直せる。 */
@Composable
private fun ImageSlot(slot: Int, store: HomeExtrasStore) {
    val context = LocalContext.current
    var uri by remember { mutableStateOf(store.getImageUri(slot)) }

    val picker = rememberLauncherForActivityResult(
        ActivityResultContracts.OpenDocument(),
    ) { picked ->
        if (picked != null) {
            runCatching {
                context.contentResolver.takePersistableUriPermission(
                    picked, Intent.FLAG_GRANT_READ_URI_PERMISSION,
                )
            }
            store.setImageUri(slot, picked.toString())
            uri = picked.toString()
        }
    }

    val shape = RoundedCornerShape(12.dp)
    val current = uri

    if (current != null) {
        AsyncImage(
            model = current,
            contentDescription = "お気に入り画像",
            contentScale = ContentScale.Crop,
            modifier = Modifier
                .fillMaxSize()
                .clip(shape)
                .clickable { picker.launch(arrayOf("image/*")) },
        )
    } else {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .clip(shape)
                .border(1.dp, MaterialTheme.colorScheme.outline, shape)
                .clickable { picker.launch(arrayOf("image/*")) },
            contentAlignment = Alignment.Center,
        ) {
            Text("＋ 画像", style = MaterialTheme.typography.labelLarge)
        }
    }
}
