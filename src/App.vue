<template>
  <div>
    <header-global></header-global>
    <router-view
      v-bind:todoitem="item"
      @add-data="addData"
      @edit-data="editData"
      @delete-data="deleteData"
    ></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",

  data: function () {
    return {
      item: [],
    };
  },

  components: {
    "header-global": Header,
  },

  methods: {
    //데이터 추가 함수
    addData(data) {
      this.item.push(data);
      alert("저장완료!");
    },

    //데이터 수정 함수
    editData(data) {
      //*id로 데이터 필터링
      let filtered = this.item.filter((el) => {
        return el.id !== data.id;
      });

      //*수정된 데이터 푸시 후 정렬
      filtered.push(data);
      filtered.sort((a, b) => {
        return a.id - b.id;
      });

      //*기존 데이터 업데이트
      this.item = filtered;
      alert("수정완료!");
    },

    //데이터 삭제 함수
    deleteData(data) {
      //*아이디로 데이터 필터링(제거)
      let filtered = this.item.filter((el) => {
        return el.id !== data;
      });

      //*기존데이터 업데이트
      this.item = filtered;
      alert("삭제완료!");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
