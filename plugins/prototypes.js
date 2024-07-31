import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import SimpleVueValidation from 'simple-vue-validator'
// External CSS Import Files
import 'vue-toast-notification/dist/theme-default.css'

// Internal Imports
import * as utils from '@/commons/utils'

// SimpleVueValidation: validation(){...}
Vue.use(SimpleVueValidation)
Vue.prototype.$Validator = SimpleVueValidation.Validator

// External Proto(s)
// Toast
Vue.use(VueToast, {
  position: 'bottom',
  queue: true,
  duration: 3500
})

// Internal Proto(s)
// Vue Prototypes
for (const k in utils) {
  if (Object.hasOwnProperty.call(utils, k)) {
    const v = utils[k]
    Vue.prototype['$' + k] = v
  }
}
