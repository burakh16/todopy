<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="11" lg="8">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",

  components: { Navbar },

  data: () => ({
    //
  }),
};
</script>

<style>
.content {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}
</style>