# progressive-image

A dead simple progressive-image module for Vanilla JavaScript and Vue.js 1.0+ & 2.0+

![gif](https://github.com/ccforward/cc/raw/master/Blog/pic/progressive-0.gif)

## GitHub

[GitHub - progressive-image](https://github.com/ccforward/progressive-image)

## NPM

[![NPM version][npm-image]][npm-url]

[NPM - progressive-image](https://www.npmjs.com/package/progressive-image)

## update

#### @v1.1.0
add the `scale` option for origin image animation

## Install

```shell
$ npm install progressive-image --save
 
$ yarn add progressive-image
```

## For Vanilla JS

### demo

[progressive-image-demo](https://ccforward.github.io/progressive-image/index.html)

[progressive-image-vue-demo](https://ccforward.github.io/progressive-image/example/demo-vue.html)

### Usage

#### import css
```html
<link href="./node_modules/progressive-image/dist/index.css" rel="stylesheet" type="text/css">
```

or

```html
<link href="//unpkg.com/progressive-image/dist/index.css" rel="stylesheet" type="text/css">
```

#### HTML

```html
<main id="app">
  <div class="progressive">
    <img class="preview lazy" data-src="http://7xiblh.com1.z0.glb.clouddn.com/progressive/1.jpg" src="http://7xiblh.com1.z0.glb.clouddn.com/progressive/r1.jpg" />
  </div>
  <div class="progressive">
    <img class="preview lazy" data-src="http://7xiblh.com1.z0.glb.clouddn.com/progressive/2.jpg" src="http://7xiblh.com1.z0.glb.clouddn.com/progressive/r2.jpg" />
  </div>
</main>
<script src="./dist/index.js"></script>
```

#### JS

```js
(function(){
  new Progressive({
    el: '#app',
    lazyClass: 'lazy',
    removePreview: true
    scale: true
  }).fire()
})()

```

## For Vue.js

#### import css
```html
<link href="./node_modules/progressive-image/dist/index.css" rel="stylesheet" type="text/css">
```

or

```html
<link href="//unpkg.com/progressive-image/dist/index.css" rel="stylesheet" type="text/css">
```

#### HTML

```html
<main id="app">
  <template v-for="item in imgs">
    <div class="space"></div>
    <div class="progressive">
      <img class="preview" v-progressive="item.src" :data-srcset="item.srcset" :src="item.preview" />
    </div>
  </template>
</main>
```

#### JS

```js
import Vue from 'vue'
import progressive from 'progressive-image/dist/vue'

Vue.use(progressive, {
  removePreview: true,
  scale: true
})

new Vue({
  name: 'demo',
  el: '#app',
  data: {
    imgs: [
      {
        src: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/2.jpg',
        preview: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/r2.jpg'
      },
      {
        src: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/3.jpg',
        preview: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/r3.jpg'
      }
    ]
  }
})
```


## build

#### build dist

```shell
npm run build
```

#### build demo

```shell
npm run demo
```

[npm-url]: https://www.npmjs.com/package/progressive-image
[npm-image]: https://img.shields.io/npm/v/progressive-image.svg