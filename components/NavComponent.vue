<template>
  <div class="nav-bar" data-scroll>
    <nuxt-link
      aria-current="page"
      class="logo w-inline-block w--current"
      to="/"
    ></nuxt-link>
    <div class="nav-links-and-extra-blocks">
      <div class="nav-links">
        <nuxt-link class="nav-links__link" to="/who-we-are">
          Who we are
        </nuxt-link>
        <nuxt-link class="nav-links__link" to="/investors">
          Investors
        </nuxt-link>
        <nuxt-link class="nav-links__link" to="/sustainability">
          Sustainability
        </nuxt-link>
        <nuxt-link class="nav-links__link" to="/businesses">
          Our Businesses
        </nuxt-link>
        <nuxt-link class="nav-links__link" to="/insights"> Insights </nuxt-link>
        <nuxt-link
          class="button dark-green-variant nav w-inline-block"
          to="/contact"
        >
          <div>contact us</div>
          <div class="button__icon-wrapper dark-green-variant"></div>
        </nuxt-link>
      </div>
    </div>
    <div class="hamburger-menu">
      <div
        data-animation-type="lottie"
        data-autoplay="0"
        data-default-duration="2.9833333333333334"
        data-direction="1"
        data-duration="0"
        data-is-ix2-target="1"
        data-loop="0"
        data-renderer="svg"
        data-src="/documents/hamburger-lottie.json"
        data-w-id="59225d81-30fc-8753-8de1-3d175436edd5"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$initWebflow()
    })
  }
}
</script>
