<template>
  <div class="section" :class="{ 'small-header': isTemplatePage }">
    <div class="header secondary-pages" :class="{ small: isTemplatePage }">
      <div class="header-img-overlay">
        <img
          alt="header img"
          class="img"
          loading="lazy"
          :src="mxMediaUrl + widgetData.hero_image.url"
        />
        <div class="header-overlay"></div>
      </div>
      <div class="page-title" v-dompurify-html="widgetData.title"></div>
      <div class="header-underline"></div>
    </div>
  </div>
</template>

<script>
//

export default {
  props: {
    widgetData: {
      type: Object,
      default() {
        return {}
      }
    },

    isTemplatePage: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
