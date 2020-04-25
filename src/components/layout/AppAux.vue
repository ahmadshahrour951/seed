<template>
  <transition name="slide-fade" mode="out-in" appear>
    <router-view mode="out-in"> </router-view>
  </transition>
</template>

<script>
export default {
  name: 'AppAux',
  async created() {
    // this.$store.dispatch('auth/setCsrf', { api: this.$api });
    await this.$store.dispatch('auth/tryAutoLogin');

    if (!this.loggedIn && this.$route.path !== '/login') {
      this.$router.push({ name: 'Login' });
    } else if (this.$route.path === '/') {
      this.$router.push({ name: 'InfoInput' });
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
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
