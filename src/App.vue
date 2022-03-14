<template>
  <div>
    <router-view
      v-bind:todoitem="item"
      @add-data="addData"
      @edit-data="editData"
      @delete-data="deleteData"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      item: [],
    };
  },
  methods: {
    addData(data) {
      this.item.push(data);
      alert("저장완료!");
    },
    editData(data) {
      //해당 데이터를 삭제후 업데이트
      let filtered = this.item.filter((el) => {
        return el.id !== data.id;
      });

      filtered.push(data);
      filtered.sort((a, b) => {
        return a.id - b.id;
      });
      this.item = filtered;
      alert("수정완료!");
    },
    deleteData(data) {
      let filtered = this.item.filter((el) => {
        return el.id !== data;
      });
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
