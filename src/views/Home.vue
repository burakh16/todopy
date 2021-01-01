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
          <TaskCard :task="item" @taskComplated="onTaskComplated" />
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
    <v-col cols="12" v-if="!anyTask">
      <v-alert outlined color="purple">
        <div class="title text-center">There is no task!</div>
      </v-alert>
    </v-col>
    <v-col cols="12" class="text-center">
      <Loading />
    </v-col>
    <Dialog :dialog="dialog" title="New Task" @dialogClosed="onDialogClosed">
      <TaskForm :task="task" @taskSaved="onTaskSaved" ref="taskForm" />
    </Dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Dialog from "@/components/Dialog.vue";
import TaskCard from "@/components/TaskCard.vue";
import TaskForm from "@/components/TaskForm.vue";
import TaskTabs from "@/components/TaskTabs.vue";
import Pagination from "@/components/Pagination.vue";
import Loading from "@/components/Loaders.vue";

export default {
  name: "Home",
  components: { TaskCard, TaskTabs, Pagination, Loading, TaskForm, Dialog },
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
    anyTask() {
      return this.getTasks.length > 0 ? true : false;
    },
  },
  methods: {
    ...mapActions(["get_tasks", "add_task", "complate_task", "set_loading"]),
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
    onDialogClosed() {
      this.dialog = false;
      this.$refs.taskForm.onClose();
    },
    onClick() {
      this.dialog = true;
    },
    async onTaskComplated(task) {
      await this.complate_task(task.id);
      this.$toast("You complated the task!");
    },
    async onTaskSaved(task) {
      const status = await this.add_task(task);
      console.log(status);
      if (status === 200) this.$toast("You complated the task!");
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