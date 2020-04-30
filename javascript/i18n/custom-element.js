const Element = i18NInstance => {
  return class TranslateElement extends HTMLElement {
    static get observedAttributes() {
      return ['key']
    }

    constructor() {
      super()
      this.render = this.render.bind(this)
      this.render()
    }

    connectedCallback() {
      if (i18NInstance) {
        i18NInstance.subscribe(this.render)
      }
      this.render()
    }

    disconnectedCallback() {
      if (i18NInstance) {
        i18NInstance.unsubscribe(this.render)
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.render()
    }

    render() {
      const [node] = this.childNodes
      const key = this.getAttribute('key')
      const text = i18NInstance.value.t(key)
      if (node) {
        node.nodeValue = text || key
      } else {
        const newNode = document.createTextNode(text || key)
        this.appendChild(newNode)
      }
    }
  }
}

export default Element
