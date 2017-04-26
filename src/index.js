require('./index.styl')

class Progressive {
  constructor(option) {
    this.el = option.el
    this.lazyClass = option.lazyClass || 'lazy'
    this.removePreview = option.removePreview || false
    this.scale = option.scale || false

    this.EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize']
    this.Util = {
      throttle(action, delay) {
        let timeout = null
        let lastRun = 0
        return function() {
          if (timeout) {
            return
          }
          const elapsed = Date.now() - lastRun
          const context = this
          const args = arguments
          const runCallback = function() {
            lastRun = Date.now()
            timeout = false
            action.apply(context, args)
          }
          if (elapsed >= delay) {
            runCallback()
          } else {
            timeout = setTimeout(runCallback, delay)
          }
        }
      },
      on(el, ev, fn) {
        el.addEventListener(ev, fn)
      },
      off(el, ev, fn) {
        el.removeEventListener(ev, fn)
      }
    }

    this.windowHasBind = false

    this.lazy = this.Util.throttle( _ => {
      this.fire()
    }, 300)

    this.animationEvent = this.getAnimationEvent()
  }

  fire() {
    if(!this.windowHasBind){
      this.windowHasBind = true
      this.events(window, true)
    }

    const lazys = document.querySelectorAll(`${this.el} img.${this.lazyClass}`)
    const l = lazys.length
    if(l>0){
      for (let i = 0; i < l; i++) {
        const rect = lazys[i].getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0) {
          this.loadImage(lazys[i])
        }
      }
    }else {
      this.windowHasBind = false
      this.events(window, false)
    }
  }

  events(el, bind) {
    if(bind){
      this.EVENTS.forEach(evt => {
        this.Util.on(el, evt, this.lazy)
      })
    }else {
      this.EVENTS.forEach(evt => {
        this.Util.off(el, evt, this.lazy)
      })
    }
  }

  loadImage(item) {
    const img = new Image()
    if (item.dataset) {
      item.dataset.srcset && (img.srcset = item.dataset.srcset)
      item.dataset.sizes && (img.sizes = item.dataset.sizes)
    }
    img.src = item.dataset.src
    img.className = 'origin'
    if(this.scale) {
      img.className = 'origin-scale'
    }
    item.classList.remove('lazy')
    img.onload = _ => {
      this.mountImage(item, img)
    }
    img.onerror = _ => {
      item.classList.add('lazy')
    }
  }

  getAnimationEvent(){
    const el = document.createElement('fake')
    const animations = {
      "animation"      : "animationend",
      "OAnimation"     : "oAnimationEnd",
      "MozAnimation"   : "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }
    for (let a in animations){
      if (el.style[a] !== undefined){
        return animations[a]
      }
    }
  }

  mountImage(preview, img) {
    const parent = preview.parentNode
    parent.appendChild(img).addEventListener(this.animationEvent, e => {
      e.target.alt = preview.alt || ''
      preview.classList.add('hide')
      if(this.removePreview){
        parent.removeChild(preview)
        e.target.classList.remove('origin')
        e.target.classList.remove('origin-scale')
      }
    })
  }
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports)
    exports = module.exports = Progressive
    exports.Progressive = Progressive
} else if (typeof define === 'function' && define.amd)
  define('Progressive', [], function() {
    return Progressive
  })
else
  this.Progressive = Progressive