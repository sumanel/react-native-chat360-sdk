import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { startChatBot } from 'react-native-chat360-sdk';

export default function App() {
  const [botId, setBotId] = useState('');
  const [appId, setAppId] = useState('');
  const [error, setError] = useState('');

  const handleLaunchBot = async () => {
    if (!botId || !appId) {
      setError('Please enter both botId and appId');
      return;
    }

    try {
      // Launch the chatbot
      await startChatBot(true, {
        botId: botId,
        appId: appId,
        meta: null, // Optionally, you can include additional meta data
      }); // Pass 'true' for animation, or 'false' for no animation
      setError('');
    } catch (e: any) {
      setError('Failed to launch chatbot: ' + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Launch Chat360 Bot</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Bot ID"
        value={botId}
        onChangeText={setBotId}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter App ID"
        value={appId}
        onChangeText={setAppId}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Launch Bot" onPress={handleLaunchBot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
