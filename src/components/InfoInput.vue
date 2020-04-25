<template>
  <div>
    <TheNavBar />
    <div class="container mt-5">
      <b-card class="shadow">
        <b-card-title title-tag="h2">Information Form</b-card-title>
        <hr />
        <b-card-body>
          <InfoInputForm />
        </b-card-body>
      </b-card>
    </div>
  </div>
  <!-- <b-form-group
                  :label="`Approx. ER Waiting Time (${er_wait_time} hrs)`"
                >
                  <b-form-input
                    v-model="er_wait_time"
                    type="range"
                    min="0"
                    max="8"
                    step="0.25"
                  ></b-form-input>
                </b-form-group> -->
</template>

<script>
import TheNavBar from './TheNavBar';
import InfoInputForm from './forms/InfoInputForm';

export default {
  name: 'InfoInput',
  components: {
    TheNavBar,
    InfoInputForm,
  },
};
</script>

<style></style>
