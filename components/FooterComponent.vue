<template>
  <div class="footer">
    <div class="footer__first-section">
      <div class="footer-logo-flex">
        <nuxt-link class="footer-logo" to="/"></nuxt-link>
        <div>Energy for Today, <br />Energy for Tomorrow</div>
      </div>
      <div v-if="false" class="price-slider-wrapper-alt">
        <div
          aria-label="carousel"
          class="product-slide-wrapper-alt w-slider"
          data-animation="slide"
          data-autoplay="true"
          data-autoplay-limit="0"
          data-delay="4000"
          data-disable-swipe="false"
          data-duration="500"
          data-easing="ease"
          data-hide-arrows="false"
          data-infinite="true"
          data-nav-spacing="3"
          role="region"
        >
          <div id="w-slider-mask-0" class="w-slider-mask">
            {{ $initWebflow() }}
            <div
              v-for="(value, key) in fuelPrices"
              :key="key"
              aria-label="1 of 2"
              class="w-slide"
              role="group"
            >
              <div v-if="value.rates">
                <div class="product-slide__header-alt">
                  {{ value.base }}
                </div>
                <div class="product-slide__flex">
                  <div class="product-slide__stat price">
                    {{ value.rates.close | currency }}
                  </div>
                  <div
                    class="product-slide__stat"
                    :class="
                      value.rates.close > value.rates.open ? 'green' : 'red'
                    "
                  >
                    <div
                      class="product-slide__stat-icon"
                      :class="
                        value.rates.close > value.rates.open ? 'green' : 'red'
                      "
                    ></div>
                    <div>
                      {{ value.rates.close > value.rates.open ? '+' : '' }}
                      {{
                        (value.rates.close - value.rates.open) | number('0.00')
                      }}
                    </div>
                  </div>
                  <div
                    class="product-slide__stat"
                    :class="
                      value.rates.close > value.rates.open ? 'green' : 'red'
                    "
                  >
                    <div
                      class="product-slide__stat-icon"
                      :class="
                        value.rates.close > value.rates.open ? 'green' : 'red'
                      "
                    ></div>
                    <div>
                      {{ value.rates.close > value.rates.open ? '+' : '' }}
                      {{
                        (((value.rates.close - value.rates.open) /
                          value.rates.open) *
                          100)
                          | number('0.00')
                      }}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-controls="w-slider-mask-0"
            aria-label="previous slide"
            class="product-slider-arrow-alt left w-slider-arrow-left"
            role="button"
            tabindex="0"
          ></div>
          <div
            aria-controls="w-slider-mask-0"
            aria-label="next slide"
            class="product-slider-arrow-alt w-slider-arrow-right"
            role="button"
            tabindex="0"
          ></div>
          <div class="display-none w-slider-nav w-round">
            <div
              aria-label="Show slide 1 of 2"
              aria-pressed="true"
              class="w-slider-dot w-active"
              data-wf-ignore=""
              role="button"
              style="margin-left: 3px; margin-right: 3px"
              tabindex="0"
            ></div>
            <div
              aria-label="Show slide 2 of 2"
              aria-pressed="false"
              class="w-slider-dot"
              data-wf-ignore=""
              role="button"
              style="margin-left: 3px; margin-right: 3px"
              tabindex="-1"
            ></div>
          </div>
        </div>
      </div>
      <div class="copyright-text">
        © {{ new Date().getFullYear() }} NNPC Limited.
      </div>
    </div>
    <div class="footer-links-cluster">
      <div class="email-sub">
        <div>Never miss out on what we’re up to</div>
        <div class="emil-sub-form-wrapper w-form">
          <form
          >
            <div class="email-sub-form">
              <input
                id="email-4"
                class="email-sub__input w-input"
                data-name="Email 4"
                maxlength="256"
                name="email-4"
                placeholder="What’s your email?"
                type="email"
              />
              <div class="email-form-submit"></div>
            </div>
          </form>
          <div class="w-form-done">
            <div>Thank you! Your submission has been received!</div>
          </div>
          <div class="w-form-fail">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div>
      </div>
      <div class="footer-links-wrapper">
        <div class="footer-links-block">
          <div class="footer-links-block__heading">NNPC</div>
          <nuxt-link class="footer-link" to="/who-we-are">
            Who we are
          </nuxt-link>
          <nuxt-link v-if="false" class="footer-link" to="/businesses">
            Our Businesses
          </nuxt-link>
          <nuxt-link class="footer-link" to="/investors"> Investors </nuxt-link>
          <nuxt-link class="footer-link" to="/contact"> Contact </nuxt-link>
          <nuxt-link class="footer-link" to="/terms-of-use">
            Terms Of Use
          </nuxt-link>
          <nuxt-link class="footer-link" to="/privacy-policy">
            Privacy Policy
          </nuxt-link>
          <nuxt-link class="footer-link" to="/documents"> Documents </nuxt-link>
          <nuxt-link class="footer-link" to="/careers"> Careers </nuxt-link>
        </div>
        <div class="footer-links-wrapper__seperator"></div>
        <div class="footer-links-block">
          <div class="footer-links-block__heading services">SERVICES</div>
          <div class="links-flex">
            <div
              class="footer-link services"
              href="#"
              @click="openBusinessPage('data-upstream')"
            >
              Upstream
            </div>
            <div
              class="footer-link services"
              href="#"
              @click="openBusinessPage('data-downstream')"
            >
              Downstream
            </div>
            <div
              class="footer-link services"
              href="#"
              @click="openBusinessPage('data-gas')"
            >
              Gas &amp; Power
            </div>
            <div
              class="footer-link services"
              href="#"
              @click="openBusinessPage('data-non-energy')"
            >
              Non-Energy
            </div>
            <div
              class="footer-link services"
              href="#"
              @click="openBusinessPage('data-new-energy')"
            >
              New Energy
            </div>
          </div>
        </div>
        <div class="footer-links-wrapper__seperator"></div>
        <div class="footer-links-block last">
          <div class="footer-links-block__heading">SOCIAL MEDIA</div>
          <a
            class="social-media-link w-inline-block"
            href="https://twitter.com/nnpclimited?t=4JAdYy0kq7cG140n1NKJLw&s=03"
            target="_blank"
          >
            <div class="social-media-link__icon tx"></div>
            <div>X</div>
          </a>
          <a
            class="social-media-link w-inline-block"
            href="https://www.facebook.com/nnpclimited/"
            target="_blank"
          >
            <div class="social-media-link__icon fb"></div>
            <div>Facebook</div>
          </a>
          <a
            class="social-media-link w-inline-block"
            href="https://www.instagram.com/nnpclimited/"
            target="_blank"
          >
            <div class="social-media-link__icon ig"></div>
            <div>Instagram</div>
          </a>
          <a
            class="social-media-link w-inline-block"
            href="https://www.linkedin.com/company/nnpclimited/"
            target="_blank"
          >
            <div class="social-media-link__icon ln"></div>
            <div>Linkedin</div>
          </a>
          <a
            class="social-media-link w-inline-block"
            href="https://youtube.com/c/NNPCLimited"
            target="_blank"
          >
            <div class="social-media-link__icon yt"></div>
            <div>Youtube</div>
          </a>
          <a
            class="social-media-link w-inline-block"
            href="https://www.threads.net/@nnpclimited"
            target="_blank"
          >
            <div class="social-media-link__icon tr"></div>
            <div>Threads</div>
          </a>
        </div>
      </div>
      <div v-if="false" class="terms-and-conditions">
        <a class="terms-and-conditions__link" href="#">TERMS AND CONDITIONS</a>
        <a class="terms-and-conditions__link" href="#">PRIVACY POLICY</a>
      </div>
      <div class="copyright-text mobile">
        © {{ new Date().getFullYear() }} NNPC Limited.
      </div>
      <a
        class="site-credit w-inline-block"
        href="http://check-dc.com"
        target="_blank"
        >
        <img
          alt="Check DC logo icon"
          src="../static/assets/images/check-dc-logo-icon.png"
          title="Check : A Lagos based design agency focused on Brand Identity, Website design and Digital Marketing."
          width="25"
      /></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      isFuelPricesAvailable: false,
      fuelPrices: {
        gasData: {},
        wtiData: {},
        crudeData: {}
      }
    }
  },

  computed: {
    emailServiceId() {
      return process.env.emailServiceId
    },

    emailUserId() {
      return process.env.emailUserId
    },

    newsLetterEmailTemplateId() {
      return process.env.newsLetterEmailTemplateId
    }
  },

  mounted() {
    // this.fetchCommodities()
    this.$nextTick(() => {
      this.$initWebflow()
    })
  },

  methods: {
    openBusinessPage(section) {
      this.$store.commit('updateBusinessPageSection', section)
      this.$router.push('/businesses')
    },

    submit() {
      const formParams = {
        service_id: this.emailServiceId,
        template_id: this.newsLetterEmailTemplateId,
        user_id: this.emailUserId,
        template_params: {
          email: this.email
        }
      }
      this.$store
        .dispatch('submitForm', formParams)
        .then(() => {
          this.email = ''
          this.$toast.success(' You have been subscribed ')
        })
        .finally(() => {
          this.sending = false
        })
    },

    async fetchCommodities() {
      const date = this.$formatDateTime(
        new Date(new Date().setDate(new Date().getDate())),
        'YYYY-MM-DD'
      )
      const baseUrl =
        'https://feedableapi.checkwebtest.com/api/commodity/open-high-low-close/'

      const gasCall = await this.$axios.$get(baseUrl + date, {
        params: {
          base: 'NG',
          symbols: 'USD'
        }
      })
      const witCall = await this.$axios.$get(baseUrl + date, {
        params: {
          base: 'WTIOIL',
          symbols: 'USD'
        }
      })
      const crudeCall = await this.$axios.$get(baseUrl + date, {
        params: {
          base: 'BRENTOIL',
          symbols: 'USD'
        }
      })

      return Promise.all([gasCall, witCall, crudeCall]).then((responses) => {
        const [gasData, wtiData, crudeData] = responses
        this.fuelPrices.gasData = gasData
        this.fuelPrices.wtiData = wtiData
        this.fuelPrices.crudeData = crudeData
        this.isFuelPricesAvailable = true
      })
    }
  }
}
</script>

<style scoped>
.footer-link {
  cursor: pointer;
}

.w-slider-mask,
.price-slider-wrapper {
}

.email-form-submit {
  background-color: transparent;
}
</style>
