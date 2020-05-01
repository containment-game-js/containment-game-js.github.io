const toFlag = indicator => {
  switch (indicator) {
    case 'fr':
      return '🇫🇷'
    case 'en':
      return '🇺🇸'
    default:
      return ''
  }
}

const LanguageSelector = i18NInstance => {
  return class LanguageSelector extends HTMLElement {
    static get observedAttributes() {
      return ['locale']
    }

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.appendFlag()
      this.opened = null
      this.updateLocale = this.updateLocale.bind(this)
    }

    updateLocale() {
      const newLocale = i18NInstance.value.locale
      if (this.getAttribute('locale') !== newLocale) {
        this.setAttribute('locale', newLocale)
      }
    }

    connectedCallback() {
      if (i18NInstance) {
        i18NInstance.subscribe(this.updateLocale)
      }
      this.render()
    }

    disconnectedCallback() {
      if (i18NInstance) {
        i18NInstance.unsubscribe(this.updateLocale)
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      i18NInstance.update({ [name]: newValue })
      this.render()
    }

    appendFlag() {
      const locale = this.getAttribute('locale') || i18NInstance.value.locale
      const flag = toFlag(locale)
      const node = document.createTextNode(flag)
      const div = document.createElement('div')
      const style = document.createElement('style')
      style.innerHTML = `.selector {
        position: absolute;
        padding: 12px;
        background: var(--background);
        left: -18px;
        border: 2px solid var(--border-color);
        border-radius: 6px;
        margin-top: 6px;
      }
      .selector-entry {
        cursor: pointer;
        padding: 6px;
      }`
      div.appendChild(node)
      div.addEventListener('click', () => {
        this.toggleSelector()
      })
      this.shadowRoot.appendChild(style)
      this.shadowRoot.appendChild(div)
      this.flagNode = node
    }

    toggleSelector() {
      if (!this.opened) {
        const allTextFlags = Object.keys(i18NInstance.value.dicts)
        const div = document.createElement('div')
        div.classList.add('selector')
        allTextFlags.forEach(flag => {
          const node = document.createElement('div')
          const text = document.createTextNode(toFlag(flag))
          node.classList.add('selector-entry')
          node.appendChild(text)
          div.appendChild(node)
          node.addEventListener('click', () => {
            this.setAttribute('locale', flag)
            this.toggleSelector()
          })
        })
        this.shadowRoot.appendChild(div)
        this.opened = div
      } else {
        this.opened.remove()
        this.opened = null
      }
    }

    updateFlag() {
      const locale = this.getAttribute('locale') || i18NInstance.value.locale
      const flag = toFlag(locale)
      this.flagNode.nodeValue = flag
    }

    render() {
      this.updateFlag()
    }
  }
}

export default LanguageSelector
