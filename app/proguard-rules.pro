# kotlinx.serialization
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.**
-keepclassmembers class com.example.intentlauncher.model.** {
    *** Companion;
}
-keepclasseswithmembers class com.example.intentlauncher.model.** {
    kotlinx.serialization.KSerializer serializer(...);
}
