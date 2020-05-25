<template>
  <b-form-group>
    <b-button :disabled="loading" type="submit" class="w-50" variant="primary">
      <b-spinner
        v-show="loading"
        class="mx-auto"
        small
        variant="primary"
      ></b-spinner>
      <span>{{ text }}</span>
    </b-button>
  </b-form-group>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
    },
    text: {
      type: String,
    },
  },
};
</script>

<style></style>
