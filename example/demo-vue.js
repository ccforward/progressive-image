import Vue from 'vue'
import progressive from'../src/index-vue'

Vue.use(progressive, {
  removePreview: true,
  scale: false
})

new Vue({
  name: 'demo',
  el: '#app',
  data: {
    big1: '../assets/1.jpg',
    big2: './assets/4.jpg',
    imgs: [
      {
        src: '../assets/2.jpg',
        srcset: '../assets/2.jpg',
        preview: '../assets/r2.jpg'
      },
      {
        src: '../assets/3.jpg',
        preview: '../assets/r3.jpg'
      },
      {
        src: '../assets/7.jpg',
        preview: '../assets/r7.jpg'
      },
      {
        src: '../assets/6.jpg',
        preview: '../assets/r6.jpg'
      },
      {
        src: '../assets/5.jpg',
        preview: '../assets/r5.jpg'
      }

    ]
  }
})