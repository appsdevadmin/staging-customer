import jqueryLib from 'jquery'
import dayjs from 'dayjs'

export const formatDateTime = (strDateTime, format = 'MMMM D, YYYY') => {
  return dayjs(strDateTime).format(format)
}
// Extended JSON Parse
export const JSONParse = (str, defaultVal = []) => {
  try {
    if (str != null) {
      return JSON.parse(str)
    } else {
      return defaultVal
    }
  } catch (e) {
    return defaultVal
  }
}

// DeAssociate Object/Array
export const deAssociate = (obj) => {
  return obj ? JSON.parse(JSON.stringify(obj)) : {}
}

export const removeEmptyKeys = (obj) => {
  if (obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null && v !== '')
    )
  } else {
    return obj
  }
}

export const removeEmptyValues = (arr) => {
  if (arr) {
    return arr.filter((element) => element !== '' || null)
  } else {
    return arr
  }
}

// InitWebflow
export const initWebflow = () => {
  setTimeout(() => {
    jqueryLib(document).ready(function () {
      if (window.Webflow !== undefined) {
        window.Webflow.destroy()
        window.Webflow.ready()
        window.Webflow.require('ix2').init()
        window.Webflow.require('lottie').init()
        window.Webflow.require('slider').redraw()
        document.dispatchEvent(new Event('readystatechange'))
      }
    })
  }, 1000)
}

// Intervals
export const interval = (callback, time) => setInterval(callback, time)

// Check Empty Object or Array
export const isEmpty = (objOrArr) => {
  if (isObject(objOrArr) || Array.isArray(objOrArr)) {
    return Object.keys(objOrArr).length === 0 || !objOrArr.length
  } else {
    return true
  }
}

// Check if Object
export const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null
}

// Convert String to Number
export const parseNumber = (obj) => {
  const res = {}
  Object.keys(obj).forEach((key) => {
    res[key] = !isNaN(obj[key]) ? parseInt(obj[key], 10) : obj[key]
  })
  return res
}

// Rename Object Key
export const renameKey = (obj, oldKey, newKey) => {
  if (oldKey !== newKey && Object.hasOwnProperty.call(obj, oldKey)) {
    Object.defineProperty(
      obj,
      newKey,
      Object.getOwnPropertyDescriptor(obj, oldKey)
    )
    delete obj[oldKey]
  }
}

// Rename Object Keys (Array)
export const renameKeys = (obj, oldKeys, newKeys) => {
  if (oldKeys.length === newKeys.length) {
    for (let i = 0; i < oldKeys.length; i++) {
      renameKey(obj, oldKeys[i], newKeys[i])
    }
  }
}

// Remove Object Keys
export const removeKeys = (obj, keys) => {
  if (obj) {
    keys.forEach((key) => {
      if (Object.hasOwnProperty.call(obj, key)) {
        delete obj[key]
      }
    })

    return obj
  }
}

// Querylize
export const querylize = (obj) => {
  const str = []
  for (const prop in obj) {
    if (Object.getOwnPropertyDescriptor(obj, prop)) {
      if (obj[prop]) {
        str.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]))
      }
    }
  }
  return '?' + str.join('&')
}

// Handle error response
export const errMessage = (errorObject) => {
  if (process.client) {
    if (errorObject.response) {
      if (errorObject.response.data.errors) {
        return errorObject.response.data.errors.join('\n')
      } else {
        return errorObject.response.data.message
      }
    } else {
      return errorObject
    }
  }
}

// Validate email for edge cases
export const isEmail = (emailStr) => {
  return /\S+@\S+\.\S+/.test(emailStr)
}

// Generate AlphaNum (Payment Refs)
export const generateAlphaNum = (_length) => {
  if (typeof _length === 'string') {
    _length = _length.length
  }
  let text = ''
  const length = _length ?? 10
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// SSR LocalStorage
export const ssrLocalStorage = {
  getItem(key) {
    if (process.client) {
      return localStorage.getItem(key)
    }
  },

  setItem(key, value) {
    if (process.client) {
      localStorage.setItem(key, value)
    }
  },

  removeItem(key) {
    if (process.client) {
      localStorage.removeItem(key)
    }
  },

  clear() {
    if (process.client) {
      localStorage.clear()
    }
  }
}

// Append link with https
export const withHttp = (url, { https = true } = {}) => {
  if (typeof url !== 'string') {
    throw new TypeError(
      `Expected \`url\` to be of type \`string\`, got \`${typeof url}\``
    )
  }
  url = url.trim()

  if (url.includes('http://') || url.includes('https://')) {
    return url
  } else if (url.substring(0, 9) === 'localhost') {
    return 'http://' + url
  } else {
    return 'https://' + url
  }
}

export const ghostPostFields = [
  'slug',
  'id',
  'title',
  'html',
  'comment_id',
  'feature_image',
  'feature_image_alt',
  'feature_image_caption',
  'featured',
  'page',
  'meta_title',
  'meta_description',
  'created_at',
  'updated_at',
  'published_at',
  'custom_excerpt',
  'codeinjection_head',
  'codeinjection_foot',
  'og_image',
  'og_title',
  'og_description',
  'twitter_image',
  'twitter_title',
  'twitter_description',
  'custom_template',
  'canonical_url',
  'primary_author',
  'primary_tag',
  'url',
  'excerpt'
]

export const nullSafe = (obj, key) => {
  if (obj) {
    return obj[key]
  } else {
    return ''
  }
}

export const isValidURL = (url) => {
  let urlInstance
  try {
    urlInstance = new URL(url)
  } catch (_) {
    return false
  }
  return urlInstance.protocol === 'http:' || urlInstance.protocol === 'https:'
}

// Handle error response
export const formatError = (errObj) => {
  const validationErrors = errObj.response?.data?.errors // Laravel
  const compositeErrors = []
  if (errObj.response) {
    if (validationErrors) {
      for (const key in validationErrors) {
        if (Object.hasOwnProperty.call(validationErrors, key)) {
          compositeErrors.push(...validationErrors[key])
        }
      }
      return compositeErrors.join('\n')
    } else {
      return errObj.response.data.message
    }
  } else {
    return errObj
  }
}

// 404 error
export const notFoundError = () => {
  return {
    statusCode: 404,
    message: 'This page could not be found'
  }
}

export const debounce = (func, wait) => {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}
