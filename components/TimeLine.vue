<template>
  <div>
    <div v-if="index % 2" class="history-stripe inverted">
      <div
        class="history-stripe__image _1971"
        :style="{
          backgroundImage:
            'url(' + mxMediaUrl + timeline.section_image.url + ')'
        }"
      ></div>
      <div class="history-stripe__text-block">
        <div class="history-stripe__text-block--inner" data-paragraph>
          {{ timeline.content }}
        </div>
      </div>
      <div class="history-stripe__date">
        <div
          v-if="timeline.date"
          class="history-stripe__date--month"
          data-paragraph
        >
          {{ timeline.date }}
        </div>
        <div :data-odometer="timeline.year">
          {{ timeline.year }}
        </div>
        <div class="history-stripe__vertical-line"></div>
      </div>
    </div>
    <div v-else class="history-stripe">
      <div class="history-stripe__date">
        <div
          v-if="timeline.date"
          class="history-stripe__date--month"
          data-paragraph
        >
          {{ timeline.date }}
        </div>
        <div :data-odometer="timeline.year">
          {{ timeline.year }}
        </div>
        <div class="history-stripe__vertical-line"></div>
      </div>
      <div
        class="history-stripe__image _1956"
        :style="{
          backgroundImage:
            'url(' + mxMediaUrl + timeline.section_image.url + ')'
        }"
      ></div>
      <div class="history-stripe__text-block">
        <div class="history-stripe__text-block--inner" data-paragraph>
          {{ timeline.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timeline: {
      type: Object,
      default() {
        return {}
      }
    },

    index: {
      type: Number,
      default() {
        return 1
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
