<template>
  <div>
    <NavComponent />
    <div class="locomotive-scroll">
      <div>
        <PageHero :widget-data="pageData.data.contact_hero" />
        <div v-if="pageData.data.contact_info_title" class="section">
          <div class="contact-info">
            <div class="contact-info__inner">
              <div class="address-block">
                <div
                  v-dompurify-html="pageData.data.contact_info_title"
                  data-paragraph
                ></div>
                <div class="address-tab">
                  <div
                    class="w-tabs"
                    data-current="Corporate Headquarters"
                    data-duration-in="500"
                    data-duration-out="100"
                    data-easing="ease-in-out"
                  >
                    <div class="address-tab__menu-wrapper w-tab-menu">
                      <a
                        v-for="(tab, index) in pageData.data.address_details"
                        :key="index"
                        class="address-tab__menu-item w-inline-block w-tab-link w--current"
                        :data-w-tab="tab.address_tab_name"
                        @click="setActiveTab(tab.address_tab_name, index)"
                      >
                        <div data-paragraph>{{ tab.address_tab_name }}</div>
                      </a>
                    </div>
                    <div class="w-tab-content">
                      <div
                        v-for="(content, contentIndex) in pageData.data
                          .address_details"
                        :key="contentIndex"
                        class="w-tab-pane"
                        :class="
                          activeTab === content.address_tab_name
                            ? 'w--tab-active'
                            : ''
                        "
                        :data-w-tab="content.address_tab_name"
                      >
                        <div class="address-tab-content">
                          <div data-paragraph v-dompurify-html="content.address"></div>
                          <a
                            class="address-link w-inline-block"
                            :href="content.address_map_link"
                            target="_blank"
                          >
                            <div data-paragraph>
                              {{ content.cta_text }}
                            </div>
                            <div class="address-link__arrow"></div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="map-image"
                :style="{
                  backgroundImage:
                    'url(' +
                    mxMediaUrl +
                    pageData.data.address_details[activeIndex].section_image
                      .url +
                    ')'
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="pageData.data.contact_form" class="section">
        <div class="contact-info form">
          <div class="contact-form__heading">
            <div data-paragraph>
              {{ pageData.data.contact_form.title }}
            </div>
          </div>
          <div class="contact-form-wrapper">
            <div
              v-if="pageData.data.contact_form.section_image"
              class="contact-form-wrapper__image"
              :style="{
                backgroundImage:
                  'url(' +
                  mxMediaUrl +
                  pageData.data.contact_form.section_image.url +
                  ')'
              }"
            ></div>

            <div class="contact-form">
              <div class="w-form">
                <form
                  @submit.prevent="submitForm"
                >
                  <div class="error-message">
                      {{ validation.firstError('formData.full_name') }}
                    </div>
                  <input
                    id="name"
                    v-model="formData.full_name"
                    class="text-field w-input"
                    :class="{
                      'input-error': validation.hasError('formData.full_name')
                    }"
                    placeholder="Full Name"
                    type="text"
                  />
                     <div class="error-message">
                      {{ validation.firstError('formData.email_address') }}
                    </div>
                  <input
                    v-model="formData.email_address"
                    class="text-field w-input"
                    :class="{
                      'input-error': validation.hasError('formData.email_address')
                    }"
                    placeholder="Email Address"
                  />
                   <span class="error-message">
                      {{ validation.firstError('formData.purpose_of_contact') }}
                    </span>
                  <select
                    id="Purpose"
                    v-model="formData.purpose_of_contact"
                    class="text-field select w-select"
                    :class="{
                      'input-error': validation.hasError('formData.purpose_of_contact')
                    }"
                  >
                    <option :value="undefined">Select One</option>
                    <option
                      v-for="purpose in pageData.data.contact_form.purpose_of_contact.split(
                        /\r?\n/
                      )"
                      :key="purpose"
                      :value="purpose"
                    >
                      {{ purpose }}
                    </option>
                  </select>
                     <span class="error-message">
                      {{ validation.firstError('formData.message') }}
                    </span>
                  <textarea
                    v-model="formData.message"
                    class="text-field big w-input"
                    :class="{
                      'input-error': validation.hasError('formData.message')
                    }"
                    maxlength="5000"
                    placeholder="Example Text"
                  />
                 
                  <button
                    class="button dark-blue-variant yellow-text"
                    type="submit"
                  >
                    <div data-paragraph>SEND MESSAGE</div>
                    <div
                      class="button__icon-wrapper big dark-blue-variant"
                    ></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="pageData.data.enquiry_channels" class="enquiry-channels">
        <div class="enquiry-channels__item first">
          <div>{{ pageData.data.enquiry_channels.title }}</div>
        </div>
        <div class="enquiry-channels__item">
          <div class="enquiry-channels-icon-flex phone"></div>
          <div>
            Call:
            <a
              class="inpage-link"
              :href="`tel: ${pageData.data.enquiry_channels.phone}`"
              >{{ pageData.data.enquiry_channels.phone }}</a
            >
          </div>
        </div>
        <div class="enquiry-channels__item last">
          <div class="enquiry-channels-icon-flex message"></div>
          <div class="mr-25">
            Email:
            <a
              class="inpage-link"
              :href="`mailto:${pageData.data.enquiry_channels.email_address}`"
              >
              {{ pageData.data.enquiry_channels.email_address }}
              </a
            >
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store, error }) {
    const fetchContactPage = store.dispatch('fetchWidgets', {
      page: 'contact-page'
    })

    return (
      Promise.all([fetchContactPage])
        .then((responses) => {
          const [pageData] = responses

          return {
            pageData
          }
        })
        // eslint-disable-next-line arrow-parens
        .catch((responseError) => error(responseError))
    )
  },

  data() {
    return {
      formData: {},
      page: null,
      activeTab: '',
      activeIndex: 0
    }
  },

  head() {
    return {
      title: 'NNPC LTD | Contact Us'
    }
  },

  validators: {
    'formData.full_name'(value = '') {
      return this.$Validator.value(value).maxLength(140).required().regex(/^[a-zA-Z\s-]+$/, 'Name can only contain letters and hyphens (-)')
    },

    'formData.email_address'(value = '') {
      return this.$Validator.value(value).maxLength(140).required().email()
    },

    'formData.purpose_of_contact'(value = '') {
      return this.$Validator.value(value).required()
    },

    'formData.message'(value = '') {
      return this.$Validator.value(value).required().maxLength(5000).required().regex(/^[a-zA-Z0-9]+$/, 'Name should only contain alphanumeric characters')
    }
  },

  beforeDestroy() {
    this.page.destroyScroll()
  },

  mounted() {
    this.activeTab = this.pageData.data.address_details[0].address_tab_name
    // eslint-disable-next-line no-new
    this.page = new this.$pageAnimation('.locomotive-scroll')
  },

  methods: {
    async submitForm() {
      this.isSubmitting = true

     const isValidated = await this.$validate()
      if (!isValidated) {
         this.$toast.open({
        message: 'Some fields require your attention',
        type: 'error',
        duration: 3000
      })
      return false
      }

      this.$toast.open({
        message: 'Sending your message...',
        type: 'info',
        duration: 500
      })

      const response = await this.$store.dispatch('submitContactForm', {
        data: this.formData
      })
      if (response) {
        this.formData = {}
        this.isSubmitting = false
        this.$toast.success('Your message has been sent')
      } else {
        this.isSubmitting = false
        this.$toast.error('Form has an error submitting ')
      }
    },

    setActiveTab(_name, _index) {
      this.activeTab = _name
      this.activeIndex = _index
    }
  }
}
</script>

<style lang="scss" scoped></style>
