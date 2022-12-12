const DB_NAME = "Todo-List";
const DB_VERSION = 1;
let DB;

export default {
  async getDb() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      console.log("OPENING DB", DB);
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        console.log("Error opening db", e);
        reject("Error");
      };

      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = (e) => {
        console.log("onupgradeneeded");
        let db = e.target.result;
        let objectStore = db.createObjectStore("todos", {
          keyPath: "id",
        });
        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("todo", "todo", { unique: false });
        objectStore.createIndex("progress", "progress", { unique: false });
        objectStore.createIndex("done", "done", { unique: false });
        objectStore.createIndex("status", "status", { unique: false });
        objectStore.createIndex("updatedDate", "updatedDate", {
          unique: false,
        });
      };
    });
  },

  async getData() {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["todos"], "readonly");
      let store = trans.objectStore("todos");
      resolve(store.getAll());
    });
  },

  async addData(data) {
    const target = {};
    const newData = Object.assign(target, data);

    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["todos"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("todos");
      store.add(newData);
    });
  },

  async editData(data) {
    const target = {};
    const newData = Object.assign(target, data);

    console.log(newData, "check");

    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["todos"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("todos");
      store.put(newData);
    });
  },

  async deleteData(data) {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["todos"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("todos");
      store.delete(data);
    });
  },

  async clearData() {
    let db = await this.getDb();
    db.clear();
  },
};
