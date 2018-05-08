/* 
实现一个EventEmitter类，这个类包含以下方法：
- on（监听事件，该事件可以被触发多次）
- once（也是监听事件，但只能被触发一次）
- emit（触发指定的事件）
- off（移除指定事件的某个回调方法或者所有回调方法）
*/
class EventEmitter {
  constructor() {
    this.queue = {}; // 用于储存事件
    this.onceQueue = {}; // once
  }
  on(type, fn) {
    //注册事件监听
    if (!this.queue[type]) {
      this.queue[type] = [];
    }
    this.queue[type].push(fn)
  }
  once(type, fn) {
    if (!this.onceQueue[type]) {
      this.onceQueue[type] = {
        fns: [],
        isEmitted: false // 标志位
      }
    }
    this.onceQueue[type].fns.push(fn)
  }
  emit(type, ...args) {
    const onHandler = this.queue[type];
    const onceHandler = this.onceQueue[type];
    if (!onHandler && !onceHandler) {
      throw new Error(`event ${type} has not registered ....`)
    }
    else {
      if (onHandler) {
        if (onHandler.length === 0) {
          throw new Error(`event ${type} has not registered ....`)
        }
        for (let i = 0; i < onHandler.length; i++) {
          if (args.length === 0) {
            onHandler[i].call(this)
          } else {
            onHandler[i].apply(this, args)
          }
        }
      }
      if (onceHandler) {
        if (!onceHandler.isEmitted) {
          for (let i = 0; i < onceHandler.fns.length; i++) {
            if (args.length === 0) {
              onceHandler.fns[i].call(this)
            } else {
              onceHandler.fns[i].apply(this, args)
            }
          }
          onceHandler.isEmitted = true;
        }
      }
    }
  }
  off(type) {
    // 用于解除之前绑定的事件
    // 同样要考虑是否之前已经绑定了
    let onceHandler = this.onceQueue[type];
    let onHandler = this.queue[type]
    if (!onHandler && !onceHandler) {
      throw new Error(`event ${type} has not registered ....`)
    } else {
      if (onHandler) {
        // 如果这个handle 不是undefinded
        this.queue[type] = []
      }
      if (onceHandler) {
        this.onceQueue[type] = {}
      }
      console.log('ok')
      return '解除成功了'
    }
  }
}
