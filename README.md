# React Native Chat360 SDK

React Native SDK converted from the iOS Chat360 SDK. Provides both embeddable bot view and full-screen modal bot.

## Installation
```bash
npm install react-native-chat360-sdk react-native-webview
```

## Usage

### Modal Chat360Bot (Recommended)
```tsx
import React from 'react';
import { Chat360BotProvider, openChat360Bot } from 'react-native-chat360-sdk';

export default function App() {
  return (
    <Chat360BotProvider
      modalProps={{ animationType: 'fade' }}
      header={<CustomHeader />}
      closeButton={<CustomCloseIcon />}
      containerStyle={{ backgroundColor: 'white' }}
    >
      <Home />
    </Chat360BotProvider>
  );
}

// Open Chat360Bot anywhere with configuration
openChat360Bot({
  botConfig: {
    botId: 'BOT',
    appId: 'APP',
    meta: { userId: '123' },
    useNewUI: true
  },
  onPresented: () => console.log('Chat360Bot opened')
});
```

### Chat360Bot Screen Component
```tsx
import React from 'react';
import { Chat360BotScreen } from 'react-native-chat360-sdk';

export default function MyScreen() {
  return (
    <Chat360BotScreen
      botConfig={{
        botId: 'BOT',
        appId: 'APP',
        meta: { userId: '123' },
        useNewUI: true
      }}
      containerStyle={{ margin: 8 }}
      onMessage={(data) => console.log('Message:', data)}
    />
  );
}
```

## Configuration Options

### Chat360Bot Configuration:
- `botId` - Your Chat360 bot ID
- `appId` - Your Chat360 app ID (You can send you app name in it)
- `meta` - Additional metadata object
- `baseUrl` - Custom base URL
- `useNewUI` - Enable new UI experiment (defaults to `false`)

---

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
