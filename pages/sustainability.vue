<template>
  <div>
    <NavComponent />
    <div class="locomotive-scroll">
      <PageHero :widget-data="pageData.data.sustasinability_hero" />
      <div
        v-if="pageData.data.sustainability_leader_section"
        class="sustainability-leader"
      >
        <div class="sustainability-leader__first-child">
          <div class="sustainability-leader__title">
            <div
              class="sustainability-leader__title-inner"
              data-paragraph
              v-dompurify-html="pageData.data.sustainability_leader_section.title"
            ></div>
          </div>
          <div
            class="sustainability-leader__image"
            :style="{
              backgroundImage:
                'url(' +
                mxMediaUrl +
                pageData.data.sustainability_leader_section.section_image.url +
                ')'
            }"
          ></div>
        </div>
        <div class="sustainability-leader__body">
          <div
            class="sustainability-leader__body-inner"
            data-paragraph
            v-dompurify-html="pageData.data.sustainability_leader_section.content"
          ></div>
        </div>
      </div>
      <div
        v-if="pageData.data.energy_transition_section"
        class="energy-transition"
      >
        <div class="energy-transition-heading">
          <div data-paragraph>
            {{ pageData.data.energy_transition_section.title }}
          </div>
          <div class="pia-team-wrapper">
            <div></div>
            <div class="pia-team-wrapper__line"></div>
          </div>
        </div>
        <div class="energy-transition-flex">
          <div
            v-for="(energy, index) in pageData.data.energy_transition_section
              .energy_blocks"
            :key="index"
            class="enegy-block"
          >
            <div
              class="enegy-block__icon renewable"
              :class="iconClassNames[index]"
            ></div>
            <div data-paragraph>
              {{ energy.name }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="pageData.data.sustainability_image_flex_section">
        <div
          v-for="(imageFlex, index) in pageData.data
            .sustainability_image_flex_section"
          :key="index"
          class="sustainability-strategy"
          :class="index % 2 ? 'reverse-desktop' : ''"
        >
          <div
            class="sustainability-strategy__image one"
            :style="{
              backgroundImage:
                'url(' + mxMediaUrl + imageFlex.section_image.url + ')'
            }"
          ></div>
          <div class="sustainability-strategy__body">
            <div class="sustainability-strategy__inner" data-paragraph>
              {{ imageFlex.content }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="pageData.data.guiding_principles"
        class="guiding-principles-wrapper"
      >
        <div>
          {{ pageData.data.guiding_principles.title }}
        </div>
        <div class="guiding-principles">
          <div class="guiding-principles__item">
            <div class="guiding-principles__inner" data-paragraph>
              {{ pageData.data.guiding_principles.block_1 }}
            </div>
          </div>
          <div class="guiding-principles__item">
            <div class="guiding-principles__inner second" data-paragraph>
              {{ pageData.data.guiding_principles.block_2 }}
            </div>
            <nuxt-link
              class="button white-text green-bg w-inline-block"
              to="/contact"
            >
              <div>
                {{ pageData.data.guiding_principles.cta_text }}
              </div>
              <div class="button__icon-wrapper dark-green-variant"></div>
            </nuxt-link>
          </div>
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
    const fetchSustainabilityPage = store.dispatch('fetchWidgets', {
      page: 'sustainability-page'
    })

    return Promise.all([fetchSustainabilityPage])
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
      iconClassNames: ['renewable', 'fuels', 'efficiency'],
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
      title: 'NNPC LTD | Sustainability',
      meta: [...this.meta]
    }
  },

  computed: {
    meta() {
      return this.mxMetaUtils({
        title:
          this.pageData.data?.seo?.metaTitle ?? 'NNPC LTD | Sustainability',
        description:
          this.pageData.data?.seo?.metaDescription ?? this.mxDescription,

        url: this.pageData.data?.seo?.canonicalURL
          ? withHttp(this.pageData.data.seo.canonicalURL)
          : `${process.env.siteURL}/sustainability`,

        mainImage: this.pageData.data?.seo?.metaImage
          ? ` ${process.env.mxMediaUrl}${this.pageData.data.seo.metaImage?.url}`
          : ` ${process.env.mxMediaUrl}${this.pageData.data.sustasinability_hero.hero_image.url}`
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
