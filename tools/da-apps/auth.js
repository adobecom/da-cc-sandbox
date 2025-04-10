const ORG_MAP = {
  'da-bacom': 'DA BACOM',
  'da-bacom-blog': 'DA BACOM BLOG',
  'da-cc-sandbox': 'DA BACOM',
};

(async function init() {
  document.body.style.visibility = 'hidden';

  const searchParams = new URLSearchParams(window.location.search);

  const repo = searchParams.get('tenant');
  const token = searchParams.get('token');
  const ref = searchParams.get('ref');
  const redirectPath = searchParams.get('path');

  const tenant = ORG_MAP[repo];

  window.sessionStorage.setItem('da-repo', tenant);
  window.sessionStorage.setItem('da-token', token);
  window.sessionStorage.setItem('da-ref', ref);

  if (token === 'undefined') {
    document.body.innerHTML = `
      <div style='display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column;'>
        <h2>Please sign in to continue</h2>
      </div>
    `;
    document.body.style.visibility = 'visible';
    return;
  }

  const fullURL = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }${window.location.pathname}#/${redirectPath}`;
  window.history.replaceState({}, null, fullURL);
  document.body.style.visibility = 'visible';
})();
