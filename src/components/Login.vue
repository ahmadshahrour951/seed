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
            <div style="height: 160px;" class="align-middle">
              <b-row v-if="showSpinner" class="h-100 py-5 my-3">
                <b-spinner class="mx-auto"></b-spinner>
              </b-row>
              <b-form
                v-else
                @submit="onSubmit"
                class="mx-auto mt-3 mb-3"
                style="height: inherit;"
              >
                <b-form-input
                  type="email"
                  required
                  placeholder="Email"
                  v-model="form.email"
                  class="mb-3 shadow-sm"
                >
                </b-form-input>
                <b-form-input
                  type="password"
                  required
                  placeholder="Password"
                  v-model="form.password"
                  class="mb-3 mt-3 shadow-sm"
                >
                </b-form-input>
                <b-button
                  type="submit"
                  class="w-50"
                  :disabled="disableSubmit"
                  variant="outline-primary"
                  >Login</b-button
                >
              </b-form>
            </div>
          </b-card-body>
        </b-card>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      showSpinner: false
    };
  },
  computed: {
    disableSubmit() {
      return !this.form.email.length || !this.form.password.length;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.showSpinner = true;
      setTimeout(() => {
        // this.$emit('authenticated', true);
        this.$router.push({ name: 'InfoInput' });
      }, 2000);
    }
  }
};
</script>

<style></style>
