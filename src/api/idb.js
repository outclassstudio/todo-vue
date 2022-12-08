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
        // objectStore.createIndex("contents", "contents", { unique: false });
        objectStore.createIndex("status", "status", { unique: false });
        objectStore.createIndex("updatedDate", "updatedDate", {
          unique: false,
        });
      };
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
  async getData() {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["todos"], "readonly");
      trans.oncomplete = () => {
        // resolve();
      };

      let store = trans.objectStore("todos");
      resolve(store.getAll());
      // let cats = [];

      // store.openCursor().onsuccess = (e) => {
      //   let cursor = e.target.result;
      //   if (cursor) {
      //     cats.push(cursor.value);
      //     cursor.continue();
      //   }
      // };
    });
  },

  async addData(data) {
    const killPassword = ({ contents, ...rest }) => {
      console.log(contents);
      return rest;
    };
    const filtered = killPassword(data);

    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction(["todos"], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore("todos");
      console.log(store, "check store");
      store.add(filtered);
    });
  },
};
