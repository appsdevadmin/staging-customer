<template>
  <div
    id="w-node-ec6e6b4b-4a23-8114-4aa8-8e86525bc2fe-4d5f0fbf"
    class="team-member"
    @click="$emit('showViewMoreModal')"
    @mouseenter="enterHover"
    @mouseleave="leaveHover"
  >
    <div class="team-member__image">
      <img
        ref="avatar"
        alt=""
        class="img team-image"
        loading="lazy"
        :src="member.member_image ? mxMediaUrl + member.member_image.url : null"
      />
      <a class="team-member__linkedin w-inline-block" href="#"></a>
    </div>
    <div class="team-member__bio">
      <div>
        <div class="team-member__name" data-paragraph>
          {{ member.name }}
        </div>
        <div data-paragraph>
          {{ member.position }}
        </div>
      </div>
      <div class="team-member__read-more"></div>
    </div>
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
  },

  methods: {
    leaveHover() {
      const img = this.$refs.avatar
      img.classList.remove('mouse-enter')
      img.classList.add('mouse-leave')
    },

    enterHover() {
      const img = this.$refs.avatar
      img.classList.remove('mouse-leave')
      img.classList.add('mouse-enter')
    }
  }
}
</script>

<style>
.mouse-enter {
  transform: scale(1.1);
}
.mouse-leave {
  transform: scale(1);
}

.team-image {
  transition: transform 0.5s ease-in-out;
}
</style>
