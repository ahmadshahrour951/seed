<template>
  <div>
    <DateRange v-model="formProp.dateRange" />
    <DropdownTags v-model="formProp.users" />
  </div>
</template>

<script>
import DateRange from './inputs/DateRange';
import DropdownTags from './dropdowns/DropdownTags';

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  components: {
    DateRange,
    DropdownTags,
  },
  computed: {
    formProp: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('input', newVal);
      },
    },
  },
};
</script>

<style></style>
