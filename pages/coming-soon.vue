<template>
  <div class="locomotive-scroll">
    <div class="coming-soon-header">
      <nuxt-link class="logo coming-soon" to="/"></nuxt-link>
      <div class="coming-soon-hero">
        <div data-paragraph>
          This page is <br />‍<span class="yellow-text">coming soon!</span>
        </div>
      </div>
      <nuxt-link class="button white-variant big" to="/">
        <div data-paragraph>Home</div>
        <div class="button__icon-wrapper big"></div>
      </nuxt-link>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: null
    }
  },
  head() {
    return {
      title: 'NNPC LTD | Coming Soonn'
    }
  },

  mounted() {
    // eslint-disable-next-line no-new
    this.page = new this.$pageAnimation('.locomotive-scroll')
  },

  beforeDestroy() {
    this.page.destroyScroll()
  }
}
</script>

<style lang="scss" scoped></style>
