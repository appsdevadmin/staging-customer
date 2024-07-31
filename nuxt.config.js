import metaUtils from './commons/meta-utils'
import linkUtils from './commons/link-utils'
import * as pwaUtils from './commons/pwa-utils'

export default {
  server: {
    port: process.env.PORT ?? 4242,
    host: process.env.HOST ?? 'localhost', // for mobile debug -> 0.0.0.0,
    buildDir: 'dist'
  },

  env: {
    siteURL: process.env.SITE_URL, // Add site url in .env folder
    baseUrl: process.env.BASE_URL, // Add base url in .env folder
    emailUserId: process.env.EMAIL_JS_USER_ID,
    emailServiceId: process.env.EMAIL_JS_SERVICE_ID,
    emailTemplateId: process.env.EMAIL_JS_TEMPLATE_ID,
    newsLetterEmailTemplateId: process.env.NEWSLETTER_EMAIL_JS_TEMPLATE_ID,
    token: process.env.TOKEN
  },

  target: 'server',

  generate: {
    fallback: true
  },

  pageTransition: 'transition-page',

  head: {
    meta: [...metaUtils()],
    link: [...linkUtils()],
    script: [
      {
        src: '/js/jquery-3.5.1.min.js',
        type: 'text/javascript',
        body: true
      },
      {
        src: '/js/override-alert.js',
        type: 'text/javascript',
        body: true
      },
      {
        src: '/js/nnpc.js', // Add Webflow js file here
        type: 'text/javascript',
        body: true
      }
    ]
  },

  css: [
    '@/static/assets/css/normalize.css',
    '@/static/assets/css/components.css',
    '@/static/assets/css/nnpc.css',
    '@/static/assets/css/_main.css'
  ],

  pwa: {
    manifest: pwaUtils.getManifest()
  },

  trailingSlash: false,

  loading: false,

  plugins: [
    { src: '@/plugins/animation', ssr: false },
    { src: '@/plugins/dompurify', ssr: false },
    { src: '@/plugins/splide', ssr: false },
    '@/plugins/mixins',
    '@/plugins/axios',
    '@/plugins/filters',
    '@/plugins/prototypes',
    '@/plugins/gtag',
    '@/plugins/postscribe.client.js'
  ],

  components: true,

  buildModules: ['@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  tailwindcss: {
    viewer: false
  },

  axios: {
    baseUrl: process.env.BASE_URL
  },

  build: {
    postcss: {
      order: 'cssnanoLast'
    }
  }
}
