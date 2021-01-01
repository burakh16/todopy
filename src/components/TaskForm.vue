<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <v-text-field
        outlined
        label="Title"
        dense
        v-model="task.title"
        required
        :error-messages="titleErrors"
        @input="$v.task.title.$touch()"
        @blur="$v.task.title.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="py-0">
      <v-textarea
        outlined
        label="Description"
        dense
        v-model="task.description"
        required
        :error-messages="descriptionErrors"
        @input="$v.task.description.$touch()"
        @blur="$v.task.description.$touch()"
      ></v-textarea>
    </v-col>
    <v-col cols="12" class="py-0">
      <v-btn class="float-right pr-7" color="green" dark @click="onClick">
        <v-icon class="mr-1">mdi-check</v-icon>
        Save</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {};
  },
  mixins: [validationMixin],
  props: {
    task: {
      required: false,
      type: Object,
    },
  },
  validations: {
    task: {
      title: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(30),
      },
      description: {
        required,
        minLength: minLength(5),
      },
    },
  },
  methods: {
    onClick() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.$emit("taskSaved", this.task);
    },
    onClose() {
      this.task.title = "";
      this.task.description = "";
      this.$v.$reset();
    },
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.task.title.$dirty) return errors;
      !this.$v.task.title.maxLength &&
        errors.push(
          `Title must be at most ${this.$v.task.title.$params.maxLength.max} characters long`
        );
      !this.$v.task.title.minLength &&
        errors.push(
          `Title must be at least ${this.$v.task.title.$params.minLength.min} characters long`
        );
      !this.$v.task.title.required && errors.push("Title is required.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.task.description.$dirty) return errors;
      !this.$v.task.description.minLength &&
        errors.push(
          `Description must be at least ${this.$v.task.description.$params.minLength.min} characters long`
        );
      !this.$v.task.description.required &&
        errors.push("Description is required.");
      return errors;
    },
  },
};
</script>

<style>
</style>