import idb from "@/api/idb";
import { createStore } from "vuex";

export default createStore({
  //전역으로 관리하고 싶은 스테이트를 만든다
  state: {
    issues: [],
    deletedId: [],
    prevPosition: 0,
    currentPosition: 0,
    dif: 0,
  },

  getters: {},

  //state를 변경하는 함수
  mutations: {
    //데이터 추가 함수
    async addData(state, data) {
      console.log("데이터 체크", data);
      state.issues.push(data);
      await idb.addData(data);
      // alert("저장완료!");
    },

    //데이터 수정 함수
    editData(state, data) {
      //!정렬 : Status에 따라 분기를 나눠서 다르게 정렬
      //*아이디가 일치하는 이슈 찾기
      let findItem = state.issues.find((el) => {
        return el.id === data.id;
      });

      //*데이터 수정시 status의 변동여부 체크, 같으면 true, 다르면 false
      let compareStatus = () => {
        if (findItem.status === data.status) return true;
        else return false;
      };

      //*수정하려는 이슈의 인데스 뽑아내기
      let findIdx = state.issues.indexOf(findItem);

      //*id로 데이터 필터링 : 수정전 데이터 제거
      let filtered = state.issues.filter((el) => {
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
      state.issues = filtered;
      // alert("수정완료!");
    },

    //데이터 이동함수
    moveData(state, data) {
      //*현재 데이터
      let currentData = state.issues.filter((el) => {
        return el.id === Number(data.currentId);
      });

      //*현재 데이터 제거
      let filtered = state.issues.filter((el) => {
        return el.id !== Number(data.currentId);
      });

      //*이동하고 싶은 쪽 데이터
      let movingTargetData = state.issues.filter((el) => {
        return el.id === Number(data.movingTargetId);
      });

      //*이동하고 싶은 곳의 인덱스
      let idx = state.issues.indexOf(movingTargetData[0]);

      //*이동하고 싶은 곳으로 현재데이터 추가
      filtered.splice(idx, 0, currentData[0]);

      //*데이터 업데이트
      state.issues = filtered;
    },

    //데이터 삭제 함수
    deleteData(state, data) {
      //*아이디 저장(신규생성시 점검용)
      state.deletedId.push(data);
      idb.deleteData(data);

      //*아이디로 데이터 필터링(제거)
      let filtered = state.issues.filter((el) => {
        return el.id !== data;
      });

      //*기존데이터 업데이트
      state.issues = filtered;
      alert("삭제완료!");
    },
  },
  actions: {},
  modules: {},
});
