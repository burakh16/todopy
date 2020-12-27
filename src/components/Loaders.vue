<template>
  <v-progress-circular
    :size="70"
    :width="7"
    v-if="getLoading"
    color="purple"
    indeterminate
  ></v-progress-circular>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getLoading"]),
  },
};
</script>

<style>
</style>