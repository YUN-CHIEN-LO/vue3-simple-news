import { createApp } from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.min.css";
import store from "./store";
const app = createApp(App);
app.config.globalProperties.$store = store;
app.use(store).mount("#app");
