<template>
  <div :data-go-to="activeBusiness">
    <NavComponent />
    <div class="locomotive-scroll">
      <PageHero :widget-data="pageData.data.businesses_hero" />

      <div
        v-if="pageData.data.businesses_section"
        class="section-heading businesses"
        data-paragraph
      >
        {{ pageData.data.businesses_section.title }}
      </div>
      <div v-if="businesses.data.length >= 1" class="businesses-accordion">
        <div
          v-for="business in businesses.data"
          :id="'data-' + business.name"
          :key="business.id"
          class="business-block"
        >
          <div class="business-block__heading" data-upstream>
            <div data-paragraph>
              {{ business.name }}
            </div>
            <div class="business-block__close">
              <div class="business-block__close-line"></div>
              <div class="business-block__close-line vertical"></div>
            </div>
          </div>
          <div class="business-accordion__hidden">
            <div
              class="business-block__image upstream"
              :style="{
                backgroundImage:
                  'url(' + mxMediaUrl + business.section_image.url + ')'
              }"
            ></div>
            <div class="business-block__inner">
              <div class="business-block__text" data-paragraph>
                {{ business.content }}
              </div>
              <div class="business-block__other-options">
                <div
                  v-for="(
                    businessLinks, index
                  ) in business.businesses_links.slice(0, 4)"
                  :key="index"
                  class="business-block__option-block"
                  @click="routeToBusinessLink(businessLinks.link)"
                >
                  <div class="business-block__option-links">
                    <div data-paragraph>
                      {{ businessLinks.title }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-show="business.businesses_links.length >= 5"
                class="business-block__other-options"
              >
                <div
                  v-for="(
                    businessLinks, index
                  ) in business.businesses_links.slice(4, 8)"
                  :key="index"
                  class="business-block__option-block"
                  @click="routeToBusinessLink(businessLinks.link)"
                >
                  <div class="business-block__option-links">
                    <div data-paragraph>
                      {{ businessLinks.title }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="pageData.data.contact_us_section" class="contact-cta">
        <div class="section-heading no-border" data-paragraph>
          {{ pageData.data.contact_us_section.title }}
        </div>
        <div class="contact-cta__inner">
          <div
            class="contact-cta__image"
            :style="{
              backgroundImage:
                'url(' +
                mxMediaUrl +
                pageData.data.contact_us_section.section_image.url +
                ')'
            }"
          ></div>
          <nuxt-link class="contact-cta__link w-inline-block" to="/contact">
            <div data-paragraph>
              {{ pageData.data.contact_us_section.cta_text }}
            </div>
            <div class="contact-cta__link"></div>
          </nuxt-link>
        </div>
      </div>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import { withHttp } from '~/commons/utils'

export default {
  asyncData({ store, error }) {
    const fetchBusinesses = store.dispatch('fetchWidgets', {
      page: 'businesses'
    })

    const fetchBusinessPage = store.dispatch('fetchWidgets', {
      page: 'our-businesses-page'
    })

    return Promise.all([fetchBusinesses, fetchBusinessPage])
      .then((responses) => {
        const [businesses, pageData] = responses

        return {
          businesses,
          pageData
        }
      })
      .catch((responseError) => error(responseError))
  },
  // middleware({ redirect }) {
  //   redirect('/coming-soon')
  // },

  data() {
    return {
      pageData: {},
      page: null
    }
  },

  head() {
    return {
      htmlAttrs: {
        'data-wf-page': '62ceb968e3d99b7c5420f34a',
        'data-wf-site': '62baf12171e9dd83263ec895'
      },

      title: 'NNPC LTD | Businesses',
      meta: [...this.meta]
    }
  },

  computed: {
    activeBusiness() {
      return this.$store.getters.getBusinessPageSection
    },

    meta() {
      return this.mxMetaUtils({
        title: this.pageData.data?.seo?.metaTitle ?? 'NNPC LTD | Businesses',
        description:
          this.pageData.data?.seo?.metaDescription ?? this.mxDescription,

        url: this.pageData.data?.seo?.canonicalURL
          ? withHttp(this.pageData.data.seo.canonicalURL)
          : `${process.env.siteURL}/businesses`,

        mainImage: this.pageData.data?.seo?.metaImage
          ? ` ${process.env.mxMediaUrl}${this.pageData.data.seo.metaImage?.url}`
          : ` ${process.env.mxMediaUrl}${this.pageData.data.businesses_hero.hero_image.url}`
      })
    }
  },

  beforeDestroy() {
    this.page.destroyScroll()
  },

  mounted() {
    // eslint-disable-next-line no-new
    this.page = new this.$pageAnimation('.locomotive-scroll')

    this.$nextTick(() => {
      this.$initWebflow()
    })
    setTimeout(() => {
      this.activeBusiness && this.openAccordion()
    }, 4000)
  },

  methods: {
    openAccordion() {
      const businessBlock = document.querySelector(`[${this.activeBusiness}]`)
      businessBlock.click()
    },

    routeToBusinessLink(_link) {
      if (_link) {
        this.$router.push('/' + _link)
      }
    }
  }
}
</script>

<style>
.business-block__option-block {
  cursor: pointer;
}
</style>
