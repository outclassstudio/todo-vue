<template>
  <div class="to-do">
    <header-global></header-global>
    <div class="title">
      <div>Progress</div>
    </div>
    <background-box
      v-bind:todoitem="todofilter()"
      @edit-data="editData"
    ></background-box>
  </div>
</template>

<script>
import BackGround from "../components/Background";
import Header from "../components/Header.vue";

export default {
  name: "Progress-View",
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
        return el.status === "Progress";
      });
      return filtered;
    },
    editData(data) {
      this.$emit("edit-data", data);
    },
  },
};
</script>

<style>
.to-do {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  width: 240px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px 10px 0px;
}
</style>
