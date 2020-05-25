<template>
  <div class="h-100" style="background-color: #2b7a78 ">
    <div class="container h-100">
      <b-row class="h-100">
        <b-card
          class="shadow col-9 col-sm-9 col-md-7 col-lg-5 col-xl-5 mx-auto my-auto text-center"
          style="min-width: 340px;"
        >
          <b-card-title title-tag="h2">Covid Optimize</b-card-title>
          <hr />
          <b-card-body>
            <LoginForm />
          </b-card-body>
          <hr />
          <b-link :to="{ name: 'EmailPassword' }" variant="primary"
            >Forgot your password?</b-link
          >
        </b-card>
      </b-row>
    </div>
  </div>
</template>

<script>
import LoginForm from './forms/LoginForm';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  created() {
    if (this.loggedIn) {
      this.$router.replace({ name: 'Dashboard' });
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
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
