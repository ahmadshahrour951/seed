<template>
  <div>
    <TheNavBar style="min-height: 7vh" />
    <transition name="slide-fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import TheNavBar from './TheNavBar';
export default {
  components: {
    TheNavBar,
  },
  // created() {
  //   if (this.$route.name === 'Dashboard') {
  //     this.$router.push({ name: 'InputHistory' });
  //   }
  // },
};
</script>

<style></style>
