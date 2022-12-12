<template>
  <div class="to-do">
    <div class="title">
      <div>Progress</div>
    </div>
    <background-box
      v-bind:todoitem="todofilter()"
      v-bind:status="status"
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
      status: "Progress",
    };
  },

  components: {
    "background-box": BackGround,
  },

  props: { todoitem: Array },

  computed: {
    issues() {
      return this.$store.state.issues;
    },
  },

  methods: {
    //현재 상태에 해당하는 데이터 추출
    todofilter() {
      const filtered = this.issues.filter(
        (issue) => issue.status === "Progress"
      );
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
  margin-bottom: 20px;
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
