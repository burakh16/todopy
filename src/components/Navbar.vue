<template>
  <v-app-bar app color="deep-purple" dark>
    <div class="d-flex align-center ml-5">
      <h2>TodoPy</h2>
    </div>

    <v-spacer></v-spacer>
    <v-btn text :to="{ name: 'Login' }" v-if="!isAuthenticated">Login</v-btn>
    <v-btn text :to="{ name: 'Register' }" v-if="!isAuthenticated"
      >Register</v-btn
    >
    <v-btn text class="pr-4 mr-3" :to="{ name: 'Home' }" v-if="isAuthenticated"
      ><v-icon class="mr-1">mdi-account</v-icon> {{ getUser.name }}</v-btn
    >
    <v-btn text class="pr-4" v-if="isAuthenticated" @click="onLogout"
      ><v-icon class="mr-1">mdi-logout</v-icon>Logout</v-btn
    >
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "getUser"]),
  },
  methods: {
    ...mapActions(["logout"]),
    async onLogout() {
      await this.logout();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
</style>