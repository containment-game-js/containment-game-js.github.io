class LoadingOverlay extends HTMLElement {
  static get observedAttributes() {
    return ['active']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render()
  }

  render() {
    const active = this.getAttribute('active')
    const isActive = active === 'true' || active === ''
    if (!isActive) {
      setTimeout(() => {
        this.remove()
      }, 2000)
    }
  }
}

export default LoadingOverlay
