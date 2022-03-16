<template>
  <div class="to-do">
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

export default {
  name: "Done-View",

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
    //현재 상태에 해당하는 데이터 추출
    todofilter() {
      let filtered = this.todoitem.filter((el) => {
        return el.status === "Done";
      });
      return filtered;
    },

    //데이터 수정 함수
    editData(data) {
      this.$emit("edit-data", data);
    },

    //데이터 삭제 함수
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
