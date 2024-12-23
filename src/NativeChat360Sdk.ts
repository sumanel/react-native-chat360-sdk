import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  startChatbot(
    animated: boolean,
    config: { botId: string; appId: string; meta: Object | null }
  ): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Chat360Sdk');
