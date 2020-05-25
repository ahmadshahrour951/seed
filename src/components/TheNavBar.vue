<template>
  <b-navbar toggleable="lg" type="dark" style="background-color: #2b7a78">
    <b-navbar-brand :to="{ name: 'Dashboard' }">Covid Optimize</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <b-button
            :variant="$route.name === 'Dashboard' ? 'light' : 'outline-light'"
            :to="{ name: 'Dashboard' }"
            style="width: 150px"
          >
            Dashboard
          </b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button
            :variant="$route.name === 'Profile' ? 'light' : 'outline-light'"
            :to="{ name: 'Profile' }"
            style="width: 150px"
          >
            Profile
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style></style>
