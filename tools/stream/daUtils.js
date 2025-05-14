// eslint-disable-next-line import/no-unresolved
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

(async () => {
  try {
    const { context, token } = await DA_SDK;
    const { repo, path } = context;
    window.location.replace(
      `https://enigma--cc--aishwaryamathuria.aem.live/enigma/index.html`
    );
  } catch (error) {
    console.error('Error initializing DA_SDK:', error);
  }
})();
