<template>
  <v-card>
    <v-card-title class="pb-1">Sign Up</v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="12" class="mb-2">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="11" class="py-0">
          <v-text-field
            outlined
            label="Username"
            dense
            v-model="user.username"
            required
            :error-messages="usernameErrors"
            @input="$v.user.username.$touch()"
            @blur="$v.user.username.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="11" class="py-0">
          <v-text-field
            outlined
            label="Name"
            dense
            v-model="user.name"
            required
            :error-messages="nameErrors"
            @input="$v.user.name.$touch()"
            @blur="$v.user.name.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="11" class="py-0">
          <v-text-field
            outlined
            label="Password"
            dense
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            v-model="user.password"
            required
            :error-messages="passwordErrors"
            @input="$v.user.password.$touch()"
            @blur="$v.user.password.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="11" class="py-0">
          <v-btn class="float-right pr-7" color="green" dark @click="onClick">
            <v-icon class="mr-1">mdi-check</v-icon>
            Save</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      user: {
        username: "",
        name: "",
        password: "",
      },
      show: false,
    };
  },
  validations: {
    user: {
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(50),
      },
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(50),
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(25),
        strongPassword(password) {
          return (
            /[A-Z]/.test(password) && // checks for a-z
            /[0-9]/.test(password) // checks for 0-9
          );
        },
      },
    },
  },
  methods: {
    ...mapActions(["register"]),
    async onClick() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      const result = await this.register(this.user);
      if (result) this.$router.push({ name: "Home" });
    },
    onClose() {
      this.user.username = "";
      this.user.name = "";
      this.$v.$reset();
    },
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.user.username.$dirty) return errors;

      !this.$v.user.username.minLength &&
        errors.push(
          `Username must be at least ${this.$v.user.username.$params.minLength.min} characters long`
        );
      !this.$v.user.username.maxLength &&
        errors.push(
          `Username must be at most ${this.$v.user.username.$params.maxLength.max} characters long`
        );
      !this.$v.user.username.required && errors.push("Username is required.");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.user.name.$dirty) return errors;
      !this.$v.user.name.minLength &&
        errors.push(
          `Name must be at least ${this.$v.user.name.$params.minLength.min} characters long`
        );
      !this.$v.user.name.maxLength &&
        errors.push(
          `Name must be at most ${this.$v.user.name.$params.maxLength.max} characters long`
        );
      !this.$v.user.name.required && errors.push("Name is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.required && errors.push("Password is required.");
      !this.$v.user.password.minLength &&
        errors.push(
          `Password must be at least ${this.$v.user.password.$params.minLength.min} characters long`
        );
      !this.$v.user.password.maxLength &&
        errors.push(
          `Password must be at most ${this.$v.user.password.$params.maxLength.max} characters long`
        );
      !this.$v.user.password.strongPassword &&
        errors.push(
          "Password contains at least one uppercase letter and number."
        );
      return errors;
    },
  },
};
</script>

<style>
</style>