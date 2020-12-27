<template>
  <v-row justify="center">
    <v-col cols="12" md=8 lg=6>
      <v-card outlined>
        <v-card-title class="py-0">
          <v-row>
            <v-col cols="12">
              Login
              <v-divider class="my-1"></v-divider>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form lazy-validation @submit.prevent="onLoginClick">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="user.username"
                  :rules="nameRules"
                  label="Username"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="user.password"
                  :rules="nameRules"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-btn
                  outlined
                  color="blue-grey"
                  type="submit"
                  class="float-right"
                  >Login</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "admin",
        password: "1234"
      },
      nameRules: [v => !!v || "This field is required"],
      valid: false
    };
  },
  methods: {
    ...mapActions(["login"]),
    onLoginClick() {
      this.login(this.user).then(()=>{
        if(this.isAuthenticated)
          this.$router.push('/')
      });
    }
  },
  computed: {
    ...mapGetters(["getUser", "isAuthenticated"])
  }
};
</script>

<style>
</style>