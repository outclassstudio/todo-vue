<template>
  <div class="modal-bg" @keyup.esc="closeModal" tabindex="0">
    <div class="modal-content">
      <div class="modal-header">
        <div class="header-title">Simple Todo-List</div>
        <div class="close-btn" @click="closeModal">X</div>
      </div>
      <div class="content-box">
        <div class="content-title">제목</div>
        <input
          type="text"
          class="text"
          v-model="baseData.title"
          @change="errMsgChange"
        />
      </div>
      <div class="content-box">
        <div class="content-title">진행상태</div>
        <select
          class="select"
          v-model="baseData.status"
          @change="statusErrMsgChange"
        >
          <option>ToDo</option>
          <option>Progress</option>
          <option>Done</option>
        </select>
      </div>
      <div class="content-box">
        <div class="content-title">To-Do 내용</div>
        <textarea class="textarea" v-model="baseData.todo" />
      </div>
      <div
        class="content-box"
        v-if="baseData.status === 'Progress' || baseData.status === 'Done'"
      >
        <div class="content-title">Progress 내용</div>
        <textarea class="textarea" v-model="baseData.progress" />
      </div>
      <div class="content-box" v-if="baseData.status === 'Done'">
        <div class="content-title">Done 내용</div>
        <textarea class="textarea" v-model="baseData.done" />
      </div>
      <div class="btn-wrapper">
        <div class="modal-btn" @click="closeModal">닫기</div>
        <div class="modal-btn save-btn" @click="addData">저장</div>
      </div>
      <div class="error-msg" v-if="errorMsg">제목을 입력해주세요</div>
      <div class="error-msg" v-if="statusErrorMsg">진행상태를 선택해주세요</div>
    </div>
  </div>
</template>

<script>
import { makeDate } from "../hooks/date";

export default {
  name: "add-modal",

  data: function () {
    return {
      baseData: {
        id: "",
        title: "",
        todo: "",
        progress: "",
        done: "",
        status: "ToDo",
        updatedDate: "",
      },
      errorMsg: false,
      statusErrorMsg: false,
    };
  },

  props: { modalopen: Boolean },

  methods: {
    //모달창 닫는 함수
    closeModal() {
      this.$emit("close-modal", false);
    },

    //데이터추가함수
    addData() {
      //*타이틀 없을 시 에러메시지 출력
      if (this.baseData.title === "") {
        this.errorMsg = true;
      } else if (this.baseData.status === "") {
        this.statusErrorMsg = true;
      } else {
        //*날짜생성
        const dateString = makeDate();
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
        this.$store.commit("addData", this.baseData);
      }
    },

    //에러메시지 출력 중지 함수
    errMsgChange() {
      this.errorMsg = false;
    },

    //상태미선택시 오류메시지 출력
    statusErrMsgChange() {
      this.statusErrorMsg = false;
    },
  },
};
</script>

<style scoped>
.modal-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 1px soild #bbbbbb;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 10px 10px -15px,
    rgba(0, 0, 0, 0.8) 0px -10px 10px -15px;
  width: 400px;
  min-height: 400px;
  padding: 30px;
  gap: 25px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.header-title {
  font-size: 12px;
  color: #a7a7a7;
}

.close-btn {
  font-size: 12px;
  color: #bbbbbb;
  cursor: pointer;
}

.close-btn:hover {
  color: #6d6d6d;
}

.content-box {
  display: flex;
  flex-direction: column;
}

.content-box > input {
  border: 1px solid #c2c2c2;
  border-radius: 5px;
}

.content-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
}

.text {
  height: 26px;
}

.select {
  height: 30px;
  padding: 5px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
}

.textarea {
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  height: 60px;
  white-space: normal;
}

.modal-btn {
  width: 22px;
  height: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 11px;
  border: 1px soild #797979;
  border-radius: 3px;
  background-color: #a0a0a0;
  color: #ffffff;
  cursor: pointer;
}

.modal-btn:hover {
  background-color: #b10000;
}

.btn-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 15px 0px 0px 0px;
}

.save-btn {
  background-color: #686868;
}

.error-msg {
  display: flex;
  justify-content: center;
  font-size: 13px;
  color: #dd0808;
}
</style>
