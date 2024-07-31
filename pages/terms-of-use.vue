<template>
  <div>
    <NavComponent />
    <PageHero :widget-data="pageData.data" />
    <div class="legal-content intro">
      <div class="legal-content__heading">
        <div>
          <strong> NNPC Limited Last Updated:</strong>
          {{ $formatDateTime(pageData.data.updated_date) }}
        </div>
      </div>
      <div class="legal-content__body full">
        <div class="legal-content__sub-title">
          {{ pageData.data.page_content[0].title }}
        </div>
        <div>
          <p v-dompurify-html="pageData.data.page_content[0].content"></p>
        </div>
      </div>
    </div>
    <div class="accordion-wrapper alternate">
      <div
        v-for="(block, index) in pageData.data.page_content.slice(1)"
        :key="index"
        class="accordion"
      >
        <div
          class="accordion__title"
          :class="{ even: index % 2 }"
          @click="toggleAccordion($event)"
        >
          <div class="accordion__title-inner">
            <div>{{ block.title }}</div>
            <div class="accordion__control-wrap">
              <div class="accordion__control x"></div>
              <div class="accordion__control y"></div>
            </div>
          </div>
        </div>
        <div class="accordion__body">
          <div class="accordion__body-inner">
            <div class="legal-content">
              <div class="legal-content__body full">
                <div>
                  <p v-dompurify-html="block.content"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { withHttp } from '~/commons/utils'
export default {
  asyncData({ store, error }) {
    const fetchCookiePolicyPage = store.dispatch('fetchWidgets', {
      page: 'cookie-policy-page'
    })

    return Promise.all([fetchCookiePolicyPage])
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
      pageData: {}
    }
  },

  head() {
    return {
      title: 'NNPC LTD | Terms of Use',
      meta: [...this.meta]
    }
  },

  computed: {
    meta() {
      return this.mxMetaUtils({
        title: this.pageData.data?.seo?.metaTitle ?? 'NNPC LTD | Terms of Use',
        description:
          this.pageData.data?.seo?.metaDescription ?? this.mxDescription,
        url: this.pageData.data?.seo?.canonicalURL
          ? withHttp(this.pageData.data.seo.canonicalURL)
          : `${process.env.siteURL}/terms-of-use`,
        mainImage: this.pageData.data?.seo?.metaImage
          ? ` ${process.env.mxMediaUrl}${this.pageData.data.seo.metaImage?.url}`
          : ` ${process.env.mxMediaUrl}${this.pageData.data.hero_image.url}`
      })
    }
  },

  methods: {
    toggleAccordion(e) {
      e.currentTarget.nextElementSibling.classList.toggle('show')
      e.target.querySelector('.accordion__control.y').classList.toggle('show')
    }
  }
}
</script>
