package com.example.intentlauncher.ui.components

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import androidx.compose.foundation.Image
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.ImageBitmap
import androidx.compose.ui.graphics.asImageBitmap

/** PackageManager から得た Drawable を Compose で描画できる ImageBitmap に変換する。 */
private fun Drawable.toImageBitmap(): ImageBitmap {
    (this as? BitmapDrawable)?.bitmap?.let { return it.asImageBitmap() }
    val width = intrinsicWidth.takeIf { it > 0 } ?: 108
    val height = intrinsicHeight.takeIf { it > 0 } ?: 108
    val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)
    setBounds(0, 0, canvas.width, canvas.height)
    draw(canvas)
    return bitmap.asImageBitmap()
}

@Composable
fun AppIcon(icon: Drawable?, contentDescription: String?, modifier: Modifier = Modifier) {
    if (icon == null) return
    val image = remember(icon) { icon.toImageBitmap() }
    Image(bitmap = image, contentDescription = contentDescription, modifier = modifier)
}
