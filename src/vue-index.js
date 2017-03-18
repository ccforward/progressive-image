

export default (Vue, Opt = {}) => {
  const isVue2 = Vue.version.split('.')[0] == '2'
  const EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize']
  const Util = {
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
  const Options = {
    lazyClass: Opt.lazyClass || 'lazy',
    removePreview: Opt.removePreview || 'false',
    try: Opt.try || 3,
    windowHasBind: false
  }



  
  const addListener = (el, binding, vnode) => {
    if (el.getAttribute('lazy') == 'loaded') return
    if (isExist(el)) return

    let imgSrc = binding.value
    let imgLoading = Options.loading
    let imgError = Options.error

    if (imgCache.indexOf(imgSrc) > -1) {
      return render(el, imgSrc, 'loaded', binding.arg)
    }

    render(el, imgLoading, 'loading', binding.arg)

    Vue.nextTick(() => {
      Listeners.push({
        el: el,
        src: imgSrc,
        error: imgError,
        try: 0,
        bindType: binding.arg
      })

      lazyloadFire()

      // 绑定滚动事件 只绑定一次
      if (Listeners.length > 0 && !Options.hasBind) {
        Options.hasBind = true
        events(window, true)
      }
    })
  }




  if (isVue2) {
    Vue.directive('lazy', {
      bind: addListener,
      update: addListener,
      inserted: addListener,
      comppnentUpdated: lazyloadFire,
      unbind: unbind
    })
  } else {
    Vue.directive('lazy', {
      bind: lazyloadFire,
      update(newValue, oldValue) {
        addListener(this.el, {
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
