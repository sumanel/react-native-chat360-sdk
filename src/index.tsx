import Chat360Sdk from './NativeChat360Sdk';

export function startChatBot(
  animated: boolean,
  config: { botId: string; appId: string; meta: Object | null }
): void {
  return Chat360Sdk.startChatbot(animated, config);
}
