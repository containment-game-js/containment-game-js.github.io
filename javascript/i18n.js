import I18N from './i18n/translate.js'
import Element from './i18n/custom-element.js'

function subscribe(func) {
  this.subscribed.add(func)
}

function unsubscribe(func) {
  this.subscribed.delete(func)
}

function updateAll() {
  this.subscribed.forEach(fun => fun())
}

const updateInstance = instance => options => {
  Object.entries(options).forEach(([key, value]) => {
    instance.value[key] = value
  })
  instance.updateAll()
}

const init = ({ elementName, ...options }) => {
  const value = new I18N(options)
  const subscribed = new Set()
  const instance = {
    value,
    subscribed,
    subscribe,
    unsubscribe,
    updateAll,
  }
  customElements.define(elementName || 'i18n-t', Element(instance))
  const update = updateInstance(instance)
  return { update }
}

export { init }
