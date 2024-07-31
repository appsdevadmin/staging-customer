<template>
  <div>
    <NavComponent />
    <div class="locomotive-scroll">
      <PageHero :widget-data="pageData.data.hero" />

      <div v-if="loading" class="flex-loader">
        <LoadMoreLoader />
      </div>

      <div v-if="!loading || !loadMore">
        <div v-for="category in categories" :key="category.id">
          <div v-if="!$isEmpty(category.posts)" class="news-post-wrapper last">
            <div class="section-heading full-w">
              {{ category.category }}
            </div>
            <div class="news-page-grid">
              <BlogPostCard
                v-for="postCard in category.posts"
                :key="postCard.id"
                :component-data="postCard"
              />
            </div>
            <div v-if="loadMore" class="flex-loader">
              <LoadMoreLoader />
            </div>
            <div
              v-if="category.posts.length < category.meta.pagination.total"
              class="view-all-post-cta"
            >
              <div
                class="button big blue-variant"
                @click="loadMorePosts(category.category)"
              >
                <div>LOAD MORE</div>
                <div class="button__icon-wrapper big blue-variant"></div>
              </div>
            </div>
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
    const fetchBlogPage = store.dispatch('fetchWidgets', {
      page: 'blog-page'
    })

    return Promise.all([fetchBlogPage])
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
      allPosts: {},
      categories: [],
      filteredPostsData: [],
      loadMore: false,
      loading: false,
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
      title: 'Insights',
      meta: [...this.meta]
    }
  },

  computed: {
    meta() {
      return this.mxMetaUtils({
        title: this.pageData.data?.seo?.metaTitle ?? 'Insights',
        description:
          this.pageData.data?.seo?.metaDescription ?? this.mxDescription,

        url: this.pageData.data?.seo?.canonicalURL
          ? withHttp(this.pageData.data?.seo.canonicalURL)
          : `${process.env.siteURL}/insights`,

        mainImage: this.pageData.data?.seo?.metaImage
          ? ` ${process.env.mxMediaUrl}${this.pageData.data?.seo.metaImage?.url}`
          : ` ${process.env.mxMediaUrl}${this.pageData.data.hero.hero_image.url}`
      })
    }
  },

  mounted() {
    // eslint-disable-next-line no-new
    this.page = new this.$pageAnimation('.locomotive-scroll')
    this.getCategories()
    this.$nextTick(() => {
      this.$initWebflow()
    })
  },

  beforeDestroy() {
    this.page.destroyScroll()
  },

  methods: {
    loadMorePosts(_category) {
      const category = this.categories.find((cat) => cat.category === _category)
      this.fetchFilteredPosts(category)
    },

    async getCategories() {
      this.loading = true
      const response = await this.$store.dispatch('fetchWidgets', {
        page: 'post-categories'
      })
      if (response) {
        this.categories = response.data
        const categories = response.data
        categories.forEach((category) => {
          this.$store
            .dispatch('fetchFilteredPosts', {
              category: category.category,
              'pagination[pageSize]': 9,
              'sort[0]': 'post_date:desc'
            })
            .then((response) => {
              category.posts = response.data
              category.meta = response.meta
              this.categories = this.$deAssociate(categories)
              this.loading = false
            })
        })
      }
    },

    async fetchFilteredPosts(category) {
      this.loadMore = true
      const response = await this.$store.dispatch('fetchFilteredPosts', {
        category: category.category,
        'pagination[pageSize]': (category.meta.pagination.pageSize += 5),
        'sort[0]': 'post_date:desc',
        'pagination[page]':
          category.meta.pagination.page === 1
            ? 1
            : (category.meta.pagination.page += 1)
      })

      if (response) {
        category.posts = response.data
        category.meta = response.meta
        this.loadMore = false
      }
    }
  }
}
</script>

<style scoped>
.flex-loader {
  padding: 30px 0px;
  margin: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.padding-last-news {
  padding-bottom: 60px;
}
.header.secondary-pages {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (max-width: 991px) {
  .header.secondary-pages {
    min-height: 725px;
    font-size: 90px;
  }
}

@media screen and (max-width: 767px) {
  .header.secondary-pages {
    min-height: 614px;
    font-size: 70px;
  }
}

@media screen and (max-width: 479px) {
  .header.secondary-pages {
    height: 100vh;
    font-size: 40px;
  }
}
</style>
