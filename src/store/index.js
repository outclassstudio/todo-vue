import { createStore } from "vuex";

export default createStore({
  state: {
    issues: [],
    deletedId: [],
  },

  getters: {},

  mutations: {
    //데이터 추가 함수
    addData(state, data) {
      state.issues.push(data);
      // alert("저장완료!");
    },

    //데이터 수정 함수
    editData(state, data) {
      //!정렬 : Status에 따라 분기를 나눠서 다르게 정렬
      //*아이디가 일치하는 이슈 찾기
      let findItem = state.issues.filter((el) => {
        return el.id === data.id;
      });

      //*데이터 수정시 status의 변동여부 체크, 같으면 true, 다르면 false
      let compareStatus = () => {
        if (findItem[0].status === data.status) return true;
        else return false;
      };

      //*일치하는 이슈의 인데스만 뽑아내기
      let findIdx;
      state.issues.forEach((el) => {
        if (el.id === data.id) {
          findIdx = el.id;
        }
      });

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
      alert("수정완료!");
    },

    //데이터 삭제 함수
    deleteData(state, data) {
      //*아이디 저장(신규생성시 점검용)
      state.deletedId.push(data);

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
