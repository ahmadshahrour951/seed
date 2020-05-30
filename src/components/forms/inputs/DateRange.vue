<template>
  <b-form-group label="Date Range" for="date-range">
    <date-range-picker
      id="date-range"
      ref="picker"
      v-model="dateRange"
      :auto-apply="true"
      class="mb-2 w-100"
      :locale-data="{
        firstDay: 0,
      }"
    >
      <template v-slot:input="picker" style="min-width: 350px;">
        {{ formatDate(picker) }}
      </template>
    </date-range-picker>
  </b-form-group>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import moment from 'moment';

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  components: {
    DateRangePicker,
  },
  computed: {
    dateRange: {
      get() {
        return this.value;
      },
      set(dateRange) {
        this.$emit('input', dateRange);
      },
    },
  },
  methods: {
    formatDate(picker) {
      if (picker.startDate && picker.endDate) {
        return `${moment(picker.startDate).format('MMM Do YYYY')} -
        ${moment(picker.endDate).format('MMM Do YYYY')}`;
      } else {
        return 'Select a date range..';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-daterange-picker ::v-deep td.active:hover,
.vue-daterange-picker ::v-deep td.active {
  background-color: #2b7a78;
  border-color: transparent;
  color: #fff;
}

.vue-daterange-picker ::v-deep li.active {
  background-color: #2b7a78;
  color: #fff;
}
</style>
