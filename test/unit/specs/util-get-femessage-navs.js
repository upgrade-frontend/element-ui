import { getFrontendInfraBaseUrl } from 'element-ui/src/utils/get-femessage-navs';

const defaultBaseUrl = 'https://frontend-infra.deepexi.com/#/material';

describe('Utils:getFemessageNavs', () => {
  it('getFrontendInfraBaseUrl navs is empty', () => {
    const navs = [];

    const url = getFrontendInfraBaseUrl(navs);

    expect(url).to.equal(defaultBaseUrl);
  });

  it('getFrontendInfraBaseUrl navs no frontendInfraBaseUrl', () => {
    const navs = [
      {
        repoName: 'update-popup',
        packageName: '@femessage/update-popup'
      }
    ];

    const url = getFrontendInfraBaseUrl(navs);

    expect(url).to.equal(defaultBaseUrl);
  });

  it('getFrontendInfraBaseUrl navs has frontendInfraBaseUrl', () => {
    const baseUrl =
      'https://frontend-infra.deepexi.com/home/index.html#/material';
    const navs = [
      {
        repoName: 'update-popup',
        packageName: '@femessage/update-popup'
      },
      {
        repoName: 'el-data-table',
        packageName: '@femessage/el-data-table',
        frontendInfraBaseUrl: baseUrl
      }
    ];

    const url = getFrontendInfraBaseUrl(navs);

    expect(url).to.equal(baseUrl);
  });
});
