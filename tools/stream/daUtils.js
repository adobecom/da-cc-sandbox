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

async function getEnvEps() {
  const response = await fetch('https://main--stream-mapper--adobecom.aem.live/configuration/app-endpoints.json');
  const envInfo = await response.json();
  const endpointByEnv = Object.fromEntries(
    envInfo.data.map(({ env, endpoint }) => [env, endpoint])
  );
}

(async () => {
  try {
    const endpointByEnv = await getEnvEps();
    const STREAM_PROD = endpointByEnv.prod;
    const STREAM_STAGE = endpointByEnv.stage;
    const STREAM_DEV = endpointByEnv.dev;
    const STREAM_DEV02 = endpointByEnv.dev02;
    const { context, token } = await DA_SDK;
    const { repo, path, ref, search } = context;
    const appPath = endpointByEnv[ref] ? endpointByEnv[ref] : endpointByEnv['prod'];
    let appLoc = `${appPath}?tenant=${repo}`;
    appLoc = getAppLocWithToken(appLoc, token);
    appLoc = getAppLocWithCollab(appLoc, search);
    window.location.replace(appLoc);
  } catch (error) {
    console.error('Error initializing app:', error);
  }
})();
