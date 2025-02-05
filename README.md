# React Native Chat360 SDK

Easily integrate Chat360 chatbots into your React Native applications with the `react-native-chat360-sdk`. This library provides a straightforward way to launch and interact with Chat360 bots, offering customizable metadata support for tailored experiences.

---

## Installation

### Prerequisites

Ensure your React Native environment is properly configured. For setup instructions, refer to the official [React Native documentation](https://reactnative.dev/docs/environment-setup).

### Install the Package

Add the Chat360 SDK to your project:

```bash
npm install react-native-chat360-sdk
# or
yarn add react-native-chat360-sdk
```

This SDK is tested for React Native versions : 0.76.0 onwards. 

### Android Permissions

#### Conditional Permission:

**Record Audio:**

If you want to use the Speech-to-Text feature, please add the following permissions to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```

**Location:**

If your bot requires location permissions, please add the following permissions to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

---

## Usage

### Launching a Chatbot

Below is a basic example of how to use the SDK:

```typescript
import { startChatBot } from 'react-native-chat360-sdk';

const metadata = {
  userId: '12345',
  sessionId: 'abcde12345',
  language: 'en',
};

startChatBot({
  botId: 'your-bot-id', // Replace with your Chat360 bot ID
  metadata,
});
```

### Steps to Get Started

1. Replace `'your-bot-id'` with the unique ID of your Chat360 bot.
2. Define the `metadata` object with relevant details, such as `userId`, `sessionId`, and any other context-specific data.
3. Invoke the `startChatBot` function with your bot ID and metadata to launch the chatbot.

---

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
