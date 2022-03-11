<template>
  <div class="modal-bg">
    <div class="modal-content" v-if="editMode">
      <div class="content-box">
        <div class="content-title">제목</div>
        <div class="title-content">아무제목</div>
      </div>
      <div class="content-box">
        <div class="content-title">진행상태</div>
        <div class="title-content">To-Do</div>
      </div>
      <div class="content-box">
        <div class="content-title">To-Do 내용</div>
        <div class="title-content-large">To-Do</div>
      </div>
      <div class="btn-wrapper">
        <button class="modal-btn" @click="closeModal">닫기</button>
        <button class="modal-btn" @click="editChange">수정</button>
      </div>
    </div>
    <div class="modal-content" v-else>
      <div class="content-box">
        <div class="content-title">제목</div>
        <input type="text" class="text" />
      </div>
      <div class="content-box">
        <div class="content-title">진행상태</div>
        <select class="select">
          <option>To-Do</option>
          <option>Progress</option>
          <option>Done</option>
        </select>
      </div>
      <div class="content-box">
        <div class="content-title">To-Do 내용</div>
        <input type="textarea" class="textarea" />
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
    };
  },
  props: { modalopen: Boolean },
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
}

.select {
  height: 30px;
  padding: 5px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
}

.textarea {
  height: 60px;
  white-space: normal;
}

.modal-btn {
  height: 30px;
}

.btn-wrapper {
  display: flex;
  justify-content: space-between;
}

.title-content {
  height: 18px;
  padding: 5px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  font-size: 13px;
}

.title-content-large {
  height: 62px;
  /* padding: 5px; */
  border: 1px solid #c2c2c2;
  border-radius: 5px;
}
</style>
