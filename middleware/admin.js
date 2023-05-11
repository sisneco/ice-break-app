import { auth } from "~/firebase/firebase";

export default defineNuxtRouteMiddleware(async (to, from) => {
  let isLogin = false;

  await auth.onAuthStateChanged(async (user) => {
    if (user !== null) {
      isLogin = true;
    }
  });

  if (isLogin) {
    return await navigateTo("/adminPage");
  }
});
