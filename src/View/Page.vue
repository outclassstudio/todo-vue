<template>
  <div class="modal-bg">
    <div class="modal-content" v-if="editMode">
      <router-link to="/"
        ><div class="modal-header">🎯홈으로 돌아가기</div></router-link
      >
      <div class="content-box">
        <div class="content-title">제목</div>
        <div class="title-content view">{{ singleIssue.title }}</div>
      </div>
      <div class="content-box">
        <div class="content-title">진행상태</div>
        <div class="title-content view">{{ singleIssue.status }}</div>
      </div>
      <div class="content-box">
        <div class="content-title">To-Do 내용</div>
        <div class="title-content-large view">
          {{ singleIssue.todo }}
        </div>
      </div>
      <div
        class="content-box"
        v-if="baseData.status === 'Progress' || baseData.status === 'Done'"
      >
        <div class="content-title">Progress 내용</div>
        <div class="title-content-large view">
          {{ singleIssue.progress }}
        </div>
      </div>
      <div class="content-box" v-if="baseData.status === 'Done'">
        <div class="content-title">Done 내용</div>
        <div class="title-content-large view">
          {{ singleIssue.done }}
        </div>
      </div>
      <div class="content-box">
        <div class="content-title">최종수정시간</div>
        <div class="title-content view">{{ singleIssue.updatedDate }}</div>
      </div>
      <div class="btn-wrapper">
        <div class="modal-btn back-btn" @click="goBack">뒤로가기</div>
        <div class="modal-btn save-btn" @click="editModeOn">수정</div>
      </div>
    </div>
    <div class="modal-content" v-else>
      <router-link to="/"
        ><div class="modal-header">🎯홈으로 돌아가기</div></router-link
      >
      <div class="content-box">
        <div class="content-title">제목</div>
        <input type="text" class="text" v-model="baseData.title" />
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
        <textarea
          class="textarea"
          v-model="baseData.todo"
          v-if="baseData.status === 'ToDo'"
        />
        <div class="title-content-large" v-if="baseData.status !== 'ToDo'">
          {{ singleIssue.todo }}
        </div>
      </div>
      <div
        class="content-box"
        v-if="baseData.status === 'Progress' || baseData.status === 'Done'"
      >
        <div class="content-title">Progress 내용</div>
        <textarea
          class="textarea"
          v-model="baseData.progress"
          v-if="baseData.status === 'Progress'"
        />
        <div class="title-content-large" v-if="baseData.status !== 'Progress'">
          {{ singleIssue.progress }}
        </div>
      </div>
      <div class="content-box" v-if="baseData.status === 'Done'">
        <div class="content-title">Done 내용</div>
        <textarea class="textarea" v-model="baseData.done" />
      </div>
      <div class="content-box">
        <div class="content-title">최종수정시간</div>
        <div class="title-content">{{ singleIssue.updatedDate }}</div>
      </div>
      <div class="btn-wrapper">
        <div class="modal-btn back-btn" @click="goBack">뒤로가기</div>
        <div class="btn-sub-wrapper">
          <div class="modal-btn" @click="editModeOff">취소</div>
          <div class="modal-btn save-btn" @click="editData">저장</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { makeDate } from "../hooks/date";
import idb from "../api/idb";
import Swal from "sweetalert2";

export default {
  name: "Page-View",
  data: function () {
    return {
      params: this.$route.params,
      editMode: true,
      errorMsg: false,
      baseData: {},
      singleIssue: {},
    };
  },

  async created() {
    let issue = await idb.getOneData(this.$route.params.id);
    let cloned = {};
    Object.assign(cloned, issue);

    this.baseData = cloned;
    this.singleIssue = issue;
  },

  methods: {
    //수정모드On
    editModeOn() {
      this.editMode = false;
    },

    // 수정모드Off
    editModeOff() {
      this.baseData = { ...this.singleIssue };
      this.editMode = true;
    },

    //데이터수정함수
    editData() {
      //*날짜생성
      const dateString = makeDate();
      this.baseData.updatedDate = dateString;

      // *내용변경 테스트를 위한 키 설정
      let currentStatus = this.singleIssue.status.toLowerCase();

      //*제목입력에 대한 점검
      if (this.baseData.title !== "") {
        //*내용변경이 없을 때에 대한 로직
        if (
          this.singleIssue.title === this.baseData.title &&
          this.singleIssue[currentStatus] === this.baseData[currentStatus] &&
          this.singleIssue.status === this.baseData.status
        ) {
          Swal.fire({ title: "변경된 내용이 없습니다.", icon: "warning" });
        } else {
          //*Progress에서 Todo로 상태변경시 Progress내용 삭제
          // if (
          //   this.singleIssue.status === "Progress" &&
          //   this.baseData.status === "ToDo"
          // ) {
          //   this.baseData.progress = "";
          // }
          this.singleIssue = { ...this.baseData };
          this.$store.commit("editData", this.baseData);
          this.editMode = true;
        }
      } else {
        Swal.fire({ title: "제목을 입력해주세요", icon: "warning" });
      }
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.modal-bg {
  display: flex;
  justify-content: center;
  align-items: start;
  /* background-color: rgba(0, 0, 0, 0.1); */
  width: 100vw;
  /* height: 100vh; */
  margin: 20px 0px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(250, 250, 250);
  border: 1px soild #bbbbbb;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px;
  /* box-shadow: rgba(0, 0, 0, 0.8) 0px 10px 10px -15px,
    rgba(0, 0, 0, 0.8) 0px -10px 10px -15px; */
  width: 550px;
  padding: 40px;
  gap: 30px;
}

.modal-header {
  display: flex;
  justify-content: left;
  width: 600px;
  padding-left: 145px;
  font-size: 12px;
  color: #797979;
}

.header-title {
  font-size: 12px;
  color: #a7a7a7;
}

a {
  text-decoration: none;
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
  /* flex-direction: column; */
}

.content-box > input {
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  /* width: 500px; */
}

.content-title {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
  width: 120px;
}

.text {
  width: 323px;
  height: 41px;
  padding-left: 9px;
  display: flex;
  align-items: center;
}

.select {
  width: 336px;
  height: 45px;
  padding: 5px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
}

.textarea {
  width: 315px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  height: 82px;
  padding: 10px;
  white-space: normal;
  /* font-weight: 500; */
}

.btn-wrapper {
  display: flex;
  width: 460px;
  justify-content: space-between;
  margin: 5px 0px 5px 0px;
}

.btn-sub-wrapper {
  display: flex;
  gap: 3px;
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

.save-btn {
  background-color: #686868;
}

.back-btn {
  width: 45px;
}

.title-content {
  display: flex;
  align-items: center;
  height: 33px;
  width: 320px;
  padding: 5px 5px 5px 9px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  font-size: 13px;
  letter-spacing: 0.1px;
}

.title-content-large {
  height: 82px;
  width: 315px;
  white-space: pre;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  font-size: 13px;
  padding: 10px;
  /* font-weight: 100; */
}

.error {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #dd0808;
}

.view {
  background-color: white;
}
</style>
