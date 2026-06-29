package com.example.intentlauncher.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.intentlauncher.model.AppInfo
import com.example.intentlauncher.model.Goal
import com.example.intentlauncher.ui.components.AppIcon
import com.example.intentlauncher.ui.components.MascotHeader
import kotlinx.coroutines.delay
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@Composable
fun GoalScreen(
    goals: List<Goal>,
    apps: List<AppInfo>,
    frictionPackages: Set<String>,
    onGoalSelected: (Goal, String) -> Unit,
    onLaunchApp: (String) -> Unit,
    onOpenFrictionApp: (AppInfo, Int) -> Unit,
    onOpenSettings: () -> Unit,
    imageCell0: @Composable () -> Unit,
    imageCell1: @Composable () -> Unit,
) {
    var query by remember { mutableStateOf("") }
    var pendingApp by remember { mutableStateOf<AppInfo?>(null) }

    var clock by remember { mutableStateOf(currentTime()) }
    var dateText by remember { mutableStateOf(currentDate()) }
    LaunchedEffect(Unit) {
        while (true) {
            clock = currentTime()
            dateText = currentDate()
            delay(10_000)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 20.dp, vertical = 12.dp),
    ) {
        // 時計 ＋ 日付・曜日
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(text = clock, style = MaterialTheme.typography.headlineSmall)
            Spacer(Modifier.size(12.dp))
            Text(
                text = dateText,
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Spacer(Modifier.weight(1f))
            IconButton(onClick = onOpenSettings) {
                Icon(Icons.Filled.Settings, contentDescription = "設定")
            }
        }

        Spacer(Modifier.height(4.dp))

        // 変な生き物が「何？」と聞いてくる
        MascotHeader()

        Spacer(Modifier.height(10.dp))

        // アプリ検索ボックス（全アプリ対象。がまんリストのアプリだけ確認＋時間制限を通す）
        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            label = { Text("アプリ名を入力") },
            leadingIcon = { Icon(Icons.Filled.Search, contentDescription = null) },
            singleLine = true,
            modifier = Modifier.fillMaxWidth(),
        )

        val matches = if (query.isBlank()) {
            emptyList()
        } else {
            apps.filter { it.label.contains(query.trim(), ignoreCase = true) }
        }
        matches.forEach { app ->
            val isFriction = app.packageName in frictionPackages
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable {
                        if (isFriction) {
                            pendingApp = app // 確認＋時間制限ダイアログ
                        } else {
                            onLaunchApp(app.packageName) // ふつうのアプリはそのまま起動
                        }
                    }
                    .padding(vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                AppIcon(icon = app.icon, contentDescription = app.label, modifier = Modifier.size(36.dp))
                Spacer(Modifier.size(12.dp))
                Text(app.label, modifier = Modifier.weight(1f))
                Text(if (isFriction) "⏱ 開く" else "開く →", style = MaterialTheme.typography.labelLarge)
            }
        }

        Spacer(Modifier.height(10.dp))

        // カテゴリボタン＋画像枠を、すべて同じ大きさで画面に収める。
        // 各行を weight(1f) で等分するのでスクロール不要。
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(10.dp),
        ) {
            goals.chunked(2).forEach { rowGoals ->
                Row(
                    modifier = Modifier.fillMaxWidth().weight(1f),
                    horizontalArrangement = Arrangement.spacedBy(10.dp),
                ) {
                    rowGoals.forEach { goal ->
                        GoalCard(
                            goal = goal,
                            modifier = Modifier.weight(1f).fillMaxHeight(),
                            onClick = { onGoalSelected(goal, "") },
                        )
                    }
                    if (rowGoals.size == 1) Spacer(Modifier.weight(1f))
                }
            }

            // 下段：好きな画像を置ける枠を2つ（ボタンと同じ大きさ）
            Row(
                modifier = Modifier.fillMaxWidth().weight(1f),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                Box(modifier = Modifier.weight(1f).fillMaxHeight()) { imageCell0() }
                Box(modifier = Modifier.weight(1f).fillMaxHeight()) { imageCell1() }
            }
        }
    }

    val app = pendingApp
    if (app != null) {
        FrictionDialog(
            app = app,
            onCancel = { pendingApp = null },
            onConfirm = { minutes ->
                onOpenFrictionApp(app, minutes)
                pendingApp = null
                query = ""
            },
        )
    }
}

@Composable
private fun FrictionDialog(
    app: AppInfo,
    onCancel: () -> Unit,
    onConfirm: (minutes: Int) -> Unit,
) {
    val options = listOf(5, 10, 15)
    var minutes by remember { mutableIntStateOf(options.first()) }

    AlertDialog(
        onDismissRequest = onCancel,
        title = { Text("本当に「${app.label}」を開きますか？") },
        text = {
            Column {
                Text(
                    "使う時間を先に決めてください。時間になったら自動で閉じます。",
                    style = MaterialTheme.typography.bodyMedium,
                )
                Spacer(Modifier.height(12.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    options.forEach { m ->
                        if (m == minutes) {
                            Button(onClick = { minutes = m }) { Text("${m}分") }
                        } else {
                            OutlinedButton(onClick = { minutes = m }) { Text("${m}分") }
                        }
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = { onConfirm(minutes) }) { Text("${minutes}分だけ開く") }
        },
        dismissButton = {
            TextButton(onClick = onCancel) { Text("やめる") }
        },
    )
}

@Composable
private fun GoalCard(goal: Goal, modifier: Modifier = Modifier, onClick: () -> Unit) {
    Card(
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer,
        ),
        modifier = modifier.clickable(onClick = onClick),
    ) {
        Box(modifier = Modifier.fillMaxSize().padding(8.dp), contentAlignment = Alignment.Center) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(text = goal.emoji, style = MaterialTheme.typography.headlineMedium)
                Spacer(Modifier.height(4.dp))
                Text(
                    text = goal.label,
                    style = MaterialTheme.typography.titleMedium,
                    textAlign = TextAlign.Center,
                )
            }
        }
    }
}

private fun currentTime(): String =
    SimpleDateFormat("H:mm", Locale.getDefault()).format(Date())

private fun currentDate(): String =
    SimpleDateFormat("M月d日(E)", Locale.JAPANESE).format(Date())
