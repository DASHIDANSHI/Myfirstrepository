package com.example.intentlauncher.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.example.intentlauncher.model.AppInfo
import com.example.intentlauncher.model.Goal
import com.example.intentlauncher.ui.components.AppIcon

@Composable
fun AppListScreen(
    goal: Goal,
    note: String,
    apps: List<AppInfo>,
    onLaunch: (String) -> Unit,
    onBack: () -> Unit,
    onOpenSettings: () -> Unit,
) {
    val allowed = apps.filter { it.packageName in goal.allowedPackages }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 24.dp, vertical = 16.dp),
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "目的を変える")
            }
            Spacer(Modifier.weight(1f))
            IconButton(onClick = onOpenSettings) {
                Icon(Icons.Filled.Settings, contentDescription = "設定")
            }
        }

        Text(
            text = "${goal.emoji} ${goal.label}",
            style = MaterialTheme.typography.headlineSmall,
        )
        if (note.isNotBlank()) {
            Spacer(Modifier.height(4.dp))
            Text(
                text = "目的: $note",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        Spacer(Modifier.height(16.dp))

        if (allowed.isEmpty()) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "この目的にはまだアプリが\n割り当てられていません。",
                        textAlign = TextAlign.Center,
                        style = MaterialTheme.typography.bodyLarge,
                    )
                    Spacer(Modifier.height(16.dp))
                    Button(onClick = onOpenSettings) { Text("設定でアプリを割り当てる") }
                    Spacer(Modifier.height(8.dp))
                    OutlinedButton(onClick = onBack) { Text("目的を変える") }
                }
            }
        } else {
            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 88.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.weight(1f),
            ) {
                items(allowed, key = { it.packageName }) { app ->
                    AppTile(app = app, onClick = { onLaunch(app.packageName) })
                }
            }
            Spacer(Modifier.height(12.dp))
            OutlinedButton(
                onClick = onBack,
                modifier = Modifier.fillMaxWidth(),
            ) {
                Text("目的を変える")
            }
        }
    }
}

@Composable
private fun AppTile(app: AppInfo, onClick: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .clickable(onClick = onClick)
            .padding(4.dp),
    ) {
        AppIcon(
            icon = app.icon,
            contentDescription = app.label,
            modifier = Modifier.size(56.dp),
        )
        Spacer(Modifier.height(6.dp))
        Text(
            text = app.label,
            style = MaterialTheme.typography.labelMedium,
            textAlign = TextAlign.Center,
            maxLines = 2,
            overflow = TextOverflow.Ellipsis,
        )
    }
}
