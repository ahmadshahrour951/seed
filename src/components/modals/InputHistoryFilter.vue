<template>
  <b-modal
    id="input-history-filter"
    title="Filter"
    ok-title="Apply"
    cancel-title="Clear"
    @ok="handleOk"
    @show="handleShow"
    @cancel="handleClear"
  >
    <InputHistoryFilterForm v-model="form" />
  </b-modal>
</template>

<script>
import InputHistoryFilterForm from '@/components/forms/InputHistoryFilterForm';
export default {
  props: {
    handleFetch: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      form: {
        dateRange: {
          startDate: null,
          endDate: null,
        },
        users: [],
      },
    };
  },
  components: {
    InputHistoryFilterForm,
  },
  methods: {
    handleShow() {
      const { dateRange, users } = this.$store.state.history.filters;
      this.form.dateRange = { ...dateRange };
      this.form.users = [...users.selected];
    },
    handleOk() {
      this.$store.commit('history/storeSelectedUsers', this.form.users);
      this.$store.commit('history/storeDateRange', this.form.dateRange);
      this.handleFetch();
    },
    handleClear(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.form.dateRange.startDate = null;
      this.form.dateRange.endDate = null;
      this.form.users = [];
    },
  },
};
</script>

<style></style>
