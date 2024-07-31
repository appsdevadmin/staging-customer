/* eslint-disable indent */
/* eslint-disable eol-last */
import jQuery from 'jquery'
// import Vue from 'vue'
import { formatError, deAssociate, removeKeys } from '@/commons/utils'
// const token = process.env.token

// APIPaths to force reload for every axios response
// They are also paths used as asynchronous axios calls
// const apiPaths = ['/packages']
let requestConfig = {}

const updateProcessing = (store, isWorking, isSuccess = true) => {
  if (requestConfig.method === 'get') {
    store.commit('updateIsLoading', isWorking)
  } else {
    store.commit('updateIsSubmitting', isWorking)
  }
}

export default function ({ $axios, error: nuxtError, route, redirect, store }) {
  // to be used if project has user management
  $axios.onRequest((config) => {
    config.params.populate = 'deep'

    requestConfig = deAssociate(config)
    if (config.data && config.data.appAxiosConf) {
      delete config.data.appAxiosConf
    }
    if (
      config.url.includes('cloudflare') ||
      config.url.includes('cloudinary')
    ) {
      $axios.setToken(false)
      config.headers = removeKeys(config.headers, ['Authorization'])
    }
    updateProcessing(store, true, false)
    return config
  })

  $axios.onResponse(() => {
    updateProcessing(store, false, true)
    if (requestConfig.refreshWebflow) {
      jQuery(document).ready(function () {
        window.Webflow.destroy()
        window.Webflow.ready()
        window.Webflow.require('ix2').init()
        document.dispatchEvent(new Event('readystatechange'))
      })
    }
  })

$axios.onError((error) => {
  updateProcessing(store, false, false)
  if (requestConfig.data?.appAxiosConf?.pageError) {
    if (error.response) {
      nuxtError({
        statusCode: error.response.status,
        message: formatError(error)
      })
    } else {
      nuxtError({
        statusCode: error.status || 500,
        message: formatError(error)
      })
    }
  }
  return Promise.resolve(false)
})
}
