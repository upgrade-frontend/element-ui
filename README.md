## element-ui 增强版临时包，目前新增有tree组件的虚拟滚动，待完善功能后会合入element-ui主分支中
## element-ui Enhanced version of the temporary package, currently added to the tree component of virtual scrolling, to be improved after the function will be merged into the main branch of element ui

<p align="center">
  <img src="https://cdn.rawgit.com/ElemeFE/element/dev/element_logo.svg">
</p>

[![NPM Download](https://badgen.net/npm/dm/@upgrade-frontend/element-ui)](https://www.npmjs.com/package/@upgrade-frontend/element-ui)
[![NPM Version](https://badgen.net/npm/v/@upgrade-frontend/element-ui)](https://www.npmjs.com/package/@upgrade-frontend/element-ui)
[![NPM License](https://badgen.net/npm/license/@upgrade-frontend/element-ui)](https://github.com/upgrade-frontend/element-ui/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/upgrade-frontend/element-ui/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

---

## Install
```shell
npm install @upgrade-frontend/element-ui -S

#or
yarn add @upgrade-frontend/element-ui
```

## Quick Start
> 目前element-ui引入时候入口文件中只打入了Tree组件，所以如果混着用的话建议如下

> At present, when the element ui is introduced, only the tree component is entered into the entry file. Therefore, if the element UI is mixed, the following suggestions are made

```javascript
import Vue from "vue"
import { Input, Button} from "element-ui"
// tree组件单独引入
import { Tree } from "@upgrade-frontend/element-ui"
// 因为Tree单独引入，upgrade-frontend/element-ui暂时不支持按需加载样式，所以Tree样式也需要单独引入样式
import "element-ui/lib/theme-chalk/tree.css"

Vue.use(Tree) // 使用@upgrade-frontend/element-ui的tree组件
Vue.use(Input) // 使用element-ui的Input和Button组件
Vue.use(Button)

```
```javascript
Tree组件新增3个参数，同时传`height`和`virtual-scroll`=true，则开启虚拟滚动
// height：设置虚拟滚动容器高度，设置后自动启动虚拟容器 | number | 0 |
// item-height: 子元素高度 | number| 26 |
// virtual-scroll: 是否支持虚拟滚动 | boolean | false |


Three new parameters are added to the tree component, and 'height' and 'virtual scroll' = true are passed at the same time to enable virtual scrolling
// height：Set the height of virtual rolling container, and start the virtual container automatically after setting | number | 0 |
// item-height: Sub element height | number| 26 |
// virtual-scroll: enable virtual scrolling | boolean | false |
```
## Generate Theme
```sh
# fork this repository

git clone https://github/{ user || owner }/element.git

# remember: if want to update your component and its css, must merge latest only-component branch into your repository
git checkout -b only-component new-theme

# modify packages/theme-chalk/src/common/var.scss

# modify package name in packages/theme-chalk/package.json

sh ./publish-theme.sh

# now a new theme publish to npm for your own
```

The reason to checkout from branch `only-component`, can be found in [Contributing Guide](https://github.com/upgrade-frontend/element-ui/blob/master/.github/CONTRIBUTING.zh-CN.md)

## Development
```sh
# install dependence
yarn bootstrap

# generate files for examples site
yarn build:file

# generate theme files
yarn build:theme

# generate utils files
yarn build:utils

# generate files about locale
yarn build:umd

# clean files from yarn dist
yarn clean

# bundle examples site
yarn deploy:build

# bundle extension files
yarn deploy:extension

# extension local dev
yarn dev:extension

# local dev and preview examples site
yarn dev

# local dev single component
yarn dev:play

# bundle all lib
yarn dist

# generate i18n files
yarn i18n

# using eslint to check code style
yarn lint

# run unit test
yarn test
```

## Contribution
Please make sure to read the [Contributing Guide](https://github.com/upgrade-frontend/element-ui/blob/master/.github/CONTRIBUTING.zh-CN.md) before making a pull request.

## Browser Support
Modern browsers and Internet Explorer 10+.

## Links
- [ChangeLog](https://github.com/upgrade-frontend/element-ui/releases)

## LICENSE
[MIT](LICENSE)
