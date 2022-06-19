import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import "@/responsive.ts";
import App from "@/App.vue";

const app = createApp(App);

const pinia = createPinia();
const persistedState = localStorage.getItem("quizState");
if (persistedState) {
  pinia.state.value = JSON.parse(persistedState);
}
watch(
  pinia.state,
  (state) => localStorage.setItem("quizState", JSON.stringify(state)),
  { deep: true }
);
app.use(pinia);

app.mount("#app");
