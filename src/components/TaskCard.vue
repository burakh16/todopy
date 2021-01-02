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
      <v-card-text :class="task.complated ? 'white--text' : ''">
        <strong class="content">{{ task.description }}</strong>
        <div class="bottom">
          <v-row class="text-md-body-2 text-caption">
            <v-col cols="12" sm="6" class="py-0">
              <label>Created At:</label>
              <p class="mb-0 font-weight-bold">
                {{ task.created_at | formatDate }}
              </p>
            </v-col>
            <v-col cols="12" sm="6" class="py-0" v-if="task.complated">
              <label>Complated At:</label>
              <p class="mb-0 font-weight-bold">
                {{ task.complated_at | formatDate }}
              </p>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-btn
                small
                color="green"
                dark
                block
                @click="taskComplated"
                :disabled="task.complated"
              >
                <v-icon class="mr-1">mdi-check</v-icon>
                {{ task.complated ? "Complated" : "Complate" }}
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
  width: 90%;
}
</style>