<template>
  <div class="profile-overlay show">
    <div
      class="close-icon"
      data-w-id="863f0aab-e279-3913-9d3e-e82894cf5024"
      @click="$emit('closeModal')"
    ></div>
    <div class="profile-open">
      <div class="profile-open__image">
        <img
          alt=""
          class="img"
          loading="lazy"
          :src="
            member.member_image ? mxMediaUrl + member.member_image.url : null
          "
        />
        <a
          v-if="member.linkedin_link"
          class="profile-open__ig-link w-inline-block"
          :href="member.linkedin_link"
          target="_blank"
        ></a>
      </div>
      <div class="profile-open__text-block">
        <div class="profile-opern__name">
          {{ member.name }}
        </div>
        <div class="profile-open__title">
          {{ member.position }}
        </div>
        <div v-dompurify-html="member.description" />
      </div>
    </div>
    <a class="logo modal w-inline-block" href="index.html"></a>
  </div>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
.profile-overlay.show {
  display: block;
  opacity: 1;
}
</style>
