import idb from "@/api/idb";
import { createStore } from "vuex";

export default createStore({
  state: {
    issues: [],
    deletedId: [],
    prevPosition: 0,
    currentPosition: 0,
    dif: 0,
  },

  getters: {},

  mutations: {
    /** 데이터 불러오기 함수 */
    async getData(state, data) {
      const issue = state.issues.find((issue) => issue.id === data.id);
      if (!issue) {
        state.issues.push(data);
      }
    },

    /** 데이터 추가 함수 */
    async addData(state, data) {
      const issue = state.issues.find((issue) => issue.id === data.id);
      if (!issue) {
        state.issues.push(data);
        await idb.addData(data);
      }
    },

    /** 데이터 수정 함수 */
    editData(state, data) {
      //!정렬 : Status에 따라 분기를 나눠서 다르게 정렬
      //*아이디가 일치하는 이슈 찾기
      const findItem = state.issues.find((el) => el.id === data.id);

      //*데이터 수정시 status의 변동여부 체크, 같으면 true, 다르면 false
      const compareStatus = () => {
        if (findItem.status === data.status) return true;
        return false;
      };

      //*수정하려는 이슈의 인데스 뽑아내기
      const findIdx = state.issues.indexOf(findItem);

      //*id로 데이터 필터링 : 수정전 데이터 제거
      const filtered = state.issues.filter((el) => {
        return el.id !== data.id;
      });

      //*Status에 따른 데이터 정렬
      if (compareStatus()) {
        //? Status의 변화가 없으면 원래 위치로
        filtered.splice(findIdx, 0, data);
      } else {
        //? Status변경시 뒤로
        //todo 여기서 아이디를 바꿔줘야함
        idb.clearData();
        filtered.push(data);
        filtered.forEach((issue, idx) => {
          issue.id = idx;
        });
      }

      //*데이터 업데이트
      filtered.forEach((issue) => idb.editData(issue));
      state.issues = filtered;
    },

    /** 데이터 이동함수 */
    moveData(state, data) {
      //*현재 데이터
      const currentData = state.issues.find(
        (el) => el.id === Number(data.currentId)
      );

      //*이동하고 싶은 쪽 데이터
      const movingTargetData = state.issues.find(
        (el) => el.id === Number(data.movingTargetId)
      );

      //*현재 데이터 제거
      const filtered = state.issues
        .filter((el) => el.id !== Number(data.currentId))
        .filter((el) => el.id !== Number(data.movingTargetId));

      //*아이디 바꾸기
      [currentData.id, movingTargetData.id] = [
        movingTargetData.id,
        currentData.id,
      ];

      filtered.push(currentData, movingTargetData);
      filtered.sort((a, b) => a.id - b.id);

      //*데이터 업데이트
      state.issues = filtered;
    },

    /** 데이터 삭제 함수 */
    deleteData(state, data) {
      //*아이디 저장(신규생성시 점검용)
      state.deletedId.push(data);

      //*아이디로 데이터 필터링(제거)
      const filtered = state.issues.filter((el) => {
        return el.id !== data;
      });

      //*기존데이터 업데이트
      idb.deleteData(data);
      state.issues = filtered;
    },

    /** 데이터 전체 삭제 */
    clearData() {
      idb.clearData();
      //todo 새로고침 말고 다른 방법 고민
      window.location.reload();
    },
  },
  actions: {},
  modules: {},
});
