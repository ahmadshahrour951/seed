<template>
  <div class="h-100" style="background-color: #2b7a78 ">
    <div class="container h-100">
      <b-row class="h-100">
        <b-card
          class="shadow col-9 col-sm-9 col-md-7 col-lg-5 col-xl-4 mx-auto my-auto text-center"
          style="min-width: 340px;"
        >
          <b-card-title title-tag="h2">Covid Optimize</b-card-title>
          <hr />
          <b-card-body>
            <EmailPasswordForm />
          </b-card-body>
        </b-card>
      </b-row>
    </div>
  </div>
</template>

<script>
import EmailPasswordForm from './forms/EmailPasswordForm';
export default {
  components: {
    EmailPasswordForm,
  },
};
</script>

<style></style>
