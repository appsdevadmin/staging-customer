<template>
  <div>
    <NavComponent />
    <transition name="fade">
      <div
        v-if="activeModal === 'csr-activities' && pageData.popup"
        class="popup-overlay"
      >
        <div
          class="close-icon"
          data-w-id="863f0aab-e279-3913-9d3e-e82894cf5024"
          @click.stop="activeModal = ''"
        />
        <div class="popup-open">
          <div class="popup-open__first-child">
            <div class="popup-first__child-img">
              <img
                alt="csr-main-img"
                class="img"
                loading="lazy"
                sizes="100vw"
                :src="
                  pageData.popup.main_image
                    ? mxMediaUrl + pageData.popup.main_image.url
                    : null
                "
              />
            </div>
          </div>
          <div class="popup-open__second-child">
            <div>{{ pageData.popup.title }}</div>
            <div class="popup-content">
              <div
                v-for="(block, index) in pageData.popup.images"
                :key="index"
                class="popup-content__inner"
              >
                <div class="popup-content__text">
                  {{ block.description }}
                </div>

                <div v-if="block.image.length === 2" class="popup-img__flex">
                  <div class="popup-content__image">
                    <img
                      alt="csr-img"
                      class="img"
                      loading="lazy"
                      sizes="100vw"
                      :src="
                        block.image[0] ? mxMediaUrl + block.image[0].url : null
                      "
                    />
                  </div>
                  <div class="popup-content__image">
                    <img
                      alt="csr-img"
                      class="img"
                      loading="lazy"
                      sizes="100vw"
                      :src="
                        block.image[1] ? mxMediaUrl + block.image[1].url : null
                      "
                    />
                  </div>
                </div>
                <div v-else>
                  <div class="popup-content__image">
                    <img
                      alt="csr-img"
                      class="img"
                      loading="lazy"
                      sizes="100vw"
                      :src="
                        block.image[0] ? mxMediaUrl + block.image[0].url : null
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="logo modal w-inline-block" href="index.html"></a>
      </div>
    </transition>

    <div class="locomotive-scroll template-body">
      <PageHero
        v-if="pageData.hero"
        :is-template-page="true"
        :widget-data="pageData.hero"
      />
      <div class="gas-marketing__section">
        <div v-if="pageData.introduction" class="section-heading small">
          {{ pageData.introduction.title }}
        </div>
        <div v-if="pageData.introduction" class="gas-marketing__inner">
          <div class="gas-marketing__introduction">
            <h5 v-dompurify-html="pageData.introduction.description"></h5>
          </div>
        </div>
        <div v-if="pageData.sections">
          <div v-for="(section, index) in pageData.sections" :key="index">
            <div class="section-heading small no-border">
              {{ section.title }}
            </div>
            <div class="gas-marketing__inner">
              <div class="grey-block__text">
                <div v-dompurify-html="section.content" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mgt-team__section">
        <div v-if="pageData.strategic" class="strategic-direction">
          <div>{{ pageData.strategic.title }}</div>
          <div
            v-if="pageData.strategic.sub_title"
            class="strategic-direction__subtext"
          >
            {{ pageData.strategic.sub_title }}
          </div>
        </div>

        <div v-if="pageData.strategic?.content" class="grey-block__text">
          <div v-dompurify-html="pageData.strategic.content" />
          <a
            v-if="pageData.strategic.cta_text"
            class="button secondary-blue"
            data-w-id="3763dd13-a610-05ff-7fe7-26cca9181706"
            :href="$withHttp(pageData.strategic.cta_link || '#')"
            >{{ pageData.strategic.cta_text }}</a
          >
        </div>

        <div
          v-if="pageData.team_members?.length"
          class="management-team__header"
        >
          <div class="management-team__text">
            <div>{{ pageData.team_tab_name }}</div>
          </div>
        </div>
        <div v-if="pageData.team_members?.length" class="mgt-team__grid">
          <div
            v-for="member in pageData.team_members"
            id="w-node-_14613821-40cb-9043-f9f2-7156b9ed025b-1297fb41"
            :key="member.id"
            class="team-member"
          >
            <div class="team-member__image">
              <img
                alt="member-img"
                class="img team-image"
                loading="lazy"
                sizes="(max-width: 479px) 90vw, (max-width: 767px) 43vw, (max-width: 991px) 44vw, 29vw"
                :src="
                  member.team_image
                    ? mxMediaUrl + member.team_image.url
                    : '/assets/custom-images/user_circle.png'
                "
                :style="{ 'object-fit': !member.team_image ? 'contain' : '' }"
              />
              <a
                class="team-member__linkedin w-inline-block"
                :href="$withHttp(member.linkedin_link || '#')"
              ></a>
              <a class="team-icon w-inline-block" href="#" target="_blank"></a>
            </div>
            <div class="team-member__bio">
              <div>
                <div class="team-member__name">
                  {{ member.full_name }}
                </div>
                <div>{{ member.position }}</div>
              </div>
              <div class="team-member__read-more"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="pageData.csr" class="csr-sectiom">
        <div class="section-heading small no-border">
          {{ pageData.csr.heading }}
        </div>
        <div class="csr-flex">
          <div class="csr-flex__first-child">
            <img
              alt=""
              class="img"
              loading="lazy"
              :src="
                pageData.csr.section_image
                  ? mxMediaUrl + pageData.csr.section_image.url
                  : null
              "
            />
          </div>
          <div class="csr-flex__second-child">
            <div>
              {{ pageData.csr.description }}
            </div>
          </div>
        </div>
        <div v-if="pageData.csr.content" class="csr-activities">
          <div class="grey-block__text">
            <div v-dompurify-html="pageData.csr.content" />
            <a
              v-if="pageData.csr.cta_text"
              class="button secondary-blue"
              data-w-id="c239a278-5b13-3eb1-0d67-de17538d85bc"
              :href="pageData.csr.cta_link"
              @click="showPopup"
            >
              {{ pageData.csr.cta_text }}
            </a>
          </div>
        </div>
      </div>
      <div v-if="pageData.contact" class="contact-details">
        <div class="section-heading small">
          {{ pageData.contact.title }}
        </div>
        <div class="contact-details__inner">
          <div class="contact-details__flex">
            <div class="contact-details__first-child">
              <div>
                <div class="contact-details__header">Email</div>
                <a
                  class="contact-link"
                  :href="`mailto:${pageData.contact.email}`"
                >
                  {{ pageData.contact.email }}
                </a>
              </div>
              <div>
                <div class="contact-details__header">Phone</div>
                <a
                  class="contact-link no-border"
                  :href="`tel:${pageData.contact.phone_number}`"
                >
                  {{ pageData.contact.phone_number }}
                </a>
              </div>
            </div>
            <div class="contact-details__second-child">
              <div class="contact-details__header">
                {{ pageData.contact.address_title }}
              </div>
              <div
                v-for="(address, index) in pageData.contact.addresses"
                :key="index"
                class="address-details"
              >
                <div class="address-details__inner">
                  <div v-if="address.title">{{ address.title }} :<br /></div>
                  <div class="address">
                    {{ address.address }}
                  </div>
                </div>
                <a
                  class="address-flex__cta w-inline-block"
                  :href="$withHttp(address.map_link || '#')"
                  target="_blank"
                >
                  <div>{{ address.cta_text }}</div>
                  <div class="address-flex__cta-icon"></div>
                </a>
              </div>
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
export default {
  data() {
    return {
      pageData: {},
      page: null,
      activeModal: '',
      loading: false
    }
  },

  computed: {
    meta() {
      return this.mxMetaUtils({
        title: this.pageData.data?.seo?.metaTitle ?? 'NNPC LTD | Careers',
        description:
          this.pageData.data?.seo?.metaDescription ?? this.mxDescription,

        url: this.pageData.data?.seo?.canonicalURL
          ? this.$withHttp(this.pageData.data.seo.canonicalURL)
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

    this.fetchPageData()
    this.$nextTick(() => {
      // this.$initWebflow()
    })
  },

  methods: {
    async fetchPageData() {
      this.loading = true
      try {
        const response = await this.$axios.$get('templates', {
          params: {
            'filters[slug]': this.$route.params.slug,
            populate: 'deep'
          }
        })

        if (!response || !response.data || response.data.length === 0) {
          throw new Error('Page not found')
        }

        this.pageData = response.data[0]
        this.loading = false
      } catch (error) {
        this.loading = false

        this.$nuxt.error({
          statusCode: 404,
          message: error.message || 'Page not found'
        })
      }
    },

    showPopup() {
      this.activeModal = 'csr-activities'
    }
  }
}
</script>

<style>
.popup-overlay {
  display: flex;
}
</style>
