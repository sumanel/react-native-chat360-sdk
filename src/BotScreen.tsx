import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Chat360 from './Chat360';
import { Chat360BotView } from './BotView';

type Chat360BotScreenProps = {
  botConfig: {
    botId: string;
    appId: string;
    meta?: Record<string, any>;
    baseUrl?: string;
    useNewUI?: boolean;
  };
  style?: any;
  containerStyle?: any;
  loadingIndicator?: React.ReactNode;
  onMessage?: (data: any) => void;
};

export const Chat360BotScreen: React.FC<Chat360BotScreenProps> = ({
  botConfig,
  style,
  containerStyle,
  loadingIndicator,
  onMessage,
}) => {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeBot = async () => {
      try {
        Chat360.setConfig(botConfig);
        const builtUrl = await Chat360.startChatbot();
        setUrl(builtUrl);
        console.log(builtUrl)
      } catch (error) {
        console.error('Failed to initialize bot:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeBot();
  }, [botConfig]);

  if (isLoading) {
    return (
      <View style={[styles.container, containerStyle]}>
        {loadingIndicator || <View style={styles.loadingPlaceholder} />}
      </View>
    );
  }

  if (!url) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.errorPlaceholder} />
      </View>
    );
  }

  return (
    <Chat360BotView
      url={url}
      style={style}
      containerStyle={containerStyle}
      loadingIndicator={loadingIndicator}
      onMessage={onMessage}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingPlaceholder: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  errorPlaceholder: {
    flex: 1,
    backgroundColor: '#ffebee',
  },
});
