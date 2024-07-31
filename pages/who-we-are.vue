<template>
  <div>
    <NavComponent />
    <transition name="fade">
      <MemberViewModal
        v-if="activeModal === 'member-view-modal'"
        :member="selectedMember"
        @closeModal="activeModal = ''"
      />
    </transition>
    <div class="locomotive-scroll">
      <div>
        <PageHero :widget-data="pageData.data.about_hero" />
        <div v-if="pageData.data.mandate_section" class="who-we-are-section">
          <div class="who-we-are-section__text-block">
            <div data-paragraph>
              {{ pageData.data.mandate_section.heading }}
            </div>
          </div>
          <div
            class="mandate-slider w-slider"
            data-animation="cross"
            data-autoplay="true"
            data-autoplay-limit="0"
            data-delay="4000"
            data-disable-swipe="false"
            data-duration="700"
            data-easing="ease-in-out"
            data-hide-arrows="false"
            data-infinite="true"
            data-nav-spacing="3"
          >
            <div class="w-slider-mask">
              <div
                v-for="(slide, index) in pageData.data.mandate_inner_section"
                :key="index"
                class="w-slide"
              >
                <div v-if="slide.section_image" class="madate-wrapper">
                  <div class="madate-wrapper__inner">
                    <div class="madate-text-block">
                      <div class="madate-text-block__inner-text" data-paragraph>
                        {{ slide.tagline }}
                      </div>
                    </div>
                    <div class="madate-text-block__heading-bg">
                      <div class="madate-text-block__heading" data-paragraph>
                        {{ slide.bold_text }}
                      </div>
                    </div>
                    <div class="mandate-image-wrapper">
                      <img
                        v-if="slide.section_image"
                        alt=""
                        class="img mandate-image-wrapper__profitable"
                        loading="lazy"
                        :src="mxMediaUrl + slide.section_image.url"
                      />
                    </div>
                    <div class="madate-text-block">
                      <div class="madate-text-block__inner-text" data-paragraph>
                        {{ slide.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hide w-slider-arrow-left">
              <div class="w-icon-slider-left"></div>
            </div>
            <div class="hide w-slider-arrow-right">
              <div class="w-icon-slider-right"></div>
            </div>
            <div class="hide w-slider-nav w-round"></div>
          </div>
        </div>
        <div v-if="pageData.data.values_section" class="values-flex">
          <div
            v-for="(valueBlock, index) in pageData.data.values_section"
            :key="index"
            class="value-block"
          >
            <div class="value-block__heading" data-paragraph>
              {{ valueBlock.title }}
            </div>
            <div
              v-if="pageData.data.values_section"
              class="value-block__img"
              :style="{
                backgroundImage:
                  'url(' + mxMediaUrl + valueBlock.section_image.url + ')'
              }"
            ></div>
            <div
              v-for="(textItem, index) in valueBlock.block_item"
              :key="index"
              :class="
                valueBlock.block_item.length > 1
                  ? 'value-block__item'
                  : 'value-block__text-block'
              "
            >
              <div data-paragraph>
                {{ textItem.content }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="pageData.data.strategy_section" class="strategy-block">
          <div class="section-heading full-w">
            {{ pageData.data.strategy_section.title }}
          </div>
          <div class="strategy-flex">
            <div class="strategy-flex__left-block">
              <div class="strategy-flex__left-block--line"></div>
              <div data-paragraph>
                {{ pageData.data.strategy_section.inner_title }}
              </div>
            </div>
            <div class="strategies-wrapper">
              <div class="strategy dark-blue">
                <div class="strategy__icon-flex">
                  <div class="strategy__icon industrial"></div>
                  <div class="strategy__line"></div>
                </div>
                <div data-paragraph>
                  {{ pageData.data.strategy_section.inner_block_1_text }}
                </div>
              </div>
              <div class="strategy green">
                <div class="strategy__icon-flex">
                  <div class="strategy__icon"></div>
                  <div class="strategy__line"></div>
                </div>
                <div data-paragraph>
                  {{ pageData.data.strategy_section.inner_block_2_text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="timelines.data.length >= 1" class="history-section">
          <div class="section-heading">
            <div data-paragraph>Our History</div>
          </div>
          <div>
            <TimeLine
              v-for="(timeline, index) in timelines.data"
              :key="timeline.id"
              :index="index"
              :timeline="timeline"
            />
          </div>
        </div>
        <div v-if="leaders.data[0].leadership.length >= 1" class="team-section">
          <div class="section-heading leadership">
            <div>
              {{ pageData.data.leadership_section.title }}
            </div>
          </div>
          <div
            class="w-tabs"
            data-duration-in="300"
            data-duration-out="100"
            data-easing="ease-in-out"
          >
            <div class="team-tab-menu-wrapper w-tab-menu">
              <a
                v-for="tab in leaderTabs.data"
                :key="tab.id"
                class="team-tab-menu-wrapper__menu w-inline-block w-tab-link"
                :class="tab.name === activeTab && 'w--current'"
                :data-w-tab="tab.name"
                @click="switchTeamTab(tab.name)"
              >
                <div data-paragraph>{{ tab.name }}</div>
              </a>
            </div>
            <div class="w-tab-content">
              <div class="w-tab-pane w--tab-active" :data-w-tab="activeTab">
                <div>
                  <div class="team-tab-intro" data-paragraph>
                    {{ pageData.data.leadership_section.tagline }}
                  </div>
                  <div v-if="activeTab" class="team-grid">
                    <TeamMember
                      v-for="member in teamMemberData"
                      :key="member.id"
                      :member="member"
                      @showViewMoreModal="showViewMoreModal(member)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="pageData.data.what_we_do_top" class="what-we-do">
          <div class="section-heading what-we-do">
            <div data-paragraph>What We do</div>
          </div>
          <div class="what-we-do__item">
            <div class="what-we-do__name-flex">
              <div class="what-we-do__icon oil"></div>
              <div data-paragraph>
                {{ pageData.data.what_we_do_top.title }}
              </div>
            </div>
            <div class="what-we-do__text oil" data-paragraph>
              {{ pageData.data.what_we_do_top.description }}
            </div>
          </div>
          <div class="what-we-do-flex">
            <div class="what-we-do-flex__first-child">
              <div
                v-if="pageData.data.what_we_do_middle.section_image_1"
                class="what-we-do__bg-image oil-bg"
                :style="{
                  backgroundImage:
                    'url(' +
                    mxMediaUrl +
                    pageData.data.what_we_do_middle.section_image_1.url +
                    ')'
                }"
              ></div>
            </div>
            <div class="what-we-do-flex__second-child">
              <div class="oil-text">
                <div class="oil-text__inner" data-paragraph>
                  {{ pageData.data.what_we_do_middle.text_block_1 }}
                </div>
              </div>
            </div>
          </div>
          <div class="what-we-do-flex gas">
            <div class="what-we-do-flex__first-child">
              <div class="gas-text">
                <div class="gast-text__inner">
                  <div class="what-we-do__name-flex gas">
                    <div class="what-we-do__icon gas"></div>
                    <div data-paragraph>
                      <!-- Gas  TODO  change -->
                      Gas
                    </div>
                  </div>
                  <div data-paragraph>
                    {{ pageData.data.what_we_do_middle.text_block_2 }}
                  </div>
                </div>
              </div>
            </div>
            <div class="what-we-do-flex__second-child image">
              <div
                v-if="pageData.data.what_we_do_middle.section_image_2"
                class="what-we-do__bg-image gas-bg"
                :style="{
                  backgroundImage:
                    'url(' +
                    mxMediaUrl +
                    pageData.data.what_we_do_middle.section_image_2.url +
                    ')'
                }"
              ></div>
            </div>
          </div>
          <div class="what-we-do__item sustainability">
            <div class="what-we-do__name-flex">
              <div class="what-we-do__icon sustainablity"></div>
              <div data-paragraph>
                {{ pageData.data.what_we_do_bottom.title }}
              </div>
            </div>
            <div class="what-we-do__text sustainality" data-paragraph>
              {{ pageData.data.what_we_do_bottom.description }}
            </div>
          </div>
          <div class="what-we-do-flex">
            <div class="what-we-do-flex__first-child">
              <div
                v-if="pageData.data.what_we_do_bottom.section_image"
                class="what-we-do__bg-image suistainablity"
                :style="{
                  backgroundImage:
                    'url(' +
                    mxMediaUrl +
                    pageData.data.what_we_do_bottom.section_image.url +
                    ')'
                }"
              ></div>
            </div>
            <div class="what-we-do-flex__second-child">
              <div class="sustainabilty-text">
                <div class="sustainabilty-text__inner" data-paragraph>
                  {{ pageData.data.what_we_do_bottom.text_block }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  </div>
</template>

<script>
import { withHttp } from '~/commons/utils'

export default {
  asyncData({ store, error }) {
    const fetchAboutPage = store.dispatch('fetchWidgets', {
      page: 'who-we-are-page'
    })

    const fetchLeadership = store.dispatch('fetchWidgets', {
      page: 'team-members'
    })

    const fetchLeadershipTabs = store.dispatch('fetchWidgets', {
      page: 'team-categories'
    })

    const fetchTimelines = store.dispatch('fetchWidgets', {
      page: 'history-timelines',
      'sort[0]': 'year:asc'
    })

    return Promise.all([
      fetchAboutPage,
      fetchLeadership,
      fetchLeadershipTabs,
      fetchTimelines
    ])
      .then((responses) => {
        const [pageData, leaders, leaderTabs, timelines] = responses

        return {
          pageData,
          leaders,
          leaderTabs,
          timelines
        }
      })
      .catch((responseError) => error(responseError))
  },

  data() {
    return {
      pageData: {},
      activeTab: '',
      selectedMember: {},
      activeModal: '',
      teamMemberData: {},
      leaders: [],
      page: null
    }
  },

  head() {
    return {
      htmlAttrs: {
        'data-wf-page': '62bd654bd0d615404d5f0fbf',
        'data-wf-site': '62baf12171e9dd83263ec895'
      },
      title: 'NNPC LTD | Who we are',
      meta: [...this.meta]
    }
  },

  computed: {
    meta() {
      return this.mxMetaUtils({
        title: this.pageData.data?.seo?.metaTitle ?? 'NNPC LTD | Who we are',
        description:
          this.pageData.data?.seo?.metaDescription ?? this.mxDescription,

        url: this.pageData.data?.seo?.canonicalURL
          ? withHttp(this.pageData.data?.seo?.canonicalURL)
          : `${process.env.siteURL}/who-we-are`,

        mainImage: this.pageData.data?.seo?.metaImage
          ? ` ${process.env.mxMediaUrl}${this.pageData.data?.seo?.metaImage?.url}`
          : ` ${process.env.mxMediaUrl}${this.pageData.data.about_hero.hero_image.url}`
      })
    }
  },

  mounted() {
    this.fetchTeamMembers()

    // eslint-disable-next-line no-new
    this.page = new this.$pageAnimation('.locomotive-scroll')

    setTimeout(() => {
      this.switchTeamTab()
    }, 1000)

    this.$nextTick(() => {
      this.$initWebflow()
    })
  },

  beforeDestroy() {
    this.page.destroyScroll()
  },

  methods: {
    switchTeamTab(_tab) {
      this.activeTab
        ? (this.activeTab = _tab)
        : (this.activeTab = this.leaderTabs.data[0].name)
      this.filterTeamMembers()
    },

    showViewMoreModal(_member) {
      this.activeModal = 'member-view-modal'
      this.selectedMember = _member
      const body = document.querySelector('body')
      body.classList.toggle('.lock-body')
    },

    async fetchTeamMembers() {
      this.leaders = await this.$store.dispatch('fetchWidgets', {
        page: 'team-members'
      })
    },

    filterTeamMembers() {
      this.teamMemberData = this.leaders.data[0].leadership.filter(
        (leader) => leader.team_category.name === this.activeTab
      )
    }
  }
}
</script>

<style scoped>
.mele-suit {
  object-position: top;
}
</style>
