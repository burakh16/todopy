<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card>
      <v-card-title
        >{{ title }}
        <v-btn text class="top-right red--text" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-divider class="mb-5"></v-divider>
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
    title: {
      default: "",
      required: false,
    },
  },
  methods: {
    close() {
      this.$emit("dialogClosed");
    },
  },
};
</script>

<style>
.top-right {
  position: absolute;
  right: 0;
  top: 1vh;
}
</style>