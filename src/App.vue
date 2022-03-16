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
      // alert("저장완료!");
    },

    //데이터 수정 함수
    editData(data) {
      //!정렬 : Status에 따라 분기를 나눠서 다르게 정렬
      //*아이디가 일치하는 이슈 찾기
      let findItem = this.item.filter((el) => {
        return el.id === data.id;
      });

      //*데이터 수정시 status의 변동여부 체크, 같으면 true, 다르면 false
      let compareStatus = () => {
        if (findItem[0].status === data.status) return true;
        else return false;
      };

      //*일치하는 이슈의 인데스만 뽑아내기
      let findIdx;
      this.item.forEach((el) => {
        if (el.id === data.id) {
          findIdx = el.id;
        }
      });

      //*id로 데이터 필터링 : 수정전 데이터 제거
      let filtered = this.item.filter((el) => {
        return el.id !== data.id;
      });

      //*Status에 따른 데이터 정렬
      if (compareStatus()) {
        //? Status의 변화가 없으면 원래 위치로
        filtered.splice(findIdx, 0, data);
      } else {
        //? Status변경시 뒤로
        filtered.push(data);
      }

      //*데이터 업데이트
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
