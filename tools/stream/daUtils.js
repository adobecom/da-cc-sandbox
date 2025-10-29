// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

(async () => {
  try {
    const { context, token } = await DA_SDK;
    const { repo, path, ref } = context;
    let appPath =
      'https://enigma--cc--aishwaryamathuria.aem.live/enigma/index.html';
    const appName = path.split('/').pop();
    switch (appName) {
      case 'command-center':
        appPath =
          'https://poc-command-center--cc--adobecom.aem.live/tools/command-center/index.html';
        break;
    }
    window.location.replace(
      `${appPath}?tenant=${repo}&ref=${ref}&token=${token}`
    );
  } catch (error) {
    console.error('Error initializing DA_SDK:', error);
  }
})();
