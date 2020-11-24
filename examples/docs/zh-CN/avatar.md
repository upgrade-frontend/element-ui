## Avatar 头像

用图标、图片或者字符的形式展示用户或事物信息。

### 基本用法

通过 `shape` 和 `size` 设置头像的形状和大小。

:::demo

```html
<template>
  <el-row class="demo-avatar demo-basic">
    <el-col :span="12">
      <div class="sub-title">circle</div>
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </div>
        <div class="block" v-for="size in sizeList" :key="size">
          <el-avatar :size="size" :src="circleUrl"></el-avatar>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="sub-title">square</div>
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
        </div>
        <div class="block" v-for="size in sizeList" :key="size">
          <el-avatar shape="square" :size="size" :src="squareUrl"></el-avatar>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        circleUrl:
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        squareUrl:
          'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
        sizeList: ['large', 'medium', 'small'],
      }
    },
  }
</script>
```

:::

### 展示类型

支持三种类型：图标、图片和字符

:::demo

```html
<template>
  <div class="demo-type">
    <div>
      <el-avatar icon="el-icon-user-solid"></el-avatar>
    </div>
    <div>
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div>
      <el-avatar> user </el-avatar>
    </div>
  </div>
</template>
```

:::

### Tooltip

当 `text` 或者 `tooltip` 存在时，支持鼠标 hover 显示 tooltip

:::demo

```html
<template>
  <div class="demo-type">
    <div>
      <el-avatar
        tooltip="This is a custom tooltip content"
        icon="el-icon-user-solid"
      ></el-avatar>
    </div>
    <div>
      <el-avatar
        text="element"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div>
      <el-avatar text="张全蛋" bgColor="#409eff"></el-avatar>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      errorHandler() {
        return true
      },
    },
  }
</script>
```

:::

### 图片加载失败的 fallback 行为

当展示类型为图片的时候，图片加载失败或没有传入 `src` 的 fallback 行为

可以通过默认插槽自定义展示内容，也可以通过传入 `text` 属性传入占位文本

:::demo

```html
<template>
  <div class="demo-type">
    <div>
      <el-avatar src="https://empty" @error="errorHandler">
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
    </div>
    <div>
      <el-avatar
        src="https://empty"
        @error="errorHandler"
        text="张全蛋"
        bgColor="#409eff"
      ></el-avatar>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      errorHandler() {
        return true
      },
    },
  }
</script>
```

:::

### 自定义 Text Formatter

当使用 text 作为占位文本时，默认截取最后两个字符用于展示，hover 时显示完整文本

也可以通过 `textFormatter` 方法自定义截取的行为

:::demo

```html
<template>
  <div class="demo-type">
    <div>
      <el-avatar text="张全蛋" bgColor="#409eff"></el-avatar>
    </div>
    <div>
      <el-avatar
        text="待分配"
        bgColor="#409eff"
        :text-formatter="(s) => s.slice(0, 1)"
        :font-size="15"
      ></el-avatar>
    </div>
    <div>
      <el-avatar
        text="Linus Torvalds"
        bgColor="#409eff"
        :text-formatter="(s) => s.split(' ').map(s=>s[0]).join('')"
      ></el-avatar>
    </div>
  </div>
</template>
```

:::

### 图片如何适应容器框

当展示类型为图片的时候，使用 `fit` 属性定义图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

:::demo

```html
<template>
  <div class="demo-fit">
    <div class="block" v-for="fit in fits" :key="fit">
      <span class="title">{{ fit }}</span>
      <el-avatar shape="square" :size="100" :fit="fit" :src="url"></el-avatar>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url:
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      }
    },
  }
</script>
```

:::

### Attributes

| 参数          | 说明                                                                                                                       | 类型          | 可选值                                     | 默认值                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------ | ---------------------- |
| icon          | 设置头像的图标类型，参考 Icon 组件                                                                                         | string        |                                            |                        |
| size          | 设置头像的大小                                                                                                             | number/string | number / large / medium / small            | large                  |
| shape         | 设置头像的形状                                                                                                             | string        | circle / square                            | circle                 |
| src           | 图片头像的资源地址                                                                                                         | string        |                                            |                        |
| srcSet        | 以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像                                                         | string        |                                            |                        |
| alt           | 描述图像的替换文本                                                                                                         | string        |                                            |                        |
| fit           | 当展示类型为图片的时候，设置图片如何适应容器框                                                                             | string        | fill / contain / cover / none / scale-down | cover                  |
| text          | 当图片无法加载并且没有使用默认插槽的时候，会将经过 `textFormatter` 处理后的文本作为占位符，也会用于 tooltip 的默认展示内容 | string        |                                            |                        |
| fontSize      | 显示 `text` 值的文字大小                                                                                                   | number        |                                            | 12                     |
| bgColor       | 背景颜色                                                                                                                   | string        |                                            | #c0c4cc                |
| textFormatter | 用于格式化 `text`，以便显示缩写在头像占位符中，默认取最后两个字符                                                          | function      |                                            | (str) => str.slice(-2) |
| tooltip       | tooltip 的内容，如果为空则使用 `text` 属性的值                                                                             | string        |                                            |                        |

### Events

| 事件名 | 说明                                                                 | 回调参数   |
| ------ | -------------------------------------------------------------------- | ---------- |
| error  | 图片类头像加载失败的回调， 返回 false 会关闭组件默认的 fallback 行为 | (e: Event) |

### Slot

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义头像展示内容 |
