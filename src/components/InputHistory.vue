<template>
  <b-container class="col-xl-10">
    <b-card class="shadow" style="height: 75vh">
      <b-card-header style="background-color: transparent">
        <b-row>
          <b-col>
            <b-card-title style="display: inline" title-tag="h2"
              >Input History</b-card-title
            >
          </b-col>
          <b-col>
            <div class="w-100 text-right">
              <b-button variant="primary" @click="fetchData">
                <b-icon icon="arrow-repeat" font-scale="1.5">></b-icon>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-card-header>
      <div
        :class="[loading ? 'd-flex' : 'd-none', 'align-items-center', 'h-100']"
      >
        <b-spinner
          label="Loading..."
          variant="primary"
          class="m-auto"
          style="width: 3rem; height: 3rem;"
        ></b-spinner>
      </div>

      <b-table
        v-show="!loading"
        id="input_history"
        :items="items"
        :fields="fields"
        primary-key="id"
        responsive
        sticky-header="55vh"
        :sort-by="'createdAt'"
        :sort-desc="true"
        :sort-compare="sortCompare"
      >
      </b-table>

      <h3
        v-show="!loading && !items.length"
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
  </b-container>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      loading: false,
      items: [],
      fields: [
        {
          key: 'fullName',
          label: 'User',
          sortable: true,
        },
        {
          key: 'icuBedCount',
          label: 'ICUs Vacant',
          sortable: true,
        },
        {
          key: 'regularBedCount',
          label: 'Beds Vacant',
          sortable: true,
        },
        {
          key: 'ventilatorCount',
          label: 'Ventilators Vacant',
          sortable: true,
        },
        {
          key: 'erWaitTime',
          label: 'ER Wait Time',
          sortable: true,
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
        const { hospitalId } = this.$store.getters['auth/jwtData'];
        const res = await this.$api.get(`hospitalinput/${hospitalId}`);
        res.data.data.forEach((x) => {
          x.createdAt = moment(x.createdAt).format('MMMM Do YYYY, h:mm a');
          x.fullName = `${x.user.firstName} ${x.user.lastName}`;
        });
        this.items = res.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    handleAddEntry() {
      this.$router.push({ name: 'AddInput' });
    },
    sortCompare(
      aRow,
      bRow,
      key,
      sortDesc,
      formatter,
      compareOptions,
      compareLocale
    ) {
      const a = aRow[key]; // or use Lodash `_.get()`
      const b = bRow[key];
      if (typeof a === 'number' && typeof b === 'number') {
        // If both compared fields are native numbers
        return a < b ? -1 : a > b ? 1 : 0;
      } else if (
        moment(a, 'MMMM Do YYYY, h:mm a').isValid() &&
        moment(b, 'MMMM Do YYYY, h:mm a').isValid()
      ) {
        // If both compared fields are dates
        const ai = moment(a, 'MMMM Do YYYY, h:mm a');
        const bi = moment(b, 'MMMM Do YYYY, h:mm a');
        return ai.isBefore(bi) ? -1 : ai.isAfter(bi) ? 1 : 0;
      } else {
        // Otherwise stringify the field data and use String.prototype.localeCompare
        return toString(a).localeCompare(
          toString(b),
          compareLocale,
          compareOptions
        );
      }
    },
    toString(value) {
      if (value === null || typeof value === 'undefined') {
        return '';
      } else if (value instanceof Object) {
        return Object.keys(value)
          .sort()
          .map((key) => toString(value[key]))
          .join(' ');
      } else {
        return String(value);
      }
    },
  },
};
</script>
0
<style></style>
