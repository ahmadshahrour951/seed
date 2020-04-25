<template>
  <b-navbar toggleable="lg" type="dark" style="background-color: #2b7a78">
    <b-navbar-brand href="#">Covid Optimize</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>Ahmed Shahrour</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="handleLogout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    async handleLogout() {
      try {
        await this.$store.dispatch('auth/logout');
        this.$router.push({ name: 'Login' });
      } catch (error) {
        this.$router.push({ name: 'Login' });
        alert('Logout request failed, please refresh your browser');
      }
    },
  },
};
</script>

<style></style>
