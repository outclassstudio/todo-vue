<template>
  <div class="modal-bg">
    <div class="modal-content" v-if="editMode">
      <div class="modal-header">
        <div class="header-title">연습용 프로젝트</div>
        <div class="close-btn" @click="closeModal">X</div>
      </div>
      <div class="content-box">
        <div class="content-title">제목</div>
        <div class="title-content">{{ element.title }}</div>
      </div>
      <div class="content-box">
        <div class="content-title">진행상태</div>
        <div class="title-content">{{ element.status }}</div>
      </div>
      <div class="content-box">
        <div class="content-title">To-Do 내용</div>
        <div class="title-content-large">{{ element.contents.todo }}</div>
      </div>
      <div
        class="content-box"
        v-if="baseData.status === 'Progress' || baseData.status === 'Done'"
      >
        <div class="content-title">Progress 내용</div>
        <div class="title-content-large">{{ element.contents.progress }}</div>
      </div>
      <div class="content-box" v-if="baseData.status === 'Done'">
        <div class="content-title">Done 내용</div>
        <div class="title-content-large">{{ element.contents.done }}</div>
      </div>
      <div class="content-box">
        <div class="content-title">최종수정시간</div>
        <div class="title-content">{{ element.updatedDate }}</div>
      </div>
      <div class="btn-wrapper">
        <div class="modal-btn" @click="closeModal">닫기</div>
        <div class="modal-btn save-btn" @click="editModeOn">수정</div>
      </div>
    </div>
    <div class="modal-content" v-else>
      <div class="modal-header">
        <div class="header-title">연습용 프로젝트</div>
        <div class="close-btn" @click="closeModal">X</div>
      </div>
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
          v-model="baseData.contents.todo"
          v-if="baseData.status === 'ToDo'"
        />
        <div class="title-content-large" v-if="baseData.status !== 'ToDo'">
          {{ element.contents.todo }}
        </div>
      </div>
      <div
        class="content-box"
        v-if="baseData.status === 'Progress' || baseData.status === 'Done'"
      >
        <div class="content-title">Progress 내용</div>
        <textarea
          class="textarea"
          v-model="baseData.contents.progress"
          v-if="baseData.status === 'Progress'"
        />
        <div class="title-content-large" v-if="baseData.status !== 'Progress'">
          {{ element.contents.progress }}
        </div>
      </div>
      <div class="content-box" v-if="baseData.status === 'Done'">
        <div class="content-title">Done 내용</div>
        <textarea class="textarea" v-model="baseData.contents.done" />
      </div>
      <div class="content-box">
        <div class="content-title">최종수정시간</div>
        <div class="title-content">{{ element.updatedDate }}</div>
      </div>
      <div class="btn-wrapper">
        <div class="modal-btn" @click="closeModal">닫기</div>
        <div class="btn-sub-wrapper">
          <div class="modal-btn" @click="editModeOff">취소</div>
          <div class="modal-btn save-btn" @click="editData">저장</div>
        </div>
      </div>
      <!-- <div class="error" v-if="errorMsg">변경된 내용이 없습니다.</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "content-modal",

  data: function () {
    return {
      editMode: true,
      errorMsg: false,
      baseData: {
        id: this.element.id,
        title: this.element.title,
        contents: {
          todo: this.element.contents.todo,
          progress: this.element.contents.progress,
          done: this.element.contents.done,
        },
        status: this.element.status,
        updatedDate: this.element.updatedDate,
      },
    };
  },

  props: { modalopen: Boolean, element: Object },

  methods: {
    //모당창 닫는 함수
    closeModal() {
      this.$emit("close-modal", false);
    },

    //수정모드On
    editModeOn() {
      if (this.baseData.status === "Done") {
        alert("완료된 이슈는 수정할 수 없습니다");
      } else {
        this.editMode = false;
      }
    },

    //수정모드Off
    editModeOff() {
      this.editMode = true;
      this.baseData.status = this.element.status;
    },

    //데이터수정함수
    editData() {
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

      //*내용변경 테스트를 위한 키 설정
      let currentStatus = this.element.status.toLowerCase();

      //*내용변경이 없을 때에 대한 테스트 로직
      if (
        this.element.title === this.baseData.title &&
        this.element.contents[currentStatus] ===
          this.baseData.contents[currentStatus] &&
        this.element.status === this.baseData.status
      ) {
        alert("변경된 내용이 없습니다.");
      } else {
        //*Progress에서 Todo로 상태변경시 Progress내용 삭제
        if (
          this.element.status === "Progress" &&
          this.baseData.status === "ToDo"
        ) {
          this.baseData.contents.progress = "";
        }

        this.$emit("edit-data", this.baseData);
      }
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
  padding: 30px;
  gap: 20px;
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
  padding-left: 9px;
  display: flex;
  align-items: center;
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
  height: 64px;
  white-space: normal;
  /* font-weight: 500; */
}

.btn-wrapper {
  display: flex;
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

.title-content {
  display: flex;
  align-items: center;
  height: 18px;
  padding: 5px 5px 5px 9px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  font-size: 13px;
  letter-spacing: 0.1px;
}

.title-content-large {
  height: 62px;
  /* padding: 5px; */
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  font-size: 13px;
  padding: 3px;
  /* font-weight: 100; */
}

.error {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #dd0808;
}
</style>
