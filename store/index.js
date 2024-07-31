import { removeKeys } from '../commons/utils'
// const token = process.env.token
export const state = () => {
  return {
    // Axios Statuses
    isSubmitting: false,
    isLoading: false,
    tempCookieState: '',
    businessPageSection: '',
    commodities: []
  }
}

export const getters = {
  // Axios Statuses
  getIsSubmitting: (state) => {
    return state.isSubmitting
  },

  getTempCookieState: (state) => {
    return state.tempCookieState
  },

  getIsLoading: (state) => {
    return state.isLoading
  },

  getBusinessPageSection: (state) => {
    return state.businessPageSection
  },

  getCommodities: (state) => {
    return state.commodities
  }
}

export const mutations = {
  // Axios Statuses
  updateIsSubmitting: (state, payload) => {
    state.isSubmitting = payload
  },

  updateIsLoading: (state, payload) => {
    state.isLoading = payload
  },

  updateBusinessPageSection: (state, payload) => {
    state.businessPageSection = payload
  },

  updateTempCookieState: (state, payload) => {
    state.tempCookieState = payload
  },

  updateCommodities: (state, payload) => {
    state.commodities = payload
  }
}

export const actions = {
  submitForm(context, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('https://api.emailjs.com/api/v1.0/email/send', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  },

  fetchFuelPrices(context) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get('https://commodities-api.com/api/', {
          params: {
            access_key:
              'jxy6ipfgpa4cwx8rrh8lp4eyicrjm3h3haew0i7ohopnqic3xjrzx9emnku8'
          }
        })
        .then((response) => {
          resolve(response)
        })
        .catch((response) => {
          reject(response)
        })
    })
  },

  fetchWidgets(context, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get('/' + payload.page + '?populate=deep', {
          params: removeKeys(payload, ['page'])
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  fetchSinglePost(content, payload) {
    const baseUrl = process.env.baseUrl + '/posts?filters[slug]='
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(baseUrl + payload.slug, {
          headers: {
            // Authorization: `Bearer ${token}`
          },

          params: removeKeys(payload, ['slug'])
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  fetchFilteredPosts(content, payload) {
    const baseUrl =
      process.env.baseUrl + '/posts?filters[post_category][category]='
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(baseUrl + payload.category, {
          headers: {
            // Authorization: `Bearer ${token}`
          },

          params: removeKeys(payload, ['category'])
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  submitContactForm(context, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/contact-messages', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
