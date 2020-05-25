<template>
  <b-modal
    id="confirm-add-entry"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    centered
    ok-title="Yes"
    cancel-title="No"
    @ok="handleSubmit"
    title="Are you sure?"
  >
    Please note the accuracy of your entry is vital to Covid Optimize since it
    will be reflected across all stakeholders using the platform.
  </b-modal>
</template>

<script>
export default {
  props: ['handleSubmit'],
};
</script>

<style></style>
