<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        v-for="item in tabs"
        :key="item.value"
        @click="onChange(item.value)"
      >
        {{ item.text }}
        <v-icon>{{ item.icon }}</v-icon>
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      tabs: [
        { value: undefined, text: "All", icon: "mdi-calendar-check" },
        { value: false, text: "Not Complated", icon: "mdi-calendar-blank" },
        { value: true, text: "Complated", icon: "mdi-check" },
      ],
    };
  },
  methods: {
    onChange(tab) {
      this.$emit("tabChanged", tab);
    },
  },
};
</script>

<style>
</style>