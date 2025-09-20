import React, { useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Chat360 from './Chat360';

type BotViewProps = {
  url: string;
  style?: any;
  onMessage?: (data: any) => void;
  containerStyle?: any;
  loadingIndicator?: React.ReactNode;
};

export const BotView: React.FC<BotViewProps> = ({
  url,
  style,
  containerStyle,
  onMessage,
  loadingIndicator,
}) => {
  const webRef = useRef<any>(null);

  // JavaScript bridge code that matches the iOS implementation
  const jsBridge = `
    (function() {
      // --- Override console.log ---
      var oldLog = console.log;
      console.log = function() {
        var msg = Array.from(arguments).map(a => {
          try { return JSON.stringify(a); } catch(e) { return String(a); }
        }).join(' ');
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'consoleBridge',
            message: msg
          }));
        }
        oldLog.apply(console, arguments);
      };

      // --- Send events to native via jsBridge ---
      window.sendToApp = function(event) {
        if (!event || !event.type) {
          console.log('sendToApp requires event.type');
          return;
        }
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'jsBridge',
            ...event
          }));
        } else {
          console.log("jsBridge not available:", event);
        }
      };

      // --- Receive events from native ---
      window.receiveFromApp = function(event) {
        console.log("Received from app:", event);
        if (window.onAppEvent) {
          window.onAppEvent(event);
        }
      };

      // --- Legacy support for existing Chat360 events ---
      window.__chat360_on_native_response = function(data) {
        console.log("Legacy Chat360 response:", data);
        if (window.onAppEvent) {
          window.onAppEvent(data);
        }
      };
    })();
    true;
  `;

  const handleMessage = (event: any) => {
    let data: any;
    try {
      data = JSON.parse(event.nativeEvent.data);
    } catch {
      data = { raw: event.nativeEvent.data };
    }

    // Handle console bridge messages
    if (data.type === 'consoleBridge') {
      console.log('[JS Console]:', data.message);
      return;
    }

    // Handle jsBridge messages
    if (data.type === 'jsBridge') {
      const eventType = data.eventType || data.type;
      const eventData = data.data || data;

      if (eventType) {
        Chat360._handleBridgeEvent(eventType, eventData, webRef.current);
      }
      return;
    }

    if (onMessage) onMessage(data);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <WebView
        ref={webRef}
        source={{ uri: url }}
        onMessage={handleMessage}
        originWhitelist={['*']}
        startInLoadingState
        injectedJavaScript={jsBridge}
        renderLoading={() =>
          (loadingIndicator as React.ReactElement) || (
            <ActivityIndicator style={{ flex: 1 }} />
          )
        }
        style={[{ flex: 1 }, style]}
        onLoadStart={() => console.log('[Chat360Bot] Bot started loading.')}
        onLoadEnd={() => console.log('[Chat360Bot] Bot finished loading.')}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.log(
            '[Chat360Bot] Bot failed with error:',
            nativeEvent.description
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
