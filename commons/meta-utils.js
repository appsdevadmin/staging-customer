import { withHttp } from './utils'

// This util makes it faster to implement meta:Open Graph, Twitter
// All these variable are overbidden if passed with meta param
const type = 'Website'
let url = process.env.SITE_URL // From env
const title = 'NNPC LTD' // Title of the project
const siteName = 'NNPC' // Site name
const description =
  'NNPC Limited is a dynamic global energy company with businesses and operations across the entire spectrum of energy value chain.' // meta description
let mainImage = '/webclip.png' // grab from the url
const twitterCard = 'summary_large_image' // summary, summary_large_image, app, or player.
const twitterHandle = '' // twitter handle

export default (meta) => {
  // For URLs
  // New Update check for mixins and process values here instead
  url = meta && meta.url ? withHttp(meta.url) : withHttp(url)
  // For images
  if (meta && meta.mainImage) {
    mainImage = withHttp(meta.mainImage)
  } else if (
    !mainImage.includes('http://') &&
    !mainImage.includes('https://')
  ) {
    mainImage = url + mainImage
  }
  return [
    {
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'theme-color',
      property: 'theme-color',
      content: '#1d6731' // Project theme color
    },
    {
      hid: 'description',
      name: 'description',
      content: (meta && meta.description) || description
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: (meta && meta.type) || type
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: url
    },
    {
      name: 'og:site_name',
      property: 'og:site_name',
      content: (meta && meta.site_name) || siteName
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: (meta && meta.title) || title
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: (meta && meta.description) || description
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: mainImage
    },
    {
      name: 'twitter:card',
      content: (meta && meta.twitterCard) || twitterCard
    },
    {
      name: 'twitter:site',
      content: (meta && meta.twitterSite) || twitterHandle
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: url
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: (meta && meta.title) || title
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: (meta && meta.description) || description
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: mainImage
    }
  ]
}
