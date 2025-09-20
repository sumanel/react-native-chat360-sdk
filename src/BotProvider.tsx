import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Chat360 from './Chat360';
import { BotView } from './BotView';

let _open: ((opts?: { onPresented?: () => void }) => void) | null = null;
let _close: (() => void) | null = null;

export const BotProvider: React.FC<{
  children: React.ReactNode;
  botUrl?: string;
  botConfig?: any;
  modalProps?: any;
  header?: React.ReactNode;
  closeButton?: React.ReactNode;
  containerStyle?: any;
}> = ({
  children,
  botUrl: initialUrl,
  botConfig,
  modalProps,
  header,
  closeButton,
  containerStyle,
}) => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState(initialUrl || '');

  _open = async ({ onPresented } = {}) => {
    if (botConfig) {
      try {
        Chat360.setConfig(botConfig);
        const built = await Chat360.startChatbot();
        setUrl(built);
      } catch (err) {
        console.warn(err);
        setUrl(initialUrl || '');
      }
    }
    setVisible(true);
    if (onPresented) onPresented();
  };

  _close = () => {
    setVisible(false);
    Chat360.closeChatBot();
  };

  Chat360._onClose = _close;

  return (
    <>
      {children}
      <Modal visible={visible} animationType="slide" {...modalProps}>
        <SafeAreaView style={[styles.flex, containerStyle]}>
          {header || (
            <View style={styles.header}>
              <TouchableOpacity onPress={() => _close && _close()}>
                {closeButton || <Text>Close</Text>}
              </TouchableOpacity>
            </View>
          )}
          <BotView url={url} style={styles.flex} />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export const openBot = (opts?: { onPresented?: () => void }) => {
  if (_open) return _open(opts);
  console.warn('BotProvider not mounted. Wrap your app with <BotProvider>.');
};

export const closeBot = () => {
  if (_close) return _close();
  console.warn('BotProvider not mounted.');
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
