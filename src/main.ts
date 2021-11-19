import { createApp } from "vue";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.min.css";
import store from "./store";

createApp(App).use(store).mount("#app");
