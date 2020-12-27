<template>
  <v-row>
    <v-col cols="12">
      <TaskTabs @tabChanged="onTabChanged" />
    </v-col>
    <v-col cols="12">
      <v-hover v-slot="{ hover }">
        <v-btn
          block
          outlined
          color="deep-purple"
          :class="hover ? 'deep-purple' : ''"
          @click="onClick"
        >
          <v-icon x-large :class="hover ? 'white--text' : ''">mdi-plus</v-icon>
        </v-btn>
      </v-hover>
    </v-col>
    <v-col cols="12" v-if="!getLoading && anyTask">
      <v-row>
        <v-col cols="4" v-for="(item, index) in getTasks" :key="index">
          <TaskCard :task="item" />
        </v-col>
        <v-col cols="12">
          <Pagination
            :page="getPagination.current_page"
            :numberOfPages="getPagination.num_pages"
            @page_changed="onPageChanged"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" v-if="!anyTask"> yok </v-col>
    <v-col cols="12" class="text-center">
      <Loading />
    </v-col>
    <Modal :dialog="dialog" @dialogClosed="onDialogClosed">
      <TaskForm :task="task" @taskSaved="onTaskSaved" />
    </Modal>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Modal from "@/components/Modal.vue";
import TaskCard from "@/components/TaskCard.vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskTabs from "@/components/TaskTabs.vue";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loaders.vue";

export default {
  name: "Home",
  components: { TaskCard, TaskTabs, Pagination, Loading, TaskForm, Modal },
  data() {
    return {
      complated: undefined,
      page: 1,
      dialog: false,
      task: {},
    };
  },
  computed: {
    ...mapGetters(["getTasks", "getPagination", "getLoading"]),
  },
  methods: {
    ...mapActions(["get_tasks", "add_task", "set_loading"]),
    async onTabChanged(tab) {
      this.complated = tab;
      this.page = 1;
      await this.loadData();
    },
    async loadData() {
      this.set_loading(true);
      await this.get_tasks({
        complated: this.complated,
        page: this.page,
      });
      this.set_loading(false);
    },
    onPageChanged(page) {
      this.page = page;
      this.loadData();
    },
    anyTask() {
      return this.getTasks.length > 0 ? true : false;
    },
    onDialogClosed() {
      this.dialog = false;
    },
    onClick() {
      this.dialog = true;
    },
    async onTaskSaved(task) {
      await this.add_task(task);
    },
  },
  async created() {
    await this.loadData();
  },
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>