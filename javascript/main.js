import * as I18N from '/javascript/i18n.js'
import fr from "/translations/fr.js"
import en from "/translations/en.js"

const dicts = { fr, en }

const instance = I18N.init({ dicts })

document.getElementById('overlay').removeAttribute('active')
