<template>
  <b-container>
    <b-card class="shadow" style="min-height: 60vh">
      <b-card-header style="background-color: transparent;">
        <b-card-title title-tag="h2">Profile</b-card-title>
      </b-card-header>
      <div
        :class="[loading ? 'd-flex' : 'd-none', 'align-items-center', 'h-100']"
      >
        <b-spinner
          label="Loading..."
          variant="primary"
          class="m-auto"
          style="width: 3rem; height: 3rem;"
        ></b-spinner>
      </div>
      <b-card-body v-show="!loading">
        <b-row class="mt-5" align-v="center">
          <b-col cols="3">
            <h4>Name</h4>
          </b-col>
          <b-col>
            <b-form-input size="md" v-model="user.fullName" disabled>
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-5" align-v="center">
          <b-col cols="3">
            <h4>Email</h4>
          </b-col>
          <b-col>
            <b-form-input size="md" v-model="user.email" disabled>
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-5" align-v="center">
          <b-col cols="3">
            <h4>Phone</h4>
          </b-col>
          <b-col>
            <b-form-input size="md" v-model="user.phone" disabled>
            </b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-5 mb-5" align-v="center">
          <b-col cols="3">
            <h4>Hospital</h4>
          </b-col>
          <b-col>
            <b-form-input size="md" v-model="user.hospital.name" disabled>
            </b-form-input>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <div class="text-center pt-2 pb-5">
      <b-button class="w-50" size="lg" @click="handleLogout" variant="primary"
        >Log Out</b-button
      >
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      user: {
        hospital: {
          id: '',
          name: '',
        },
      },
    };
  },
  created() {
    if (this.loggedIn) this.fetchData();
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  watch: {
    loggedIn(val) {
      if (val) this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      try {
        const { userId } = this.$store.getters['auth/jwtData'];
        const res = await this.$api.get(`users/${userId}`);
        this.user = res.data.data;
        this.user.fullName = `${res.data.data.firstName} ${res.data.data.lastName}`;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async handleLogout() {
      try {
        await this.$store.dispatch('auth/logout');
        this.$router.replace({ name: 'Login' });
      } catch (error) {
        this.$router.replace({ name: 'Login' });
        alert('Logout request failed, please refresh your browser');
      }
    },
  },
};
</script>

<style></style>
