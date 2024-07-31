<template>
  <div>
    <Nuxt />
    <CookieNotification @showTidio="tidioSetup()" />
    <CookieNotification />
  </div>
</template>

<script>
export default {
  middleware: 'redirect',

  mounted() {
    setTimeout(() => {
      if (this.hasAcceptedCookie || this.tempCookieState) {
        this.tidioSetup()
      }
    }, 100)
  },

  methods: {
    tidioSetup() {
      const tidioScript = document.createElement('script')
      tidioScript.setAttribute(
        'src',
        '//code.tidio.co/pzlaiiooybqwbetcvhiymnxasl3pcdhb.js'
      )
      document.head.appendChild(tidioScript)
    }
  }
}
</script>
