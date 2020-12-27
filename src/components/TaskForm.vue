<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <v-text-field
        outlined
        label="Title"
        dense
        v-model="task.title"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="py-0">
      <v-textarea
        outlined
        label="Description"
        dense
        v-model="task.description"
      ></v-textarea>
    </v-col>
    <v-col cols="12" class="py-0">
      <v-btn class="float-right pr-7" color="green" dark @click="onClick">
          <v-icon class="mr-1">mdi-check</v-icon>
          Save</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    task: {
      required: false,
      type: Object,
    },
  },
  methods:{
      onClick(){
          this.$emit("taskSaved", this.task)
      }
  }
};
</script>

<style>
</style>