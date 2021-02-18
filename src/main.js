class Operation {
  constructor () {
    this.handlers = {}

    this.states = ['pending', 'successfully', 'failed']
    this.state = this.states[0]
  }

  then (callback) {
    this.on('success', callback)
    this.on('fail', callback)
  }

  dispatch (e, ...values) {
    if (e === 'success') {
      this.state = this.states[1]
    } else if (e === 'fail') {
      this.state = this.states[2]
    }

    for (const handler of this.handlers[e] || []) {
      handler(...values)
    }
  }

  fail (...values) {
    this.dispatch('fail', ...values)
  }

  success (...values) {
    this.dispatch('success', ...values)
  }

  on (e, handler) {
    if (typeof this.handlers[e] !== 'object') {
      this.handlers[e] = []
    }

    this.handlers[e].push(handler)
  }
}

const waitFor = (operation, callback) => {
  operation.on('success', callback)
  operation.on('fail', callback)
}

const isSuccess = operation => {
  return operation.state === operation.states[1]
}

const waitfor = waitFor

if (window) {
  window.waitFor = waitFor
  window.waitfor = waitfor
  window.Operation = Operation
  window.isSuccess = isSuccess
}

class Blocky {
  constructor (selector) {
    this.selector = selector
    this.elem = document.querySelector(this.selector)

    this.logEvent = new Operation()
    this.logEvent.on('init', (sel) => { console.log(`New Blocky Editor: ${sel}`) })
    this.logEvent.on('iqs', (sel) => { console.log(`[Blocky Editor ${sel}] ${sel} is not a valid selector`) })

    this.logEvent.dispatch('init', this.selector)
    if (this.elem && this.elem.style) {} else {
      this.logEvent.dispatch('iqs', this.selector)
      throw new Error('Invalid Selector')
    }
  }

  setSize (height, width) {
    this.height = height
    this.width = width
    this.elem.style.height = this.height
    this.elem.style.width = this.width
  }
}

if (window) window.Blocky = Blocky
