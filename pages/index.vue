<template>
  <div>
    <NavComponent />
    <div class="locomotive-scroll">
      <div
        v-if="pageData.data.hero_slider"
        class="section home-header slider-header"
      >
        <div class="slider-controls">
          <div class="slider-controls__arrows">
            <div class="slider-controls__arrow left" @click="slideLeft"></div>
            <div class="slider-controls__arrow" @click="slideRight"></div>
          </div>
          <div class="slider-controls__progress">
            <div class="slider-controls__progress-active"></div>
          </div>
        </div>
        <client-only placeholder="Loading...">
          <Splide
            class="header"
            :options="firstSplideOptions"
            @splide:arrows:mounted="updateSlideProgress"
          >
            <SplideSlide
              v-for="(slide, index) in pageData.data.hero_slider"
              :key="index"
              class="header-slide"
            >
              <div>
                <img
                  alt=""
                  class="img header-slide__img"
                  loading="lazy"
                  sizes="100vw"
                  :src="
                    slide.hero_image ? mxMediaUrl + slide.hero_image.url : null
                  "
                />
                <div class="header-slide__overlay"></div>
                <div class="header-hero">
                  <div class="hero-text">
                    <div class="home-hero__text">
                      <h2 v-dompurify-html="slide.hero_title"></h2>
                      <div class="home-hero__text-sub-text" data-paragraph>
                        {{ slide.hero_content }}
                      </div>
                    </div>
                    <nuxt-link
                      class="button white-variant big"
                      to="/who-we-are"
                    >
                      <div>{{ pageData.data.hero_cta_text }}</div>
                      <div class="button__icon-wrapper big"></div>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </SplideSlide>
          </Splide>
        </client-only>
      </div>
      <div v-if="pageData.data.why_nnpc" class="section">
        <div class="why-nnpc-section">
          <div class="why-nnpc-section__inner">
            <div class="why-nnpc-flex">
              <div class="why-nnpc-flex__image"></div>
              <div class="why-nnpc-flex__text-block">
                <div class="why-nnpc-flex__heading">
                  {{ pageData.data.why_nnpc.title }}
                </div>
                <div
                  data-paragraph
                  v-dompurify-html="pageData.data.why_nnpc.heading"
                ></div>
              </div>
            </div>
            <div class="nnpc-stats-flex">
              <div class="nnpc-stat">
                <div class="nnpc-stat__icon-block">
                  <div class="nnpc-stat__icon barrels"></div>
                </div>
                <div class="nnpc-stat__main-text">
                  <span class="nnpc-stat__indexed">No</span
                  >{{ pageData.data.why_nnpc.block_1_title }}
                </div>
                <div>{{ pageData.data.why_nnpc.block_1_description }}</div>
              </div>
              <div class="nnpc-stat last">
                <div class="nnpc-stat__icon-block">
                  <div class="nnpc-stat__icon workers"></div>
                </div>
                <div class="nnpc-stat__main-text">
                  <span
                    :data-odometer="pageData.data.why_nnpc.block_2_title"
                  ></span
                  ><span>+</span>
                </div>
                <div>{{ pageData.data.why_nnpc.block_2_description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="pageData.data.years_of_experience" class="section">
        <div
          class="yrs-of-existence"
          data-w-id="35c8c89c-2e72-638a-bd91-2b5c23ab523d"
        >
          <div class="yrs-of-existence__bg-wrapper">
            <div class="yrs-of-existence__bg skyline"></div>
            <div class="yrs-of-existence__bg yellow-strokes"></div>
            <div class="yrs-of-existence__bg landscape"></div>
          </div>
          <div class="yrs-of-existence__stat-block">
            <div v-show="pageData.data.years_of_experience" data-paragraph>
              {{ pageData.data.years_of_experience.top_title }}
            </div>
            <div
              v-show="pageData.data.years_of_experience"
              class="yrs-of-existence__number"
              :data-odometer="
                pageData.data.years_of_experience.years_of_experience
              "
            >
              {{ pageData.data.years_of_experience.years_of_experience }}
            </div>
            <div v-show="pageData.data.years_of_experience" data-paragraph>
              {{ pageData.data.years_of_experience.bottom_title }}
            </div>
          </div>
          <div
            v-show="pageData.data.years_of_experience"
            class="yrs-of-existence__text-block"
            data-paragraph
          >
            {{ pageData.data.years_of_experience.description }}
          </div>
        </div>
      </div>
      <div v-if="featuredPost" class="section mx-height-0">
        <div class="news-section">
          <div class="news-section__heading" data-paragraph>
            Never miss what we are up to
          </div>
          <div class="news-cluster blog-body-wrapper">
            <component
              :is="linkObj.type"
              class="featured-news"
              :href="linkObj.href"
              :target="linkObj.target"
              :to="linkObj.to"
            >
              <div class="featured-news__image">
                <img
                  alt=""
                  class="img"
                  loading="lazy"
                  :src="
                    featuredPost.post_image
                      ? mxMediaUrl + featuredPost.post_image.url
                      : null
                  "
                />
              </div>
              <div class="tag-and-date">
                <div class="tag">
                  <div data-paragraph>
                    {{
                      featuredPost.post_type
                        ? featuredPost.post_type.type
                        : 'News'
                    }}
                  </div>
                </div>
                <div class="news-date" data-paragraph>
                  {{ $formatDateTime(featuredPost.post_date) | uppercase }}
                </div>
              </div>
              <div class="featured-news__desc" data-paragraph>
                {{ featuredPost.title }}
              </div>
            </component>
            <div class="elongate">
              <div class="news-grid">
                <BlogPostCard
                  v-for="latestPost in latestPosts"
                  :key="latestPost.id"
                  :component-data="latestPost"
                  :is-home-page="true"
                />
              </div>
              <div class="news-cta">
                <nuxt-link
                  class="button dark-blue-variant w-inline-block"
                  to="/insights"
                >
                  <div data-paragraph>
                    VIEW ALL NEWS
                  </div>
                  <div class="button__icon-wrapper big dark-blue-variant"></div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class="bids-and-footer">
          <div v-if="pageData.data.investor_opportunities" class="bids-section">
            <div v-if="false" class="bids-section__heading">
              Investor Opportunities
            </div>
            <div class="bids-flex">
              <div class="bids-flex__text">
                <div class="bids-flex__text-inner">
                  <div data-paragraph>
                    {{ pageData.data.investor_opportunities.title }}
                  </div>
                  <nuxt-link
                    class="bids-flex__cta w-inline-block"
                    target="_blank"
                    to="/investors"
                  >
                    <div>
                      {{ pageData.data.investor_opportunities.cta_text }}
                    </div>
                    <div class="bids-flex__cta-icon"></div>
                  </nuxt-link>
                </div>
              </div>
              <div class="bids-flex__img">
                <div
                  class="bids-flex__img-inner"
                  :style="{
                    backgroundImage:
                      'url(' +
                      mxMediaUrl +
                      pageData.data.investor_opportunities.section_image.url +
                      ')'
                  }"
                ></div>
              </div>
            </div>
          </div>
          <div class="footer-wrapper">
            <FooterComponent />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { withHttp } from '~/commons/utils'

export default {
  asyncData({ store, error }) {
    const fetchHomePage = store.dispatch('fetchWidgets', {
      page: 'home-page'
    })

    const fetchFeaturedPost = store.dispatch('fetchWidgets', {
      page: 'posts?filters[featured]=true',
      'sort[0]': 'post_date:desc'
    })

    const fetchPosts = store.dispatch('fetchWidgets', {
      page: 'posts',
      'sort[0]': 'post_date:desc',
      'pagination[pageSize]': 1
    })

    return Promise.all([fetchHomePage, fetchFeaturedPost, fetchPosts])
      .then((responses) => {
        const [pageData, featuredPostsData, fetchAllPosts] = responses
        const featuredPost = !featuredPostsData.data.length ? fetchAllPosts.data[0] : featuredPostsData.data[0]

        return {
          pageData,
          featuredPost
        }
      })
      .catch((responseError) => error(responseError))
  },

  data() {
    return {
      pageData: {},
      page: null,
      featuredPost: null,
      latestPosts: [],
      slider: null,
      firstSplideOptions: {
        perPage: 1,
        type: 'loop',
        updateOnMove: true,
        ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
        pagination: false
      }
    }
  },

  head() {
    return {
      title: 'NNPC LTD | Home',
      meta: [...this.meta]
    }
  },

  computed: {
    isReportFile() {
      return this.featuredPost?.post_type?.type === 'Report' && this.hasFileLink
    },

    hasFileLink() {
      return this.featuredPost?.upload_pdf_file || this.featuredPost.pdf_link
    },

    fileLink() {
            return this.featuredPost.upload_pdf_file
        ? this.mxMediaUrl + this.featuredPost?.upload_pdf_file.url
        : withHttp(this.featuredPost.pdf_link)
    },

    postLink() {
      return `/insights/${this.featuredPost.slug}`
    },

    linkObj() {
      return {
        type: this.isReportFile ? 'a' : 'nuxt-link',
        target: this.isReportFile ? '_blank' : null,
        to: this.isReportFile ? null : this.postLink,
        href: (this.isReportFile ? this.fileLink : null) ?? this.postLink
      }
    },

    meta() {
      return this.mxMetaUtils({
        title: this.pageData.data?.seo?.metaTitle ?? 'NNPC LTD | Home',
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

  beforeMount() {
    // eslint-disable-next-line no-new
    // if (new this.$pageAnimation('.locomotive-scroll')) {
    //   this.$pageAnimation('.locomotive-scroll')
    // }
  },

  mounted() {
    // eslint-disable-next-line no-new
    this.page = new this.$pageAnimation('.locomotive-scroll')
    this.fetchLatestPosts()

    this.autoPlaySlide()
    this.$nextTick(() => {
      this.$initWebflow()
    })
  },

  beforeDestroy() {
    clearInterval(this.slider)
    this.page.destroyScroll()
  },

  methods: {
    async fetchLatestPosts() {
      const response = await this.$store.dispatch('fetchWidgets', {
        page: 'posts',
        'pagination[pageSize]': 4,
        'sort[0]': 'post_date:desc',
        'filters[slug][$notIn]': null || this.featuredPost?.slug
      })

      if (response) {
        this.latestPosts = response.data
      }
    },

    updateSlideProgress(splide) {
      const bar = document.querySelector('.slider-controls__progress-active')

      // Update the bar width:
      splide.on('mounted move', function () {
        const end = splide.Components.Controller.pageLength

        bar.style.width = String((100 * (splide.index + 1)) / end) + '%'
      })
    },

    autoPlaySlide() {
      this.slider = setInterval(() => {
        this.slideRight()
      }, 8000)
    },

    slideLeft() {
      document.querySelector('.splide__arrow--prev').click()
      this.clearSliderInterval()
    },

    slideRight() {
      document.querySelector('.splide__arrow--next').click()
      this.clearSliderInterval()
    },

    clearSliderInterval() {
      clearInterval(this.slider)
      this.autoPlaySlide()
    }
  }
}
</script>

<style scoped>
.footer-wrapper {
  background-color: #03141b;
}

.tag {
  text-transform: uppercase;
}

@media screen and (min-width: 966px) {
  .locomotive-scroll {
    padding-bottom: 0px;
  }
}
</style>
