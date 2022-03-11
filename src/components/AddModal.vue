<template>
  <div class="modal-bg">
    <div class="modal-content">
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
      <div class="btn-wrapper">
        <button class="modal-btn" @click="closeModal">닫기</button>
        <button class="modal-btn" @click="editChange">저장</button>
      </div>
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
    };
  },
  props: { modalopen: Boolean },
  methods: {
    closeModal() {
      this.$emit("close-modal", false);
    },
    createData(e) {
      e.target.value;
    },
    editChange() {
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      let day = ("0" + currentDate.getDate()).slice(-2);
      let hours = ("0" + currentDate.getHours()).slice(-2);
      let minutes = ("0" + currentDate.getMinutes()).slice(-2);
      let seconds = ("0" + currentDate.getSeconds()).slice(-2);
      let dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      // this.baseData.id =
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
  height: 30px;
}

.btn-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
