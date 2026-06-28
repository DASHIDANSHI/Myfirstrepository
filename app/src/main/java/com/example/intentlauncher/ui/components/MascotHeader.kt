package com.example.intentlauncher.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp

private val Outline = Color(0xFF333333)

/** トップ画面の「変な生き物」＋「何？」の吹き出し。 */
@Composable
fun MascotHeader(modifier: Modifier = Modifier) {
    Row(modifier = modifier, verticalAlignment = Alignment.CenterVertically) {
        MascotCreature()
        Spacer(Modifier.width(8.dp))
        SpeechBubble(text = "何？")
    }
}

@Composable
private fun MascotCreature(modifier: Modifier = Modifier) {
    val body = Color(0xFFECECEC)
    val cheek = Color(0xFFF4C6C6)

    Canvas(modifier = modifier.size(width = 108.dp, height = 88.dp)) {
        val w = size.width
        val h = size.height
        val sw = 3.dp.toPx()
        val stroke = Stroke(width = sw)

        // 耳（先に描いて頭で下半分を隠す）
        val earR = w * 0.13f
        val earY = h * 0.22f
        val leftEar = Offset(w * 0.32f, earY)
        val rightEar = Offset(w * 0.68f, earY)
        drawCircle(body, earR, leftEar)
        drawCircle(Outline, earR, leftEar, style = stroke)
        drawCircle(body, earR, rightEar)
        drawCircle(Outline, earR, rightEar, style = stroke)

        // 頭（まるい四角）
        val headTopLeft = Offset(w * 0.13f, h * 0.20f)
        val headSize = Size(w * 0.74f, h * 0.72f)
        val corner = CornerRadius(w * 0.28f, w * 0.28f)
        drawRoundRect(body, topLeft = headTopLeft, size = headSize, cornerRadius = corner)
        drawRoundRect(Outline, topLeft = headTopLeft, size = headSize, cornerRadius = corner, style = stroke)

        // メガネっぽい目
        val eyeR = w * 0.11f
        val eyeY = h * 0.54f
        val leftEye = Offset(w * 0.40f, eyeY)
        val rightEye = Offset(w * 0.60f, eyeY)
        drawCircle(Outline, eyeR, leftEye, style = stroke)
        drawCircle(Outline, eyeR, rightEye, style = stroke)
        drawLine(Outline, Offset(leftEye.x + eyeR, eyeY), Offset(rightEye.x - eyeR, eyeY), strokeWidth = sw)
        drawCircle(Outline, eyeR * 0.45f, leftEye)
        drawCircle(Outline, eyeR * 0.45f, rightEye)

        // ほっぺ
        drawCircle(cheek, w * 0.06f, Offset(w * 0.29f, h * 0.68f))
        drawCircle(cheek, w * 0.06f, Offset(w * 0.71f, h * 0.68f))

        // 口（小さな v）
        drawLine(Outline, Offset(w * 0.46f, h * 0.74f), Offset(w * 0.50f, h * 0.79f), strokeWidth = sw)
        drawLine(Outline, Offset(w * 0.50f, h * 0.79f), Offset(w * 0.54f, h * 0.74f), strokeWidth = sw)
    }
}

@Composable
private fun SpeechBubble(text: String, modifier: Modifier = Modifier) {
    val bg = MaterialTheme.colorScheme.surface

    Box(
        modifier = modifier
            .drawBehind {
                val w = size.width
                val h = size.height
                val t = 12.dp.toPx() // しっぽの幅
                val r = 14.dp.toPx() // 角丸
                val y1 = h * 0.38f
                val y2 = h * 0.62f
                val path = Path().apply {
                    moveTo(t + r, 0f)
                    lineTo(w - r, 0f)
                    quadraticBezierTo(w, 0f, w, r)
                    lineTo(w, h - r)
                    quadraticBezierTo(w, h, w - r, h)
                    lineTo(t + r, h)
                    quadraticBezierTo(t, h, t, h - r)
                    lineTo(t, y2)
                    lineTo(0f, h * 0.5f) // しっぽの先
                    lineTo(t, y1)
                    lineTo(t, r)
                    quadraticBezierTo(t, 0f, t + r, 0f)
                    close()
                }
                drawPath(path, bg)
                drawPath(path, Outline, style = Stroke(width = 3.dp.toPx()))
            }
            .padding(start = 22.dp, top = 10.dp, end = 18.dp, bottom = 10.dp),
        contentAlignment = Alignment.Center,
    ) {
        Text(text = text, style = MaterialTheme.typography.titleLarge, color = Outline)
    }
}
