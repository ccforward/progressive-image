# progressive-image

[![NPM version][npm-image]][npm-url]

## GitHub

[https://github.com/ccforward/progressive-image](https://github.com/ccforward/progressive-image)

## NPM

[https://www.npmjs.com/package/progressive-image](https://www.npmjs.com/package/progressive-image)

## Usage

```
$ npm install progressive-image --save
 
$ yarn add progressive-image

```


## Villain JS

### demo

[progressive-image-demo](https://ccforward.github.io/progressive-image/index.html)

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
  }).fire()
})()

```



## build

```js

npm run build

```

[npm-url]: https://www.npmjs.com/package/progressive-image
[npm-image]: https://img.shields.io/npm/v/progressive-image.svg