<template>
  <div class="modal-bg">
    <div class="modal-content">
      <div class="modal-header">
        <div class="header-title">연습용 프로젝트</div>
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
        <select class="select" v-model="baseData.status">
          <option>ToDo</option>
          <option>Progress</option>
          <option>Done</option>
        </select>
      </div>
      <div class="content-box">
        <div class="content-title">To-Do 내용</div>
        <textarea class="textarea" v-model="baseData.contents.todo" />
      </div>
      <div
        class="content-box"
        v-if="baseData.status === 'Progress' || baseData.status === 'Done'"
      >
        <div class="content-title">Progress 내용</div>
        <textarea class="textarea" v-model="baseData.contents.progress" />
      </div>
      <div class="content-box" v-if="baseData.status === 'Done'">
        <div class="content-title">Done 내용</div>
        <textarea class="textarea" v-model="baseData.contents.done" />
      </div>
      <div class="btn-wrapper">
        <div class="modal-btn" @click="closeModal">닫기</div>
        <div class="modal-btn save-btn" @click="addData">저장</div>
      </div>
      <div class="error-msg" v-if="errorMsg">제목을 입력해주세요(필수)</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-modal",
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
        status: "",
        updatedDate: "",
      },
      errorMsg: false,
    };
  },
  props: { modalopen: Boolean, todoitem: Array },
  methods: {
    closeModal() {
      this.$emit("close-modal", false);
    },
    addData() {
      //날짜 생성
      if (this.baseData.title === "") {
        this.errorMsg = true;
        // alert("제목을 입력해주세요(필수)");
      } else {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        let day = ("0" + currentDate.getDate()).slice(-2);
        let hours = ("0" + currentDate.getHours()).slice(-2);
        let minutes = ("0" + currentDate.getMinutes()).slice(-2);
        let seconds = ("0" + currentDate.getSeconds()).slice(-2);
        let dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        this.baseData.updatedDate = dateString;

        //id생성
        let idArray = [];
        if (this.todoitem.length !== 0) {
          this.todoitem.forEach((el) => {
            idArray.push(el.id);
          });
          let newId = Math.max(...idArray) + 1;
          this.baseData.id = newId;
        } else {
          this.baseData.id = 0;
        }

        this.$emit("close-modal", false);
        this.$emit("add-data", this.baseData);
      }
    },
    errMsgChange() {
      this.errorMsg = false;
    },
  },
  computed: {},
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
  margin: 15px 0px 5px 0px;
}

.save-btn {
  background-color: #686868;
}

.error-msg {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #dd0808;
}
</style>
