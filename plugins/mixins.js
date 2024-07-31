import Vue from 'vue'

// Internal imports
import metaUtils from '@/commons/meta-utils'
const textVersion = require('textversionjs')

// define a component that uses this mixin
Vue.mixin({
  data() {
    return {
      hasAcceptedCookie: false
    }
  },

  computed: {
    mxDescription() {
      return 'NNPC Limited is a dynamic global energy company with businesses and operations across the entire spectrum of energy value chain.'
    },

    mxMediaUrl() {
      return process.env.baseUrl.replace('/api', '')
    },

    tempCookieState() {
      return this.$store.getters.getTempCookieState
    }
  },

  mounted() {
    this.hasAcceptedCookie = localStorage.getItem('acceptedCookies') === 'true'
  },

  methods: {
    mxMetaUtils(meta) {
      if (!(meta && meta.url)) {
        meta.url = process.env.siteURL
      }

      // Ensures description doesn't contain html tags (160 characters)
      meta.description = textVersion(meta.description).substring(0, 157) + '...'

      return metaUtils(meta)
    }
  }
})
