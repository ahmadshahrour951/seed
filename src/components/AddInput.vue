<template>
  <div>
    <div class="container mt-5">
      <b-card class="shadow">
        <b-button variant="outline-primary" @click="$router.back()">
          <b-icon icon="chevron-left" font-scale="1"></b-icon>
          Back
        </b-button>

        <b-card-title title-tag="h2" class="mt-4">New Entry Form</b-card-title>
        <hr />
        <b-card-body>
          <InfoInputForm />
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import InfoInputForm from './forms/InfoInputForm';

export default {
  name: 'AddInput',
  components: {
    InfoInputForm,
  },
};
</script>

<style></style>
