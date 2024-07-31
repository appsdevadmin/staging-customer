<template>
  <div>
    <NavComponent />
    <div class="coming-soon-header">
      <div class="error-page">
        <div class="_404-page-wrap">
          <img
            alt=""
            class="error-image"
            src="@/static/assets/custom-images/exclamation-mark-inside-a-circle.svg"
          />
          <h1 class="dblue-text">
            {{ error.statusCode }}
          </h1>
          <div v-if="error.statusCode >= 500" class="error-message">
            <span> Server Error, Please try again later</span>
            <div class="home-page-link" @click="refresh">
              Try again
            </div>
          </div>
          <div v-else class="error-message">
            {{ error.message }} <br />
            <div
              v-if="ifErrorIsPost"
              class="home-page-link"
              @click="$router.push('/insights')"
            >
              Insights
            </div>
            <div
              v-if="!ifErrorIsPost"
              class="home-page-link"
              @click="$router.push('/')"
            >
              Home Page
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
// Exports

export default {
  layout: 'guest',
  props: {
    error: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {}
  },

  head() {
    return {
      title: this.error.statusCode + ' | NNPC'
    }
  },

  computed: {
    ifErrorIsPost() {
      return !!this.$nuxt.$route.path.includes('insights')
    }
  },

  methods: {
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.page-header {
  min-height: 0px;
}
.error-message {
  font-size: 16px;
  color: white;
}
.error-page {
  height: 100vh;
  padding-top: 100px;
  color: white;
}
._404-page-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.error-image {
  width: 200px;
  height: 200px;
  filter: brightness(0) invert(1);
  min-width: 0;
}
.home-page-link {
  cursor: pointer;
  text-align: center;
  margin-top: 30px;
  text-decoration: underline;
}

.dblue-text {
  text-align: center;
}
</style>
