import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";

import { auth, checkAuthState } from "./utils/import";

/* khi refresh trang thi app se gui request len server de kiem tra xem user da dang nhap hay chua,
neu da dang nhap thi se lay thong tin user do va luu vao auth.currentUser,
o client thi auth.currentUser se la null,
khi du kieu chua gui ve thi se chuyen huong sang trang login
 */
let app;

checkAuthState(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.use(store);
    app.mount("#app");
  }
});
