import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: 'G-QEF21NSBL2' },
      appName: 'app-name'
    },
    app.router
  )
}
