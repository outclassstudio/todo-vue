<template>
  <div class="modal-bg">
    <div class="modal-content" v-if="editMode">
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
        <button class="modal-btn" @click="closeModal">닫기</button>
        <button class="modal-btn" @click="editChange">수정</button>
      </div>
    </div>
    <div class="modal-content" v-else>
      <div class="content-box">
        <div class="content-title">제목</div>
        <input type="text" class="text" v-model="baseData.title" />
      </div>
      <div class="content-box">
        <div class="content-title">진행상태</div>
        <select class="select" v-model="baseData.status">
          <option>To-Do</option>
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
      <div class="content-box">
        <div class="content-title">최종수정시간</div>
        <div class="title-content">{{ element.updatedDate }}</div>
      </div>
      <div class="btn-wrapper">
        <button class="modal-btn" @click="closeModal">닫기</button>
        <button class="modal-btn" @click="editChange">저장</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "content-modal",
  data: function () {
    return {
      editMode: true,
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
    closeModal() {
      this.$emit("close-modal", false);
    },
    editChange() {
      if (this.editMode) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
    },
    updateDate() {
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      let day = ("0" + currentDate.getDate()).slice(-2);
      let hours = ("0" + currentDate.getHours()).slice(-2);
      let minutes = ("0" + currentDate.getMinutes()).slice(-2);
      let seconds = ("0" + currentDate.getSeconds()).slice(-2);
      let dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      this.baseData.updatedDate = dateString;

      this.$emit("close-modal", false);
      this.$emit("update", this.baseData);
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
  width: 350px;
  /* height: 500px; */
  padding: 30px;
  gap: 20px;
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

.modal-btn {
  height: 30px;
}

.btn-wrapper {
  display: flex;
  justify-content: space-between;
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
</style>
