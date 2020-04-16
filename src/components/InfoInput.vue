<template>
  <div>
    <TheNavBar />
    <div class="container mt-5">
      <b-card class="shadow">
        <b-card-title title-tag="h2">Information Form</b-card-title>
        <hr />
        <b-card-body>
          <b-form @submit="onSubmit">
            <h4>Resource Vacancy</h4>
            <hr />
            <b-row class="mt-4">
              <b-col>
                <b-form-group label="ICUs">
                  <b-form-input
                    type="number"
                    v-model="icus_vacant"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Beds">
                  <b-form-input type="number" v-model="beds_vacant">
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Ventilators">
                  <b-form-input type="number" v-model="ventilators_vacant">
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <h4 class="mt-5">ER Waiting Room</h4>
            <hr />
            <b-row class="mt-4">
              <b-col>
                <b-form-group
                  :label="`Approx. ER Waiting Time (${er_wait_time} hrs)`"
                >
                  <b-form-input
                    v-model="er_wait_time"
                    type="range"
                    min="0"
                    max="8"
                    step="0.25"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Patients Waiting">
                  <b-form-input
                    type="number"
                    v-model="patients_waiting"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <div class="text-center">
              <b-button
                v-if="!showSpinner"
                type="submit"
                variant="primary"
                class="w-25 mt-5"
                >Submit</b-button
              >
              <b-button v-else disabled variant="primary" class="w-25 mt-5"
                ><b-spinner class="mx-auto" small></b-spinner
              ></b-button>
            </div>
          </b-form>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import TheNavBar from './TheNavBar';
export default {
  name: 'InfoInput',
  components: {
    TheNavBar
  },
  data() {
    return {
      showSpinner: false,
      icus_vacant: '',
      beds_vacant: '',
      ventilators_vacant: '',
      er_wait_time: 0,
      patients_waiting: ''
    };
  },
  methods: {
    onSubmit() {
      this.showSpinner = true;
    }
  }
};
</script>

<style></style>
