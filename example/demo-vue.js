import Vue from 'vue'
import progressive from'../src/index-vue'

Vue.use(progressive, {
  removePreview: true
})

new Vue({
  name: 'demo',
  el: '#app',
  data: {
    big1: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/1.jpg',
    big2: './assets/4.jpg',
    imgs: [
      {
        src: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/2.jpg',
        srcset: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/2.jpg',
        preview: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/r2.jpg'
      },
      {
        src: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/3.jpg',
        preview: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/r3.jpg'
      },
      {
        src: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/7.jpg',
        preview: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/r7.jpg'
      },
      {
        src: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/6.jpg',
        preview: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/r6.jpg'
      },
      {
        src: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/5.jpg',
        preview: 'http://7xiblh.com1.z0.glb.clouddn.com/progressive/r5.jpg'
      }

    ]
  }
})