<template>
  <div>
    <NavComponent />
    <div class="locomotive-scroll">
      <PageHero :widget-data="pageData.data.hero_investors" />
      <div
        v-if="pageData.data.investment_opportunities"
        class="opportunity-container"
      >
        <div class="opportunity__heading">
          {{ pageData.data.investment_opportunities.title }}
        </div>
        <div class="opportunity">
          <div class="opportunity__text-block">
            <div class="opportunity__text-block-inner" data-paragraph>
              {{ pageData.data.investment_opportunities.content }}
            </div>
            <nuxt-link
              v-if="false"
              class="button dark-blue-variant yellow-text w-inline-block"
              to="/contact"
            >
              <div data-paragraph>Contact us</div>
              <div class="button__icon-wrapper big dark-blue-variant"></div>
            </nuxt-link>
          </div>
          <div
            class="opportunity__image"
            :style="{
              backgroundImage:
                'url(' +
                mxMediaUrl +
                pageData.data.investment_opportunities.section_image.url +
                ')'
            }"
          ></div>
        </div>
      </div>
      <div v-if="pageData.data.investments_blocks" class="opportunities-grid">
        <div
          v-for="(investment, index) in pageData.data.investments_blocks"
          id="w-node-c51cedea-2f96-d2d3-2d63-3eddb9a08c7e-29b106e2"
          :key="index"
          class="opportunity-block"
        >
          <div class="opportunity-block__heading">
            {{ investment.title }}
          </div>
          <div
            class="opportunity-block__image upstream"
            :style="{
              backgroundImage:
                'url(' + mxMediaUrl + investment.section_image.url + ')'
            }"
          ></div>
        </div>
      </div>
      <div
        v-if="pageData.data.career_opportunities"
        class="opportunity-container last"
      >
        <div class="opportunity__heading" data-paragraph>
          {{ pageData.data.career_opportunities.title }}
        </div>
        <div class="opportunity">
          <div class="opportunity__text-block">
            <div class="opportunity__text-block-inner" data-paragraph>
              {{ pageData.data.career_opportunities.content }}
            </div>
            <nuxt-link
              class="button dark-blue-variant yellow-text w-inline-block"
              to="/careers"
            >
              <div data-paragraph>CONTACT US</div>
              <div class="button__icon-wrapper big dark-blue-variant"></div>
            </nuxt-link>
          </div>
          <div
            class="opportunity__image careers"
            :style="{
              backgroundImage:
                'url(' +
                mxMediaUrl +
                pageData.data.career_opportunities.section_image.url +
                ')'
            }"
          ></div>
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
    const fetchInvestorsPage = store.dispatch('fetchWidgets', {
      page: 'investors-page'
    })

    return Promise.all([fetchInvestorsPage])
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
      page: null
    }
  },

  head() {
    return {
      title: 'NNPC LTD | Investors',
      meta: [...this.meta]
    }
  },

  computed: {
    meta() {
      return this.mxMetaUtils({
        title: this.pageData.data?.seo?.metaTitle ?? 'NNPC LTD | Investors',
        description:
          this.pageData.data?.seo?.metaDescription ?? this.mxDescription,

        url: this.pageData.data?.seo?.canonicalURL
          ? withHttp(this.pageData.data.seo.canonicalURL)
          : `${process.env.siteURL}/investors`,

        mainImage: this.pageData.data?.seo?.metaImage
          ? ` ${process.env.mxMediaUrl}${this.pageData.data.seo.metaImage?.url}`
          : ` ${process.env.mxMediaUrl}${this.pageData.data.hero_investors.hero_image.url}`
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
    this.page.destroyScroll()
  }
}
</script>

<style lang="scss" scoped></style>
