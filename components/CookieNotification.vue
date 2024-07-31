<template>
  <div>
    <client-only>
      <div v-if="!hasAcceptedCookie && !tempCookieState">
        <div
          class="cookie-popup"
          :class="{
            'cookie-overflow-popin': hasCookieLoaded,
            'cookie-overlay-hide': $route.path.includes('privacy-policy')
          }"
        >
          <div
            class="cookie-popup__inner"
            :class="hasCookieLoaded && 'cookie-slide-in'"
          >
            <div>
              By clicking “Proceed”, you agree to the storing of optional
              cookies on your device to enhance site navigation, analyze site
              usage, and assist in our marketing efforts. Learn more about our
              <nuxt-link
                class="inpage-link cursor-pointer"
                :to="'/privacy-policy'"
              >
                <strong>Privacy Policy</strong>
              </nuxt-link>
            </div>
            <div class="cookie-popup__btn-wrps">
              <button
                class="button secondary w-inline-block"
                @click="updateCookie"
              >
                <div>Proceed</div>
              </button>

              <button
                class="button secondary transparent w-inline-block"
                @click="cancelCookie"
              >
                <div>Cancel</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasCookieLoaded: false
    }
  },

  mounted() {
    setTimeout(() => {
      this.hasCookieLoaded = true
    }, 1000)
  },

  methods: {
    updateCookie() {
      this.hasCookieLoaded = false
      this.$emit('showTidio', true)
      localStorage.setItem('acceptedCookies', true)
      this.hasAcceptedCookie = true
    },

    cancelCookie() {
      this.hasCookieLoaded = false
      this.deleteAllCookies()
      this.$emit('showTildo', true)
      console.log('state', this.tempCookieState)
      this.$store.commit('updateTempCookieState', true)
    },

    deleteAllCookies() {
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
      })
    }
  }
}
</script>
