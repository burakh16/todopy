<template>
   <v-app-bar app color="deep-purple" dark>
      <div class="d-flex align-center ml-5">
          <h2>TodoPy</h2>
      </div>

      <v-spacer></v-spacer>
      <v-btn text :to="{ name: 'Login' }" v-if="!isAuthenticated">Login</v-btn>
      <v-btn text class="pr-4" :to="{ name: 'Home' }" v-if="isAuthenticated"><v-icon class="mr-1">mdi-account</v-icon> {{getUser.name}}</v-btn>
    </v-app-bar>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
computed:{
    ...mapGetters(["isAuthenticated", "getUser"])
}
}
</script>

<style>

</style>