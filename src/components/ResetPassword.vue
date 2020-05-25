<template>
  <div class="h-100" style="background-color: #2b7a78 ">
    <div class="container h-100">
      <b-row class="h-100">
        <b-card
          class="shadow col-9 col-sm-9 col-md-7 col-lg-5 col-xl-4 mx-auto my-auto text-center"
          style="min-width: 340px;"
        >
          <b-card-title title-tag="h2">Covid Optimize</b-card-title>
          <hr />
          <b-card-body>
            <ResetPasswordForm
              v-show="!failedFetch && !loading"
              :userId="userId"
            />
            <h4 v-show="failedFetch && !loading" class="text-muted">
              Something wrong occurred, please try resetting your password
              again.
            </h4>
          </b-card-body>
        </b-card>
      </b-row>
    </div>
  </div>
</template>

<script>
import ResetPasswordForm from './forms/ResetPasswordForm';
export default {
  components: {
    ResetPasswordForm,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      loading: false,
      userId: null,
      failedFetch: false,
    };
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const res = await this.$api.get(
          `auth/reset/${this.$route.params.passwordToken}`
        );
        this.userId = res.data.data.userId;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.failedFetch = true;
      }
    },
  },
};
</script>

<style></style>
