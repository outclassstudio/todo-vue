<template>
  <div class="modal-bg">
    <div class="modal-content" v-if="editMode">
      <!-- {{ params }} -->
      <!-- {{ element }} -->
      <!-- <div class="modal-header">{{ $route.params.id }}</div> -->
      <div class="content-box">
        <div class="content-title">제목</div>
        <div class="title-content">{{ params.title }}</div>
      </div>
      <div class="content-box">
        <div class="content-title">진행상태</div>
        <div class="title-content">{{ params.status }}</div>
      </div>
      <div class="content-box">
        <div class="content-title">To-Do 내용</div>
        <div class="title-content-large">
          {{ params.contents.todo }}
        </div>
      </div>
      <div
        class="content-box"
        v-if="baseData.status === 'Progress' || baseData.status === 'Done'"
      >
        <div class="content-title">Progress 내용</div>
        <div class="title-content-large">
          {{ params.contents.progress }}
        </div>
      </div>
      <div class="content-box" v-if="baseData.status === 'Done'">
        <div class="content-title">Done 내용</div>
        <div class="title-content-large">
          {{ params.contents.done }}
        </div>
      </div>
      <div class="content-box">
        <div class="content-title">최종수정시간</div>
        <div class="title-content">{{ params.updatedDate }}</div>
      </div>
      <div class="btn-wrapper">
        <router-link to="/"
          ><div class="modal-btn back-btn">뒤로가기</div></router-link
        >
        <div class="modal-btn save-btn" @click="editModeOn">수정</div>
      </div>
    </div>
    <div class="modal-content" v-else>
      <!-- {{ params }} -->
      <!-- <div class="modal-header">
        <div class="modal-header">{{ $route.params.id }}</div>
      </div> -->
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
          {{ params.contents.todo }}
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
          {{ params.contents.progress }}
        </div>
      </div>
      <div class="content-box" v-if="baseData.status === 'Done'">
        <div class="content-title">Done 내용</div>
        <textarea class="textarea" v-model="baseData.contents.done" />
      </div>
      <div class="content-box">
        <div class="content-title">최종수정시간</div>
        <div class="title-content">{{ params.updatedDate }}</div>
      </div>
      <div class="btn-wrapper">
        <router-link to="/"
          ><div class="modal-btn back-btn">뒤로가기</div></router-link
        >
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
  name: "Page-View",
  data: function () {
    return {
      params: this.$route.params,
      editMode: true,
      errorMsg: false,
      baseData: {
        id: this.todoItemFilter()[0].id,
        title: this.todoItemFilter()[0].title,
        contents: {
          todo: this.todoItemFilter()[0].contents.todo,
          progress: this.todoItemFilter()[0].contents.progress,
          done: this.todoItemFilter()[0].contents.done,
        },
        status: this.todoItemFilter()[0].status,
        updatedDate: this.todoItemFilter()[0].updatedDate,
      },
    };
  },

  props: { todoitem: Array, element: Object },

  methods: {
    todoItemFilter() {
      // console.log(this.$route.params.id);
      // console.log(this.todoitem);
      let filtered = this.todoitem.filter((el) => {
        return el.id === Number(this.$route.params.id);
      });

      return filtered;
    },

    //수정모드On
    editModeOn() {
      if (this.baseData.status === "Done") {
        alert("완료된 이슈는 수정할 수 없습니다");
      } else {
        this.editMode = false;
      }
    },

    // 수정모드Off
    editModeOff() {
      this.editMode = true;
      this.baseData.status = this.params.status;
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

      // *내용변경 테스트를 위한 키 설정
      let currentStatus = this.params.status.toLowerCase();

      // console.log(currentStatus);
      console.log(this.params.status);
      // console.log(this.baseData.status);

      //*내용변경이 없을 때에 대한 로직
      if (
        this.params.title === this.baseData.title &&
        this.params.contents[currentStatus] ===
          this.baseData.contents[currentStatus] &&
        this.params.status === this.baseData.status
      ) {
        alert("변경된 내용이 없습니다.");
      } else {
        //*Progress에서 Todo로 상태변경시 Progress내용 삭제
        if (
          this.params.status === "Progress" &&
          this.baseData.status === "ToDo"
        ) {
          this.baseData.contents.progress = "";
        }
        this.$emit("edit-data", this.baseData);
        this.editMode = true;
      }
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
  height: 100vh;
  margin-top: 60px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(250, 250, 250);
  border: 1px soild #bbbbbb;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 10px 10px -15px,
    rgba(0, 0, 0, 0.8) 0px -10px 10px -15px;
  width: 600px;
  padding: 40px;
  gap: 30px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
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
  width: 263px;
  height: 31px;
  padding-left: 9px;
  display: flex;
  align-items: center;
}

.select {
  width: 276px;
  height: 35px;
  padding: 5px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
}

.textarea {
  width: 255px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  height: 62px;
  padding: 10px;
  white-space: normal;
  /* font-weight: 500; */
}

.btn-wrapper {
  display: flex;
  width: 400px;
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
  height: 23px;
  width: 260px;
  padding: 5px 5px 5px 9px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  font-size: 13px;
  letter-spacing: 0.1px;
}

.title-content-large {
  height: 62px;
  width: 255px;
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
</style>
