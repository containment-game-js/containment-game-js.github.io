class I18N {
  constructor({ dicts, locale }) {
    const [navigatorLocale] = (navigator.language || '').split('-')
    const loc = locale || navigatorLocale || 'en'
    this._locale = loc
    this.dicts = dicts
    this.dict = dicts[loc]
  }

  get locale() {
    return this._locale
  }

  set locale(newValue) {
    this._locale = newValue
    this.dict = this.dicts[newValue]
  }

  t(selector) {
    const parts = selector.split('.').filter(t => t !== '')
    const result = parts.reduce((acc, value) => acc[value] || {}, this.dict)
    if (typeof result === 'string') {
      return result
    } else {
      return null
    }
  }
}

export default I18N
