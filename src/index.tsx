import Chat360Sdk from './NativeChat360Sdk';

interface IChat360Metadata {
  [key: string]: string;
}

export function startChatBot(config: {
  botId: string;
  metadata: IChat360Metadata;
}): void {
  return Chat360Sdk.startChatbot({
    botId: config.botId,
    metadata: JSON.stringify(config.metadata),
  });
}
