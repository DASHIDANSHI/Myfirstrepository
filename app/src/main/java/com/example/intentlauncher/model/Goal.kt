package com.example.intentlauncher.model

import kotlinx.serialization.Serializable

/**
 * 「何をしたいか」= 目的。
 * 各目的には、その目的のときだけ起動を許可するアプリ（パッケージ名）を割り当てる。
 */
@Serializable
data class Goal(
    val id: String,
    val emoji: String,
    val label: String,
    val allowedPackages: List<String> = emptyList(),
)
