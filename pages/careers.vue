<template>
  <div>
    <NavComponent />
    <div class="locomotive-scroll careers-body">
      <PageHero v-if="pageData.data.hero" :widget-data="pageData.data.hero" />

      <div v-if="pageData.data.global_choice" class="post-header__flex">
        <div class="post-header__first-child">
          <div class="post-header__subheading">
            <div
              class="post-header__subheading-inner"
              v-dompurify-html="pageData.data.global_choice.title"
            ></div>
          </div>
          <div class="post-header__image">
            <img
              alt=""
              class="img"
              loading="lazy"
              sizes="(max-width: 767px) 100vw, 50vw"
              :src="
                pageData.data.global_choice.section_image
                  ? mxMediaUrl + pageData.data.global_choice.section_image.url
                  : null
              "
            />
          </div>
        </div>
        <div class="post-header__body no-border">
          <div class="post-header__body-inner">
            <span class="bold-text">
              {{ pageData.data.global_choice.sub_title }}
            </span>
            <br /><br />
            {{ pageData.data.global_choice.description }}
          </div>
        </div>
      </div>
      <div
        v-if="pageData.data.diversity"
        class="section-heading small no-border"
      >
        {{ pageData.data.diversity.heading }}
      </div>
      <div v-if="pageData.data.diversity" class="diversity-inclusion__block">
        <div
          v-for="(block, index) in pageData.data.diversity.blocks"
          :key="index"
          class="diversity-inclusion"
          :class="{ 'reverse-desktop': index % 2 === 0 }"
        >
          <div class="diversity-inclusion__image">
            <img
              alt="diversity-img"
              class="img"
              loading="lazy"
              sizes="(max-width: 767px) 100vw, 36vw"
              :src="
                block.section_image
                  ? mxMediaUrl + block.section_image.url
                  : null
              "
            />
          </div>
          <div class="diversity-inclusion__body">
            <p v-if="block.title" class="diversity-inclusion__header">
              {{ block.title }}
            </p>
            <div class="diversity-inclusion__inner full-width">
              {{ block.description }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="pageData.data.growth" class="growth-block">
        <div class="section-heading full-w careers">
          {{ pageData.data.growth.title }}
        </div>
        <div class="grey-block__text">
          <div>
            {{ pageData.data.growth.description }}
          </div>
        </div>
        <div class="energy-transition-flex">
          <div
            v-for="(block, index) in pageData.data.growth.icons"
            :key="index"
            class="growth-block__inner"
          >
            <div class="growth-block__icon" :class="iconClass[index]"></div>
            <div v-dompurify-html="block.content" />
          </div>
        </div>
      </div>
      <div
        v-if="pageData.data.work_with_nnpc.title"
        class="section-heading small"
      >
        {{ pageData.data.work_with_nnpc.title }}
      </div>
      <div class="oppotunities-block">
        <div class="opportunities-inner">
          <div class="opportunities-inner__text">
            <h5 v-dompurify-html="pageData.data.work_with_nnpc.description" />
          </div>
          <div
            v-for="(type, index) in pageData.data.work_with_nnpc.work_types"
            :key="index"
            class="opportunities-flex"
          >
            <div class="opportunities-flex__inner">
              <div>{{ type.name }}</div>
            </div>
            <div class="opportunities-cta">
              <div v-dompurify-html="type.content" />
              <a
                v-if="type.cta_text && type.cta_link"
                class="button small"
                :href="$withHttp(type.cta_link || '#')"
                target="_blank"
              >
                {{ type.cta_text }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-wrapper">
        <FooterComponent />
      </div>
    </div>
  </div>
</template>

<script>
import { withHttp } from '~/commons/utils'

export default {
  asyncData({ store, error }) {
    const fetchCareerPage = store.dispatch('fetchWidgets', {
      page: 'career-page'
    })

    return Promise.all([fetchCareerPage])
      .then((responses) => {
        const [pageData] = responses

        return {
          pageData
        }
      })
      .catch((responseError) => error(responseError))
  },

  data() {
    return {
      pageData: {},
      page: null,
      iconClass: ['growth', 'people', 'planning']
    }
  },

  head() {
    return {
      title: 'NNPC LTD | Careers',
      meta: [...this.meta]
    }
  },

  computed: {
    meta() {
      return this.mxMetaUtils({
        title: this.pageData.data?.seo?.metaTitle ?? 'NNPC LTD | Careers',
        description:
          this.pageData.data?.seo?.metaDescription ?? this.mxDescription,

        url: this.pageData.data?.seo?.canonicalURL
          ? withHttp(this.pageData.data.seo.canonicalURL)
          : `${process.env.siteURL}`,

        mainImage: this.pageData.data?.seo?.metaImage
          ? ` ${process.env.mxMediaUrl}${this.pageData.data?.seo?.metaImage?.url}`
          : null
      })
    }
  },

  mounted() {
    // eslint-disable-next-line no-new
    this.page = new this.$pageAnimation('.locomotive-scroll')

    this.$nextTick(() => {
      this.$initWebflow()
    })
  },

  beforeDestroy() {
    clearInterval(this.slider)
    this.page.destroyScroll()
  },

  methods: {}
}
</script>
<style>
.careers-body .opportunities-inner__text p {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  font-size: 24px !important;
  font-weight: 400 !important;
  line-height: 34px !important;
}

.careers-body .opportunities-cta p {
  font-size: 20px;
}

@media screen and (max-width: 479px) {
  .careers-body .opportunities-cta p {
    font-size: 18px;
  }
}
</style>
