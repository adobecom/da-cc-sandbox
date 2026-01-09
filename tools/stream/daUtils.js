// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

(async () => {
  try {
    const STREAM_PROD = 'https://440859-stream.adobeio-static.net/index.html';
    const STREAM_STAGE = 'https://440859-stream-stage.adobeio-static.net/index.html';
    const STREAM_LOCAL = 'http://localhost:5173/index.html';
    const { context, token } = await DA_SDK;
    const { repo, path, ref } = context;
    const env = new URL(window.location.href).searchParams.get('streamRef');
    let appPath = '';
    switch (env) {
      case 'stage':
        appPath = STREAM_STAGE;
        break;
      case 'local':
        appPath = STREAM_LOCAL;
        break;
      default:
        appPath = STREAM_PROD;
        break;
    }
    const appName = path.split('/').pop();
    switch (appName) {
      case 'command-center':
        appPath =
          'https://poc-command-center--cc--adobecom.aem.live/tools/command-center/index.html';
        break;
    }
    window.location.replace(
      `${appPath}?tenant=${repo}&token=${token}`
    );
  } catch (error) {
    console.error('Error initializing DA_SDK:', error);
  }
})();
