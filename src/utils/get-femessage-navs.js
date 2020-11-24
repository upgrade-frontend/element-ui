const defaultBaseUrl = 'https://frontend-infra.deepexi.com/#/material';
const navListUrl =
  '//mockapi.eolinker.com/jttjNwp60fc1c9e944fdf1cc494b28a7ca4cfe66bbafee1/prod/open';

// 只要有一个设置了 frontendInfraBaseUrl，就相当于全部都设置了这个值
export function getFrontendInfraBaseUrl(navs) {
  const nav = navs.find((nav) => nav.frontendInfraBaseUrl);

  return nav ? nav.frontendInfraBaseUrl : defaultBaseUrl;
}

export function getFemessageNavs() {
  const xhr = new XMLHttpRequest();

  // eslint-disable-next-line no-undef
  return new Promise((resolve) => {
    xhr.onreadystatechange = (_) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const { data: navs } = JSON.parse(xhr.responseText);

        const baseUrl = getFrontendInfraBaseUrl(navs);

        const femessageNavs = navs
          .map((nav) => {
            nav.url = `${baseUrl}/${nav.repoName}`;
            return nav;
          })
          .filter((nav) => nav.lib && nav.lib.indexOf('element') > -1);

        resolve(femessageNavs);
      }
    };

    xhr.open('GET', navListUrl);

    xhr.send();
  });
}
