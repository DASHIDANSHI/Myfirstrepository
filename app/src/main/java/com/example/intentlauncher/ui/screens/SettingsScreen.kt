package com.example.intentlauncher.ui.screens

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
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Divider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
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
import androidx.compose.ui.unit.dp
import com.example.intentlauncher.model.AppInfo
import com.example.intentlauncher.model.Goal
import com.example.intentlauncher.ui.components.AppIcon
import java.util.UUID

@Composable
fun SettingsScreen(
    goals: List<Goal>,
    installedApps: List<AppInfo>,
    onSetAllowedApps: (goalId: String, packages: List<String>) -> Unit,
    onAddGoal: (Goal) -> Unit,
    onRemoveGoal: (String) -> Unit,
    onBack: () -> Unit,
) {
    var editingGoalId by remember { mutableStateOf<String?>(null) }
    val editingGoal = goals.find { it.id == editingGoalId }

    if (editingGoal != null) {
        GoalAppEditor(
            goal = editingGoal,
            installedApps = installedApps,
            onSave = { packages ->
                onSetAllowedApps(editingGoal.id, packages)
                editingGoalId = null
            },
            onBack = { editingGoalId = null },
        )
    } else {
        GoalListScreen(
            goals = goals,
            onEdit = { editingGoalId = it.id },
            onAddGoal = onAddGoal,
            onRemoveGoal = onRemoveGoal,
            onBack = onBack,
        )
    }
}

@Composable
private fun GoalListScreen(
    goals: List<Goal>,
    onEdit: (Goal) -> Unit,
    onAddGoal: (Goal) -> Unit,
    onRemoveGoal: (String) -> Unit,
    onBack: () -> Unit,
) {
    var showAddDialog by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "戻る")
            }
            Text("設定 — 目的とアプリ", style = MaterialTheme.typography.titleLarge)
            Spacer(Modifier.weight(1f))
            IconButton(onClick = { showAddDialog = true }) {
                Icon(Icons.Filled.Add, contentDescription = "目的を追加")
            }
        }

        Spacer(Modifier.height(8.dp))
        Text(
            "目的をタップすると、その目的で起動できるアプリを選べます。",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Spacer(Modifier.height(12.dp))

        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(goals, key = { it.id }) { goal ->
                Card(modifier = Modifier.fillMaxWidth().clickable { onEdit(goal) }) {
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(16.dp),
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
                        IconButton(onClick = { onRemoveGoal(goal.id) }) {
                            Icon(Icons.Filled.Delete, contentDescription = "削除")
                        }
                    }
                }
            }
        }
    }

    if (showAddDialog) {
        AddGoalDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = { emoji, label ->
                onAddGoal(Goal(id = UUID.randomUUID().toString(), emoji = emoji, label = label))
                showAddDialog = false
            },
        )
    }
}

@Composable
private fun AddGoalDialog(
    onDismiss: () -> Unit,
    onConfirm: (emoji: String, label: String) -> Unit,
) {
    var emoji by remember { mutableStateOf("⭐") }
    var label by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("目的を追加") },
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
                    label = { Text("目的の名前") },
                    singleLine = true,
                )
            }
        },
        confirmButton = {
            TextButton(
                onClick = { onConfirm(emoji.ifBlank { "⭐" }, label.trim()) },
                enabled = label.isNotBlank(),
            ) { Text("追加") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("キャンセル") } },
    )
}

@Composable
private fun GoalAppEditor(
    goal: Goal,
    installedApps: List<AppInfo>,
    onSave: (List<String>) -> Unit,
    onBack: () -> Unit,
) {
    val selected = remember(goal.id) { mutableStateOf(goal.allowedPackages.toSet()) }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "戻る")
            }
            Text("${goal.emoji} ${goal.label}", style = MaterialTheme.typography.titleLarge)
            Spacer(Modifier.weight(1f))
            TextButton(onClick = { onSave(selected.value.toList()) }) { Text("保存") }
        }

        Spacer(Modifier.height(4.dp))
        Text(
            "この目的で起動できるアプリを選んでください。",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Spacer(Modifier.height(8.dp))
        Divider()

        if (installedApps.isEmpty()) {
            Text(
                "アプリ一覧を読み込み中…",
                modifier = Modifier.padding(top = 16.dp),
            )
        } else {
            LazyColumn(modifier = Modifier.weight(1f)) {
                items(installedApps, key = { it.packageName }) { app ->
                    val checked = app.packageName in selected.value
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                selected.value = if (checked) {
                                    selected.value - app.packageName
                                } else {
                                    selected.value + app.packageName
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
