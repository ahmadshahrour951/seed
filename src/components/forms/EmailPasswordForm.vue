<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <b-form
      @submit.prevent="passes(handleSubmit)"
      class="mx-auto mt-3 mb-3"
      style="height: inherit;"
    >
      <TextInputWithValidation
        rules="required|email"
        type="email"
        label="Email address:"
        name="Email"
        v-model="email"
        class="text-left"
      />
      <ButtonWithSpinner :loading="loading" text="Submit" class="pt-3" />

      <b-form-group>
        <div
          v-if="message && !isSuccessful"
          class="alert alert-danger"
          role="alert"
        >
          {{ message }}
        </div>
        <div
          v-else-if="message && isSuccessful"
          class="alert alert-success"
          role="alert"
        >
          {{ message }}
        </div>
      </b-form-group>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import TextInputWithValidation from './inputs/TextInputWithValidation';
import ButtonWithSpinner from './buttons/ButtonWithSpinner';

import './vee-validate';

export default {
  name: 'EmailPasswordForm',
  components: {
    ValidationObserver,
    TextInputWithValidation,
    ButtonWithSpinner,
  },
  data() {
    return {
      email: null,
      isSuccessful: false,
      loading: false,
      message: '',
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;

      try {
        if (this.email) {
          await this.$api.post('auth/reset', {
            email: this.email,
          });
          this.loading = false;
          this.isSuccessful = true;
          this.message = 'Please check your email to reset your password';
        }
      } catch (error) {
        this.loading = false;
        this.message =
          error.message ||
          error.response.data.message ||
          (error.response && error.response.data);
      }
    },
  },
};
</script>

<style></style>
