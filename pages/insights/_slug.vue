<template>
  <div>
    <NavComponent />
    <div class="locomotive-scroll">
      <div
        class="blog-header"
        :style="{
          marginTop: '90px',
          backgroundImage:
            'url(' + mxMediaUrl + singleBlogPost.post_image.url + ')'
        }"
      >
        <div class="blog-header__date" data-paragraph>
          {{ $formatDateTime(singleBlogPost.post_date) | uppercase }}
        </div>
        <div class="header-underline blog"></div>
        <div class="blog-header__title" data-paragraph>
          {{ singleBlogPost.title }}
        </div>
      </div>
      <div>
        <div class="post-body">
          <div v-dompurify-html="singleBlogPost.content"></div>
        </div>
      </div>
      <div class="news-post-wrapper other-posts">
        <div class="section-heading full-w" data-paragraph>Other Posts</div>
        <div v-if="otherPosts.data.length >= 1" class="news-page-grid">
          <BlogPostCard
            v-for="otherPost in otherPosts.data"
            :key="otherPost.id"
            :component-data="otherPost"
          />
        </div>
      </div>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import { isEmpty, withHttp } from '~/commons/utils'
export default {
  asyncData({ store, params, error, router }) {
    const fetchSinglePost = store.dispatch('fetchSinglePost', {
      slug: params.slug
    })

    const fetchOtherPosts = store.dispatch('fetchWidgets', {
      page: 'posts?randomSort=true',
      'pagination[pageSize]': 3,
      'sort[0]': 'post_date:desc',
      'filters[slug][$notIn]': params.slug
    })

    return Promise.all([fetchSinglePost, fetchOtherPosts]).then((responses) => {
      const [postData, otherPosts] = responses

      if (isEmpty(postData.data)) {
        error({ statusCode: 404, message: 'Post not found' })
      }

      const singleBlogPost = postData.data[0]

      return {
        singleBlogPost,
        otherPosts
      }
    })
  },

  data() {
    return {
      page: null
    }
  },

  head() {
    return {
      htmlAttrs: {
        'data-wf-page': '62ceb968e3d99b7c5420f34a',
        'data-wf-site': '62baf12171e9dd83263ec895'
      },

      title: this.singleBlogPost.title,
      meta: [...this.meta]
    }
  },

  computed: {
    meta() {
      return this.mxMetaUtils({
        type: 'article',
        title: this.singleBlogPost?.seo?.metaTitle ?? this.singleBlogPost.title,
        description:
          this.singleBlogPost?.seo?.metaDescription ??
          this.singleBlogPost.content,

        url: this.singleBlogPost.seo?.canonicalURL
          ? withHttp(this.singleBlogPost.seo.canonicalURL)
          : `${process.env.siteURL}/insights/${this.singleBlogPost.slug}`,

        mainImage: this.singleBlogPost.seo?.metaImage
          ? ` ${process.env.mediaURL}${this.singleBlogPost.seo.metaImage?.url}`
          : ` ${process.env.mediaURL}${this.singleBlogPost.post_image.url}`
      })
    }
  },

  mounted() {
    // eslint-disable-next-line no-new
    this.page = new this.$pageAnimation('.locomotive-scroll')
    // this.changed_post_content()

    this.$nextTick(() => {
      this.$initWebflow()
    })
  },

  beforeDestroy() {
    this.page.destroyScroll()
  },

  methods: {}
}
</script>

<style scoped>
.blog-header {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
