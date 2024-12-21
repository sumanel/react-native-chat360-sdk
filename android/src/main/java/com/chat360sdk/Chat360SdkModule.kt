package com.chat360sdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = Chat360SdkModule.NAME)
class Chat360SdkModule(reactContext: ReactApplicationContext) :
  NativeChat360SdkSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = "Chat360Sdk"
  }
}
