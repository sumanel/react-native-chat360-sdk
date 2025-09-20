# React Native Chat360 SDK

React Native SDK converted from the iOS Chat360 SDK. Provides both embeddable bot view and full-screen modal bot.

## Installation
```bash
npm install react-native-chat360-sdk react-native-webview
```

## Usage
```tsx
import React from 'react';
import { BotProvider, openBot } from 'react-native-chat360-sdk';
import Chat360 from 'react-native-chat360-sdk/src/Chat360';

export default function App() {
  return (
    <BotProvider 
      botConfig={{ botId: 'BOT', appId: 'APP', meta: { userId: '123' }, useNewUI: true }}
      modalProps={{ animationType: 'fade' }}
      header={<CustomHeader />}
      closeButton={<CustomCloseIcon />}
      containerStyle={{ backgroundColor: 'white' }}
    >
      <Home />
    </BotProvider>
  );
}

// Open bot anywhere
openBot();
```

For embedding:
```tsx
import { BotView } from 'react-native-chat360-sdk';
<BotView url={'https://app.chat360.io'} containerStyle={{ margin: 8 }} />
```

## Configuration Options

### Bot Configuration:
- `botId` - Your Chat360 bot ID
- `appId` - Your Chat360 app ID  
- `meta` - Additional metadata object
- `baseUrl` - Custom base URL (defaults to `https://app.chat360.io`)
- `useNewUI` - Enable new UI experiment (defaults to `false`)

---

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
