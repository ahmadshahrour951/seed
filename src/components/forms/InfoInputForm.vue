<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <b-form @submit.prevent="passes(handleSubmit)">
      <h4>Resource Vacancy</h4>
      <hr />
      <b-row class="mt-4">
        <b-col>
          <TextInputWithValidation
            rules="required"
            type="number"
            label="ICUs:"
            name="ICUs"
            v-model="infoInput.icuBedCount"
            class="text-left"
            min="0"
          />
        </b-col>
        <b-col>
          <TextInputWithValidation
            rules="required"
            type="number"
            label="Beds:"
            name="Beds"
            v-model="infoInput.regularBedCount"
            class="text-left"
            min="0"
          />
        </b-col>
        <b-col>
          <TextInputWithValidation
            rules="required"
            type="number"
            label="Ventilators:"
            name="Ventilators"
            v-model="infoInput.ventilatorCount"
            class="text-left"
            min="0"
          />
        </b-col>
      </b-row>

      <h4 class="mt-5">ER Waiting Room</h4>
      <hr />
      <b-row class="mt-4">
        <b-col>
          <RangeWithValidation
            rules="required"
            type="range"
            :label="
              'Approx. ER Waiting Time' +
                (infoInput.erWaitTime ? ` (${infoInput.erWaitTime} hours)` : '')
            "
            name="ER Waiting Time"
            v-model="infoInput.erWaitTime"
            min="0"
            max="8"
            step="0.25"
          />
        </b-col>
        <b-col>
          <TextInputWithValidation
            rules="required"
            type="number"
            label="Patients Waiting:"
            name="Patients Waiting"
            v-model="infoInput.patientsWaitingCount"
            class="text-left"
            min="0"
          />
        </b-col>
      </b-row>

      <ButtonWithSpinner
        :loading="loading"
        text="Submit"
        class="pt-3 text-center"
      />

      <b-form-group>
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </b-form-group>
    </b-form>
  </ValidationObserver>
</template>

<script>
import InfoInput from '../../models/infoInput';

import { ValidationObserver } from 'vee-validate';
import TextInputWithValidation from './inputs/TextInputWithValidation';
import RangeWithValidation from './inputs/RangeWithValidation';
import ButtonWithSpinner from './buttons/ButtonWithSpinner';

import './vee-validate';

export default {
  name: 'InputInfoForm',
  components: {
    ValidationObserver,
    TextInputWithValidation,
    RangeWithValidation,
    ButtonWithSpinner,
  },
  data() {
    return {
      infoInput: new InfoInput({
        icuBedCount: null,
        regularBedCount: null,
        ventilatorCount: null,
        erWaitTime: null,
        patientsWaitingCount: null,
        userId: null,
        hospitalId: null,
      }),
      loading: false,
      message: '',
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;

      const { userId, hospitalId } = this.$store.getters['auth/jwtData'];
      this.infoInput.userId = userId;
      this.infoInput.hospitalId = hospitalId;

      try {
        if (
          this.infoInput.icuBedCount &&
          this.infoInput.regularBedCount &&
          this.infoInput.ventilatorCount &&
          this.infoInput.erWaitTime &&
          this.infoInput.patientsWaitingCount
        ) {
          await this.$api.post('hospitalinput', this.infoInput);
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.message =
          error.response.data.message ||
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },
  },
};
</script>

<style></style>
