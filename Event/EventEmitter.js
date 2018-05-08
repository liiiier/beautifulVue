class EventEmitter {
  constructor() {
    this._events = this._events || new Map()
    this._maxlistenLen = 10;
  }
  emit(type, ...args) {
    let handler;
    handler = this._events.get(type);
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        if (args.length > 0) {
          handler[i].apply(this, args)
        } else {
          handler[i].call(this)
        }
      }
    } else {
      if (args.length > 0) {
        handler.apply(this, args)
      } else {
        handler.call(this)
      }
    }

  }
  addListener(type, fn) {
   const handler = this._events.get(type);
   if(!handler){
     this._events.set(type, fn)
   } else if(handler && typeof handler === 'function') {
     this._events.set(type, [handler, fn])
   } else {
     handler.push(fn);
   }
  }
}
const event = new EventEmitter();
event.addListener('say', (name) => {
  console.log('我是' + name)
})
event.addListener('say', () => {
  console.log(22)
})
event.addListener('say', () => {
  console.log(32)
})
event.addListener('say', () => {
  console.log(42)
})
event.emit('say', 'zhanghongyang')

