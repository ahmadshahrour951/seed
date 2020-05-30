<template>
  <b-form-group label="Users">
    <b-form-tags v-model="tagsSelectedOptions" no-outer-focus class="mb-2">
      <template v-slot="{ tags, addTag, removeTag }">
        <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
          <li v-for="tag in tags" :key="tag.id" class="list-inline-item">
            <b-form-tag
              @remove="onRemoveClick({ tag, removeTag })"
              :title="tag"
              variant="primary"
              >{{ tag }}</b-form-tag
            >
          </li>
        </ul>

        <b-dropdown
          size="sm"
          variant="outline-secondary"
          block
          menu-class="w-100"
        >
          <template v-slot:button-content>
            <b-icon icon="person-fill"></b-icon> Select users
          </template>
          <b-dropdown-form @submit.stop.prevent="() => {}">
            <b-form-group
              label-for="user-search-input"
              label="Search users"
              label-cols-md="auto"
              class="mb-0"
              label-size="sm"
              :description="searchDesc"
            >
              <b-form-input
                v-model="search"
                id="user-search-input"
                type="search"
                size="sm"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
          </b-dropdown-form>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button
            v-for="option in availableOptions"
            :key="option.id"
            @click="onOptionClick({ option, addTag })"
          >
            {{ option.fullName }}
          </b-dropdown-item-button>
          <b-dropdown-text v-if="availableOptions.length === 0">
            There are no users available to select
          </b-dropdown-text>
        </b-dropdown>
      </template>
    </b-form-tags>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.$store.dispatch('history/fetchHospitalUsers', { api: this.$api });
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    selectedOptions: {
      get() {
        return this.value;
      },
      set(users) {
        this.$emit('input', users);
      },
    },
    tagsSelectedOptions() {
      return this.value.map((x) => x.fullName);
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.$store.getters['history/avHospitalUsers'].filter(
        (opt) => this.tagsSelectedOptions.indexOf(opt.fullName) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.fullName.toLowerCase().indexOf(criteria) > -1
        );
      }
      // Show all options available
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no users matching your search criteria';
      }
      return '';
    },
  },
  methods: {
    onOptionClick({ option, addTag }) {
      addTag(option.fullName);
      this.selectedOptions.push(option);

      // this.$store.commit('history/addSelectUser', option);
      this.search = '';
    },
    onRemoveClick({ tag, removeTag }) {
      removeTag(tag);

      const removeIndex = this.selectedOptions.map((x) => x.id).indexOf(tag.id);

      this.selectedOptions.splice(removeIndex, 1);
      // this.$store.commit('history/removeSelectUser', tag);
    },
  },
};
</script>
