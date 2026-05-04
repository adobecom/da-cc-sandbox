// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

function getAppLocWithToken(appLoc, token) {
  if (token) return `${appLoc}&token=${token}`;
  return appLoc;
}

function getAppLocWithCollab(appLoc, search) {
  const searchParams = new URLSearchParams(search);
  const collabId = searchParams.get("streamCollabId");
  if (collabId) return `${appLoc}&collabId=${collabId}`;
  return appLoc;
}

(async () => {
  try {
    const STREAM_PROD = 'https://440859-stream.adobeio-static.net/index.html';
    const STREAM_STAGE = 'https://440859-stream-stage.adobeio-static.net/index.html';
    const STREAM_DEV = 'https://440859-stream-dev.adobeio-static.net/index.html';
    const STREAM_DEV02 = 'https://440859-stream-dev02.adobeio-static.net/index.html';
    const { context, token } = await DA_SDK;
    const { repo, path, ref, search } = context;
    let appPath = '';
    switch (ref) {
      case 'dev':
        appPath = STREAM_DEV;
        break;
      case 'dev02':
        appPath = STREAM_DEV02;
        break;
      case 'stage':
        appPath = STREAM_STAGE;
        break;
      default:
        appPath = STREAM_PROD;
        break;
    }
    let appLoc = `${appPath}?tenant=${repo}`;
    appLoc = getAppLocWithToken(appLoc, token);
    appLoc = getAppLocWithCollab(appLoc, search);
    window.location.replace(appLoc);
  } catch (error) {
    console.error('Error initializing DA_SDK:', error);
  }
})();