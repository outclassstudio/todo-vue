<template>
  <div class="main-div">
    <input
      type="text"
      class="quick-add-box"
      placeholder="이슈 제목을 입력해주세요!"
      v-model="baseData.title"
      @change="errMsgChange"
      @keyup.enter="addData"
    />
    <div class="btn-wrapper">
      <div class="error-msg" v-if="errorMsg">제목을 입력해주세요(필수)</div>
      <div class="add-btn" @click="closeQuickAdd">취소</div>
      <div class="add-btn save-btn" @click="addData">생성</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "quick-add",

  data: function () {
    return {
      baseData: {
        id: "",
        title: "",
        contents: {
          todo: "",
          progress: "",
          done: "",
        },
        status: "ToDo",
        updatedDate: "",
      },
      errorMsg: false,
    };
  },

  props: {
    modalopen: Boolean,
    todoitem: Array,
  },

  methods: {
    //데이터추가함수
    addData() {
      //*타이틀 없을 시 에러메시지 출력
      if (this.baseData.title === "") {
        this.errorMsg = true;
      } else if (this.baseData.status === "") {
        this.statusErrorMsg = true;
      } else {
        //*날짜생성
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        let day = ("0" + currentDate.getDate()).slice(-2);
        let hours = ("0" + currentDate.getHours()).slice(-2);
        let minutes = ("0" + currentDate.getMinutes()).slice(-2);
        let seconds = ("0" + currentDate.getSeconds()).slice(-2);
        let dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        this.baseData.updatedDate = dateString;

        //*신규id생성`
        let idArray = [];
        let newId;
        if (
          this.$store.state.issues.length !== 0 &&
          this.$store.state.deletedId.length !== 0
        ) {
          this.$store.state.deletedId.forEach((el) => {
            idArray.push(el);
          });
          this.$store.state.issues.forEach((el) => {
            idArray.push(el.id);
          });
          newId = Math.max(...idArray) + 1;
        } else if (
          this.$store.state.issues.length !== 0 &&
          this.$store.state.deletedId.length === 0
        ) {
          this.$store.state.issues.forEach((el) => {
            idArray.push(el.id);
          });
          newId = Math.max(...idArray) + 1;
        } else if (
          this.$store.state.issues.length === 0 &&
          this.$store.state.deletedId.length !== 0
        ) {
          this.$store.state.deletedId.forEach((el) => {
            idArray.push(el);
          });
          newId = Math.max(...idArray) + 1;
        } else {
          newId = 0;
        }
        this.baseData.id = newId;

        this.$emit("close-modal", false);
        // this.$emit("add-data", this.baseData);
        this.$store.commit("addData", this.baseData);
      }
    },

    //에러메시지 출력 중지 함수
    errMsgChange() {
      this.errorMsg = false;
    },

    //빠른추가창 닫는 함수
    closeQuickAdd() {
      this.$emit("close-modal", false);
    },
  },
};
</script>

<style scoped>
.main-div {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  padding: 10px 10px 10px 10px;
  min-height: 50px;
  border: 2px solid #eb3f3f;
}

.quick-add-box {
  width: 253px;
  height: 25px;
  border: none;
}

.quick-add-box:focus {
  outline: none;
}

.btn-wrapper {
  display: flex;
  justify-content: right;
  gap: 5px;
}

.add-btn {
  width: 20px;
  height: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  /* margin: 5px; */
  font-size: 10px;
  border: 1px soild #797979;
  border-radius: 5px;
  background-color: #a0a0a0;
  color: #ffffff;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #b10000;
}

.save-btn {
  background-color: #686868;
}

.error-msg {
  width: 164px;
  display: flex;
  justify-content: left;
  font-size: 11px;
  color: #dd0808;
}
</style>
