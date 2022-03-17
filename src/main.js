import { createApp } from "vue";
import App from "./App.vue";
import "./assets/global.css";
import router from "./routes/index.js";
import store from "./store";

const app = createApp(App).use(store);
app.use(router);
app.mount("#app");
