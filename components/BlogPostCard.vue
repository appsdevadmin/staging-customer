<template>
  <div
    class="blog-body-wrapper"
    :class="isHomePage ? 'news-block w-inline-block ' : ''"
  >
    <component
      :is="linkObj.type"
      :class="isHomePage ? null : 'blog'"
      :href="linkObj.href"
      :target="linkObj.target"
      :to="linkObj.to"
    >
      <div v-if="isHomePage">
        <div
          id="w-node-_2543bce6-447f-b1d3-db75-d172ee73fd83-703ec897"
          class="news-block__text-block"
        >
          <div class="news-date" data-paragraph>
            {{ $formatDateTime(componentData.post_date) | uppercase }}
          </div>
          <div class="news-block__desc" data-paragraph>
            {{ componentData.title | truncate(100) }}
          </div>
          <div class="news-block-link">
            <div data-paragraph>read post</div>
            <div class="news-block-link__arrow"></div>
          </div>
        </div>
        <div class="news-block__img">
          <img
            alt=""
            class="img"
            loading="lazy"
            :src="
              componentData.post_image
                ? mxMediaUrl + componentData.post_image.url
                : null
            "
          />
        </div>
      </div>
      <div v-else>
        <div class="blog__image">
          <img
            alt=""
            class="img"
            loading="lazy"
            :src="
              componentData.post_image
                ? mxMediaUrl + componentData.post_image.url
                : null
            "
          />
        </div>
        <div class="blog__tag-wrapper">
          <div class="blog__type" data-paragraph>
            {{
              componentData.post_type ? componentData.post_type.type : 'News'
            }}
          </div>
          <div data-paragraph>
            {{ $formatDateTime(componentData.post_date) | uppercase }}
          </div>
        </div>
        <div data-paragraph>
          {{ componentData.title | truncate(100) }}
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import { withHttp } from '~/commons/utils'

export default {
  props: {
    componentData: {
      type: Object,
      default() {
        return {}
      }
    },

    isHomePage: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isReportFile() {
      return (
        this.componentData?.post_type?.type === 'Report' && this.hasFileLink
      )
    },

    hasFileLink() {
      return this.componentData?.upload_pdf_file || this.componentData.pdf_link
    },

    fileLink() {
      return this.componentData.upload_pdf_file
        ? this.mxMediaUrl + this.componentData?.upload_pdf_file.url
        : withHttp(this.componentData.pdf_link)
    },

    postLink() {
      return `/insights/${this.componentData.slug}`
    },

    linkObj() {
      return {
        type: this.isReportFile ? 'a' : 'nuxt-link',
        target: this.isReportFile ? '_blank' : null,
        to: this.isReportFile ? null : this.postLink,
        href: (this.isReportFile ? this.fileLink : null) ?? this.postLink
      }
    }
  }
}
</script>
