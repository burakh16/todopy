<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :color="color"
      :dark="task.complated"
      class="h-30 white--text"
      :elevation="hover ? 8 : 2"
    >
      <v-card-text :class="['py-2 text-center', task.complated ? 'white--text' : '']">
        <h2>{{ task.title }}</h2></v-card-text
      >
      <v-divider :color="dividerColor"></v-divider>
      <v-card-text :class="['content', task.complated ? 'white--text' : '']"
        ><strong>{{ task.description }}</strong>
        <strong class="bottom-text">{{ task.created_at }}</strong>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    task: {
      default: Object,
      required: true,
    },
  },
  computed: {
    color() {
      return this.task.complated ? "green" : "";
    },
    dividerColor() {
      return this.task.complated ? "white" : "black";
    },
  },
};
</script>

<style>
.h-30 {
  height: 30vh;
}
.bottom-text {
  position: absolute;
  bottom: 1vh;
  left: 1vw;
}
</style>