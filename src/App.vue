<template>
  <div>
    <router-view
      v-bind:todoitem="item"
      @add-data="addData"
      @update="addData"
      @editData="editData"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      item: [
        // {
        //   id: 0,
        //   title: "임시",
        //   contents: {
        //     todo: "투두투두",
        //     progress: "",
        //     done: "",
        //   },
        //   status: "todo",
        //   updatedDate: "2022-03-11",
        // },
      ],
    };
  },
  methods: {
    addData(data) {
      this.item.push(data);
      alert("저장완료!");
    },
    edittData(data) {
      //해당 데이터를 삭제후 업데이트
      //splice사용
      let filtered = this.item.filter((el) => {
        el.id !== data.id;
      });
      filtered.push(data);
      filtered.sort((a, b) => {
        return a.id - b.id;
      });
      this.item = filtered;
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
