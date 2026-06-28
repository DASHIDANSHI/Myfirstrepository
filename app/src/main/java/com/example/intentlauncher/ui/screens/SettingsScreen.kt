package com.example.intentlauncher.ui.screens

import android.content.Intent
import android.provider.Settings
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.example.intentlauncher.model.AppInfo
import com.example.intentlauncher.model.Goal
import com.example.intentlauncher.service.AccessibilityUtil
import com.example.intentlauncher.ui.components.AppIcon
import java.util.UUID

@Composable
fun SettingsScreen(
    goals: List<Goal>,
    installedApps: List<AppInfo>,
    frictionPackages: Set<String>,
    onSetAllowedApps: (goalId: String, packages: List<String>) -> Unit,
    onSetFrictionApps: (Set<String>) -> Unit,
    onAddGoal: (Goal) -> Unit,
    onUpdateGoal: (goalId: String, emoji: String, label: String) -> Unit,
    onRemoveGoal: (String) -> Unit,
    onBack: () -> Unit,
) {
    var editingGoalId by remember { mutableStateOf<String?>(null) }
    var editingFriction by remember { mutableStateOf(false) }
    val editingGoal = goals.find { it.id == editingGoalId }

    when {
        editingGoal != null -> AppMultiSelectEditor(
            title = "${editingGoal.emoji} ${editingGoal.label}",
            subtitle = "この目的で起動できるアプリを選んでください。",
            installedApps = installedApps,
            initialSelected = editingGoal.allowedPackages.toSet(),
            onSave = { packages ->
                onSetAllowedApps(editingGoal.id, packages.toList())
                editingGoalId = null
            },
            onBack = { editingGoalId = null },
        )

        editingFriction -> AppMultiSelectEditor(
            title = "🚫 がまんリスト",
            subtitle = "ボタンに出さず、検索＋確認＋時間制限を通さないと開けないアプリを選んでください。",
            installedApps = installedApps,
            initialSelected = frictionPackages,
            onSave = { packages ->
                onSetFrictionApps(packages)
                editingFriction = false
            },
            onBack = { editingFriction = false },
        )

        else -> GoalListScreen(
            goals = goals,
            frictionCount = frictionPackages.size,
            onEdit = { editingGoalId = it.id },
            onEditFriction = { editingFriction = true },
            onAddGoal = onAddGoal,
            onUpdateGoal = onUpdateGoal,
            onRemoveGoal = onRemoveGoal,
            onBack = onBack,
        )
    }
}

@Composable
private fun GoalListScreen(
    goals: List<Goal>,
    frictionCount: Int,
    onEdit: (Goal) -> Unit,
    onEditFriction: () -> Unit,
    onAddGoal: (Goal) -> Unit,
    onUpdateGoal: (goalId: String, emoji: String, label: String) -> Unit,
    onRemoveGoal: (String) -> Unit,
    onBack: () -> Unit,
) {
    var showAddDialog by remember { mutableStateOf(false) }
    var editingInfo by remember { mutableStateOf<Goal?>(null) }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "戻る")
            }
            Text("設定", style = MaterialTheme.typography.titleLarge)
            Spacer(Modifier.weight(1f))
            IconButton(onClick = { showAddDialog = true }) {
                Icon(Icons.Filled.Add, contentDescription = "目的を追加")
            }
        }

        Spacer(Modifier.height(8.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            item { ForceBlockCard() }

            item {
                Card(modifier = Modifier.fillMaxWidth().clickable { onEditFriction() }) {
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text("🚫", style = MaterialTheme.typography.headlineSmall)
                        Spacer(Modifier.size(12.dp))
                        Column(Modifier.weight(1f)) {
                            Text("がまんリスト", style = MaterialTheme.typography.titleMedium)
                            Text(
                                "$frictionCount 個（検索しないと開けないアプリ）",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                }
            }

            item {
                Spacer(Modifier.height(4.dp))
                Text("カテゴリボタン", style = MaterialTheme.typography.titleMedium)
                Text(
                    "タップ：アプリを割り当て／鉛筆：名前と絵文字を編集／ゴミ箱：削除。右上の＋で追加。",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }

            items(goals, key = { it.id }) { goal ->
                Card(modifier = Modifier.fillMaxWidth().clickable { onEdit(goal) }) {
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(start = 16.dp, top = 4.dp, bottom = 4.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text(goal.emoji, style = MaterialTheme.typography.headlineSmall)
                        Spacer(Modifier.size(12.dp))
                        Column(Modifier.weight(1f)) {
                            Text(goal.label, style = MaterialTheme.typography.titleMedium)
                            Text(
                                "${goal.allowedPackages.size} 個のアプリ",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                        IconButton(onClick = { editingInfo = goal }) {
                            Icon(Icons.Filled.Edit, contentDescription = "名前を編集")
                        }
                        IconButton(onClick = { onRemoveGoal(goal.id) }) {
                            Icon(Icons.Filled.Delete, contentDescription = "削除")
                        }
                    }
                }
            }
        }
    }

    if (showAddDialog) {
        GoalInfoDialog(
            dialogTitle = "カテゴリを追加",
            confirmLabel = "追加",
            initialEmoji = "⭐",
            initialLabel = "",
            onDismiss = { showAddDialog = false },
            onConfirm = { emoji, label ->
                onAddGoal(Goal(id = UUID.randomUUID().toString(), emoji = emoji, label = label))
                showAddDialog = false
            },
        )
    }

    val editing = editingInfo
    if (editing != null) {
        GoalInfoDialog(
            dialogTitle = "カテゴリを編集",
            confirmLabel = "保存",
            initialEmoji = editing.emoji,
            initialLabel = editing.label,
            onDismiss = { editingInfo = null },
            onConfirm = { emoji, label ->
                onUpdateGoal(editing.id, emoji, label)
                editingInfo = null
            },
        )
    }
}

@Composable
private fun ForceBlockCard() {
    val context = LocalContext.current
    val enabled = AccessibilityUtil.isBlockerEnabled(context)

    Card(
        colors = CardDefaults.cardColors(
            containerColor = if (enabled) {
                MaterialTheme.colorScheme.secondaryContainer
            } else {
                MaterialTheme.colorScheme.errorContainer
            },
        ),
        modifier = Modifier.fillMaxWidth(),
    ) {
        Column(Modifier.padding(16.dp)) {
            Text(
                text = if (enabled) "✅ 強制ブロック：ON" else "⚠️ 強制ブロック：OFF",
                style = MaterialTheme.typography.titleMedium,
            )
            Spacer(Modifier.height(4.dp))
            Text(
                text = if (enabled) {
                    "がまんアプリは決めた時間で自動的に閉じます。"
                } else {
                    "時間で自動的に閉じるには、ユーザー補助をONにしてください。"
                },
                style = MaterialTheme.typography.bodySmall,
            )
            if (!enabled) {
                Spacer(Modifier.height(8.dp))
                OutlinedButton(onClick = {
                    context.startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))
                }) {
                    Text("ユーザー補助の設定を開く")
                }
            }
        }
    }
}

@Composable
private fun GoalInfoDialog(
    dialogTitle: String,
    confirmLabel: String,
    initialEmoji: String,
    initialLabel: String,
    onDismiss: () -> Unit,
    onConfirm: (emoji: String, label: String) -> Unit,
) {
    var emoji by remember { mutableStateOf(initialEmoji) }
    var label by remember { mutableStateOf(initialLabel) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(dialogTitle) },
        text = {
            Column {
                OutlinedTextField(
                    value = emoji,
                    onValueChange = { emoji = it.take(2) },
                    label = { Text("絵文字") },
                    singleLine = true,
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = label,
                    onValueChange = { label = it },
                    label = { Text("カテゴリの名前") },
                    singleLine = true,
                )
            }
        },
        confirmButton = {
            TextButton(
                onClick = { onConfirm(emoji.ifBlank { "⭐" }, label.trim()) },
                enabled = label.isNotBlank(),
            ) { Text(confirmLabel) }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("キャンセル") } },
    )
}

@Composable
private fun AppMultiSelectEditor(
    title: String,
    subtitle: String,
    installedApps: List<AppInfo>,
    initialSelected: Set<String>,
    onSave: (Set<String>) -> Unit,
    onBack: () -> Unit,
) {
    var selected by remember { mutableStateOf(initialSelected) }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "戻る")
            }
            Text(title, style = MaterialTheme.typography.titleLarge)
            Spacer(Modifier.weight(1f))
            TextButton(onClick = { onSave(selected) }) { Text("保存") }
        }

        Spacer(Modifier.height(4.dp))
        Text(
            subtitle,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Spacer(Modifier.height(8.dp))
        HorizontalDivider()

        if (installedApps.isEmpty()) {
            Text("アプリ一覧を読み込み中…", modifier = Modifier.padding(top = 16.dp))
        } else {
            LazyColumn(modifier = Modifier.weight(1f)) {
                items(installedApps, key = { it.packageName }) { app ->
                    val checked = app.packageName in selected
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                selected = if (checked) {
                                    selected - app.packageName
                                } else {
                                    selected + app.packageName
                                }
                            }
                            .padding(vertical = 8.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        AppIcon(
                            icon = app.icon,
                            contentDescription = app.label,
                            modifier = Modifier.size(40.dp),
                        )
                        Spacer(Modifier.size(12.dp))
                        Text(app.label, modifier = Modifier.weight(1f))
                        Checkbox(checked = checked, onCheckedChange = null)
                    }
                }
            }
        }
    }
}
