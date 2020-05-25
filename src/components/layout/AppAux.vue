<template>
  <transition name="slide-fade" mode="out-in" appear>
    <router-view mode="out-in" class="h-100"> </router-view>
  </transition>
</template>

<script>
export default {
  name: 'AppAux',
  created() {
    if (
      !['Login', 'EmailPassword', 'ResetPassword'].some(
        (x) => x === this.$route.name
      )
    ) {
      this.$store.dispatch('auth/tryAutoLogin');
    }
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave {
  opacity: 1;
}
</style>
