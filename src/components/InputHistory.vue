<template>
  <b-container class="col-xl-10">
    <b-card class="shadow" style="min-height: 75vh">
      <b-card-header style="background-color: transparent">
        <b-row>
          <b-col>
            <b-card-title style="display: inline" title-tag="h2"
              >History</b-card-title
            >
          </b-col>
          <b-col>
            <div class="w-100 text-right">
              <b-button
                :variant="filterButtonVariant"
                class="mr-2"
                @click="$bvModal.show('input-history-filter')"
              >
                <b-icon icon="filter" font-scale="1.5"></b-icon>
              </b-button>
              <b-button variant="outline-primary" @click="fetchData">
                <b-icon icon="arrow-repeat" font-scale="1.5"></b-icon>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-card-header>
      <div
        :class="[loading ? 'd-flex' : 'd-none', 'align-items-center']"
        style="height: 53vh !important;"
      >
        <b-spinner
          label="Loading..."
          variant="primary"
          class="m-auto"
          style="width: 3rem; height: 3rem;"
        ></b-spinner>
      </div>

      <b-table
        v-show="!loading && tableItems.length"
        id="input_history"
        :items="tableItems"
        :fields="fields"
        primary-key="id"
        responsive
        sticky-header="53vh"
        style="height: 53vh"
        :sort-by="'createdAt'"
        :sort-desc="true"
        :sort-compare="sortCompare"
        :per-page="perPage"
        :current-page="currentPage"
      >
      </b-table>

      <b-pagination
        v-show="!loading && tableItems.length"
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        class="m-0"
      >
      </b-pagination>

      <h3
        v-show="!loading && !tableItems.length"
        class="text-muted text-center mt-5"
      >
        No Data to Show
      </h3>
    </b-card>
    <div class="text-center pb-5">
      <b-button
        variant="primary"
        size="lg"
        class="shadow w-50"
        @click="handleAddEntry"
        >Add New Entry</b-button
      >
    </div>
    <InputHistoryFilter :handleFetch="fetchData" />
  </b-container>
</template>

<script>
import InputHistoryFilter from './modals/InputHistoryFilter';
import sortCompare from '@/utils/tables/sortCompare.js';

export default {
  components: {
    InputHistoryFilter,
  },
  data() {
    return {
      perPage: 9,
      currentPage: 1,
      loading: false,
      fields: [
        {
          key: 'fullName',
          label: 'User',
        },
        {
          key: 'icuBedCount',
          label: 'ICUs Vacant',
        },
        {
          key: 'regularBedCount',
          label: 'Beds Vacant',
        },
        {
          key: 'ventilatorCount',
          label: 'Ventilators Vacant',
        },
        {
          key: 'erWaitTime',
          label: 'ER Wait Time',
        },
        {
          key: 'createdAt',
          label: 'Date Time',
          sortable: true,
        },
      ],
    };
  },
  created() {
    if (this.loggedIn) this.fetchData();
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    tableItems() {
      return this.$store.getters['history/tableItems'];
    },
    filterButtonVariant() {
      return this.$store.getters['history/isFiltersEmpty']
        ? 'outline-primary'
        : 'primary';
    },
    rows() {
      return this.tableItems.length;
    },
  },
  watch: {
    loggedIn(val) {
      if (val) this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        await this.$store.dispatch('history/fetchInputs', { api: this.$api });
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    handleAddEntry() {
      this.$router.push({ name: 'AddInput' });
    },
    sortCompare,
  },
};
</script>
0
<style></style>
