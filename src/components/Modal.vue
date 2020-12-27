<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card>
      <v-card-text class="pt-2 pb-3 px-0">
        <v-btn text class="float-right red--text" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text>
        <v-divider class="mt-7 mb-6"></v-divider>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dialog: {
      default: true,
      type: Boolean,
    },
  },
  methods: {
    close() {
      this.$emit("dialogClosed")
    },
  },
};
</script>

<style>
</style>