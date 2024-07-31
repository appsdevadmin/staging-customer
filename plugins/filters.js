import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import { querylize } from '~/commons/utils'

Vue.use(Vue2Filters, {
  currency: {
    symbol: '$',
    decimalDigits: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    showPlusSign: false
  }
})

Vue.filter('addSharpAttrib', (url, provider = 'strapi') => {
  if (url) {
    if (provider === 'strapi') {
      const _query = {
        format: 'webp',
        quality: 50,
        embed: true
      }
      url = url + querylize(_query)
      console.log(url)
    }
  }

  return url
})
