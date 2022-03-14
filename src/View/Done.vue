<template>
  <div class="to-do">
    <header-global></header-global>
    <div class="title">
      <div>Done</div>
    </div>
    <background-box
      v-bind:todoitem="todofilter()"
      @edit-data="editData"
      @delete-data="deleteData"
    ></background-box>
  </div>
</template>

<script>
import BackGround from "../components/Background";
import Header from "../components/Header.vue";

export default {
  name: "Done-View",
  data: function () {
    return {
      modalopen: false,
    };
  },
  components: {
    "background-box": BackGround,
    "header-global": Header,
  },
  props: { todoitem: Array },
  methods: {
    todofilter() {
      let filtered = this.todoitem.filter((el) => {
        return el.status === "Done";
      });
      return filtered;
    },
    editData(data) {
      this.$emit("edit-data", data);
    },
    deleteData(data) {
      this.$emit("delete-data", data);
    },
  },
};
</script>

<style scoped>
.to-do {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  width: 320px;
  height: 25px;
  display: flex;
  justify-content: left;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px 10px 0px;
}
</style>
