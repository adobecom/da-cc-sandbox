// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

(async () => {
  try {
    const STREAM_PROD = 'https://440859-stream.adobeio-static.net/index.html';
    const STREAM_STAGE = 'https://440859-stream-stage.adobeio-static.net/index.html';
    const STREAM_DEV = 'https://440859-stream-dev.adobeio-static.net/index.html';
    const { context, token } = await DA_SDK;
    const { repo, path, ref } = context;
    let appPath = '';
    switch (ref) {
      case 'dev':
        appPath = STREAM_DEV;
        break;
      case 'stage':
        appPath = STREAM_STAGE;
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
