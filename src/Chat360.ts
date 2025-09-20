class Chat360Config {
  botId: string;
  appId: string;
  meta?: Record<string, any>;
  baseUrl?: string;
  useNewUI?: boolean;

  constructor({
    botId = '',
    appId = '',
    meta = {},
    baseUrl,
    useNewUI = false,
  }: {
    botId?: string;
    appId?: string;
    meta?: Record<string, any>;
    baseUrl?: string;
    useNewUI?: boolean;
  } = {}) {
    this.botId = botId;
    this.appId = appId;
    this.meta = meta;
    this.useNewUI = useNewUI;
    this.baseUrl = baseUrl || 'https://app.chat360.io';
  }
}

class Chat360Error extends Error {
  static configDoesNotExist = 'CONFIG_DOES_NOT_EXIST';
}

class Chat360 {
  private _config: Chat360Config | null = null;
  _onClose: (() => void) | null = null;
  handleEventFunction: ((eventType: string, data: any) => void) | null = null;

  setConfig({
    botId,
    appId,
    meta,
    baseUrl,
    useNewUI,
  }: {
    botId: string;
    appId: string;
    meta?: Record<string, any>;
    baseUrl?: string;
    useNewUI?: boolean;
  }) {
    this._config = new Chat360Config({ botId, appId, meta, baseUrl, useNewUI });
  }

  private _ensureConfig() {
    if (!this._config?.botId || !this._config?.appId) {
      const e = new Error(
        'Configuration not set. Call setConfig first.'
      ) as Error & { code: string };
      e.code = Chat360Error.configDoesNotExist;
      throw e;
    }
  }

  private _buildUrl() {
    this._ensureConfig();
    const host = this._config!.baseUrl || 'https://app.chat360.io';
    const path = this._config!.useNewUI ? '/web_bot?h=' : '/page?h=';
    const botId = this._config!.botId;
    const appId = this._config!.appId;
    const metaString =
      this._config!.meta && Object.keys(this._config!.meta).length
        ? JSON.stringify(this._config!.meta)
        : '';

    return `${host}${path}${botId}&store_session=1&app_id=${appId}&is_mobile=true&mobile=1&meta=${metaString}`;
  }

  async startChatbot() {
    this._ensureConfig();
    return this._buildUrl();
  }

  async closeChat360Bot() {
    if (this._onClose) this._onClose();
  }

  // Handle bridge events from WebView (matches iOS implementation)
  _handleBridgeEvent(eventType: string, data: any, _webView?: any) {
    console.log(`[Chat360] Bridge event received: ${eventType}`, data);
    if (this.handleEventFunction) {
      this.handleEventFunction(eventType, data);
    }
  }

  // Send event to WebView
  sendToWebView(webView: any, event: any) {
    if (webView && webView.injectJavaScript) {
      const js = `window.receiveFromApp && window.receiveFromApp(${JSON.stringify(event)});true;`;
      webView.injectJavaScript(js);
    }
  }
}

export default new Chat360();
