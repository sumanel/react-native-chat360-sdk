package com.chat360sdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReadableMap
import com.chat360.chatbot.common.Chat360
import com.chat360.chatbot.common.CoreConfigs


@ReactModule(name = Chat360SdkModule.NAME)
class Chat360SdkModule(reactContext: ReactApplicationContext) :
  NativeChat360SdkSpec(reactContext) {
  private val reactContext: ReactApplicationContext = reactContext


  override fun getName(): String {
    return NAME
  }

  override fun startChatbot(animation: Boolean,config: ReadableMap) {

    val chat360 = Chat360().getInstance()
    if(config != null) {
      val botId = config!!.getString("botId")
      if(botId != null) {
        chat360.coreConfig = CoreConfigs(botId!!, applicationContext =  reactContext, false, mutableMapOf<String, String>(),false)
        chat360.startBot(reactContext)
      }
    }
  }




  companion object {
    const val NAME = "Chat360Sdk"
  }
}
