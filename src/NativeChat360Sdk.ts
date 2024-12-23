import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  startChatbot(config: { botId: string; metadata: string }): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Chat360Sdk');
