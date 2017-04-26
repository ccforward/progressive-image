export default (Vue, Opt = {}) => {
  Array.prototype.remove = function(item) {
    if(!this.length) return
    const idx = this.indexOf(item);
    if(idx > -1) return this.splice(idx,1)
  }
  const isVue2 = Vue.version.split('.')[0] == '2'
  const EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize']
  const Util = {
    getAnimationEvent() {
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
    },
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
  const events = (el, bind) => {
    if(bind){
      EVENTS.forEach(evt => {
        Util.on(el, evt, lazy)
      })
    }else {
      EVENTS.forEach(evt => {
        Util.off(el, evt, lazy)
      })
    }
  }

  const animationEvent = Util.getAnimationEvent()

  const Listeners = []
  const imgCache = []

  const Options = {
    removePreview: Opt.removePreview || false,
    scale: Opt.scale || false,
    hasBind: false
  }

  const lazy = Util.throttle( _ => {
    for(let i=0,l=Listeners.length;i<l;i++){
      checkImage(Listeners[i])
    }
  }, 300)

  const checkImage = listener => {
    if(imgCache.indexOf(listener.src) > -1){
      return render(listener.el, listener.src, 'loaded')
    }else {
      const rect = listener.el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0) {
        loadImage(listener)
      }
    }
  }

  const isExist = el => {
    let exist  = false
    Listeners.forEach(item => {
      if(item.el == el) exist = true
    })
    if(exist){
      Vue.nextTick( () => {
        lazy()
      })
    }
    return exist
  }
  const init = (el, binding, vnode) => {
    if(isExist(el)) return;

    const src = binding.value
    if(imgCache.indexOf(src) > -1) {
      return render(el, src, 'loaded')
    }
    Vue.nextTick( _ => {
      if(!isExist(el)){
        Listeners.push({
          el: el,
          src: src
        })
      }
      lazy()
      if(Listeners.length > 0 && !Options.hasBind) {
        Options.hasBind = true
        events(window, true)
      }
    })

  }

  
  const render = (el, src, status) => {
    el.setAttribute('lazy', status);
  }
  const loadImage = item => {
    const img = new Image()
    if (item.el.dataset) {
      item.el.dataset.srcset && (img.srcset = item.el.dataset.srcset)
      item.el.dataset.sizes && (img.sizes = item.el.dataset.sizes)
    }
    
    img.src = item.src
    img.className = 'origin'
    if(Options.scale) {
      img.className = 'origin-scale'
    }
    img.onload = _ => {
      Listeners.remove(item)
      imgCache.push(item.src)
      mountImage(item, img)
    }
    img.onerror = _ => {
      
    }
  }

  const mountImage = (item, img) => {
    const preview = item.el
    const parent = preview.parentNode
    parent.appendChild(img).addEventListener(animationEvent, e => {
      preview.alt && (e.target.alt = preview.alt)
      preview.classList.add('hide')
      if(Options.removePreview){
        parent.removeChild(preview)
        e.target.classList.remove('origin')
        e.target.classList.remove('origin-scale')
      }
    })
  }

  const unbind = (el, binding, vnode, oldValue) => {
    if (!el) return
    if (Options.hasBind) {
      events(window, false)
    }
  }

  if (isVue2) {
    Vue.directive('progressive', {
      bind: init,
      update: init,
      inserted: init,
      comppnentUpdated: lazy,
      unbind: unbind
    })
  } else {
    Vue.directive('progressive', {
      bind: lazy,
      update(newValue, oldValue) {
        init(this.el, {
          modifiers: this.modifiers,
          arg: this.arg,
          value: newValue,
          oldValue: oldValue
        })
      },
      unbind() {
        unbind(this.el)
      }
    })
  }
}
