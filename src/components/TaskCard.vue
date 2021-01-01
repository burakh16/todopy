<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :color="color"
      :dark="task.complated"
      class="h-30 white--text"
      :elevation="hover ? 8 : 2"
    >
      <v-card-text
        :class="['py-2 text-center px-0', task.complated ? 'white--text' : '']"
      >
        <h2>{{ task.title }}</h2>
      </v-card-text>
      <v-divider :color="dividerColor"></v-divider>
      <v-card-text :class="['content', task.complated ? 'white--text' : '']">
        <strong>{{ task.description }}</strong>
        <div class="bottom">
          <v-row>
            <v-col cols="12" md="6">
              {{ task.created_at }}
            </v-col>
            <v-col cols="12" md="6">
              <v-btn class="" small color="green" dark @click="taskComplated" v-if="!task.complated">
                <v-icon>mdi-check</v-icon>
                Complated
              </v-btn>
            </v-col>
          </v-row>
        </div>
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
  methods: {
    taskComplated() {
      this.$emit("taskComplated", this.task);
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
.bottom {
  position: absolute;
  bottom: 1vh;
}
</style>