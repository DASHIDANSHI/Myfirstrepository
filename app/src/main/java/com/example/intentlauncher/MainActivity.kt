package com.example.intentlauncher

import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
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
import com.canhub.cropper.CropImageContract
import com.canhub.cropper.CropImageContractOptions
import com.canhub.cropper.CropImageOptions
import com.example.intentlauncher.data.HomeExtrasStore
import java.io.File
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
                onOpenSettings = { showSettings = true },
                imageCell0 = { ImageSlot(slot = 0, store = extrasStore) },
                imageCell1 = { ImageSlot(slot = 1, store = extrasStore) },
            )
        }
    }
}

/** 好きな画像を1枚置ける枠。タップで画像を選び、トリミング（表示位置・拡大）を調整できる。 */
@Composable
private fun ImageSlot(slot: Int, store: HomeExtrasStore) {
    val context = LocalContext.current
    var uri by remember { mutableStateOf(store.getImageUri(slot)) }
    var pendingOut by remember { mutableStateOf<String?>(null) }

    val cropLauncher = rememberLauncherForActivityResult(CropImageContract()) { result ->
        if (result.isSuccessful) {
            pendingOut?.let { out ->
                // 古い画像ファイルは削除しておく
                uri?.let { old -> runCatching { Uri.parse(old).path?.let { File(it).delete() } } }
                store.setImageUri(slot, out)
                uri = out
            }
        }
        pendingOut = null
    }

    fun startCrop() {
        val file = File(context.filesDir, "frame_${slot}_${System.currentTimeMillis()}.jpg")
        val outUri = Uri.fromFile(file)
        pendingOut = outUri.toString()
        cropLauncher.launch(
            CropImageContractOptions(
                uri = null,
                cropImageOptions = CropImageOptions(
                    imageSourceIncludeGallery = true,
                    imageSourceIncludeCamera = false,
                    customOutputUri = outUri,
                ),
            ),
        )
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
                .clickable { startCrop() },
        )
    } else {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .clip(shape)
                .border(1.dp, MaterialTheme.colorScheme.outline, shape)
                .clickable { startCrop() },
            contentAlignment = Alignment.Center,
        ) {
            Text("＋ 画像", style = MaterialTheme.typography.labelLarge)
        }
    }
}
