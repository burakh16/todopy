<template>
  <div class="text-center">
    <v-pagination
      v-model="currentPage"
      :length="numberOfPages"
      :total-visible="10"
      @input="next"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
        currentPage: this.page
    };
  },
  props: {
    numberOfPages: {
      default: 1,
      required: true,
    },
    page: {
      default: 1,
      required: true,
    },
  },
  methods: {
    next(page) {
      this.$emit("page_changed", page);
    },
  },
};
</script>

<style>
</style>