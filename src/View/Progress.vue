<template>
  <div class="to-do">
    <div class="title">
      <div>Progress</div>
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

export default {
  name: "Progress-View",
  data: function () {
    return {
      modalopen: false,
    };
  },
  components: {
    "background-box": BackGround,
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
  width: 300px;
  height: 25px;
  display: flex;
  justify-content: left;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px 10px 0px;
}
</style>
