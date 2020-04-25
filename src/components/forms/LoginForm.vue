<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <b-form
      @submit.prevent="passes(handleLogin)"
      class="mx-auto mt-3 mb-3"
      style="height: inherit;"
    >
      <TextInputWithValidation
        rules="required|email"
        type="email"
        label="Email address:"
        name="Email"
        v-model="user.email"
        class="text-left"
      />

      <TextInputWithValidation
        rules="required"
        name="Password"
        vid="password"
        type="password"
        label="Password:"
        v-model="user.password"
        class="text-left"
      />

      <ButtonWithSpinner :loading="loading" text="Login" class="pt-3" />

      <b-form-group>
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </b-form-group>
    </b-form>
  </ValidationObserver>
</template>

<script>
import User from '../../models/user';

import { ValidationObserver } from 'vee-validate';
import TextInputWithValidation from './inputs/TextInputWithValidation';
import ButtonWithSpinner from './buttons/ButtonWithSpinner';

import './vee-validate';

export default {
  name: 'LoginForm',
  components: {
    ValidationObserver,
    TextInputWithValidation,
    ButtonWithSpinner,
  },
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;

      try {
        if (this.user.email && this.user.password) {
          await this.$store.dispatch('auth/login', {
            api: this.$api,
            user: this.user,
          });
          this.$router.push({ name: 'InfoInput' });
        }
      } catch (error) {
        this.loading = false;
        this.message =
          error.response.data.message ||
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },
    resetForm() {
      this.user = new User('', '');
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },
  },
};
</script>

<style></style>
