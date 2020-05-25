<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <b-form
      @submit.prevent="passes(handleSubmit)"
      class="mx-auto mt-3 mb-3"
      style="height: inherit;"
    >
      <TextInputWithValidation
        rules="required|password"
        name="Password"
        vid="password"
        type="password"
        label="Password:"
        v-model="password"
        class="text-left"
      />
      <TextInputWithValidation
        :rules="`required|confirm_password:${password}`"
        name="ConfirmPassword"
        vid="confirm_password"
        type="password"
        label="Confirm Password:"
        v-model="confirmPassword"
        class="text-left"
      />
      <ButtonWithSpinner
        :loading="loading"
        text="Reset Password"
        class="pt-3"
      />
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import TextInputWithValidation from './inputs/TextInputWithValidation';
import ButtonWithSpinner from './buttons/ButtonWithSpinner';

import './vee-validate';

export default {
  name: 'ResetPasswordForm',
  components: {
    ValidationObserver,
    TextInputWithValidation,
    ButtonWithSpinner,
  },
  props: ['userId'],
  data() {
    return {
      loading: false,
      message: '',
      password: '',
      confirmPassword: null,
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;

      try {
        if (
          this.password &&
          this.confirmPassword &&
          this.userId &&
          this.password === this.confirmPassword
        ) {
          await this.$api.post('auth/new-password', {
            userId: this.userId,
            password: this.password,
            passwordToken: this.$route.params.passwordToken,
          });
          this.loading = false;
          this.$router.push({ name: 'Login' });
        } else {
          throw Error('There seems to be an issue');
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
