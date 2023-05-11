<script setup>
import { auth } from "~/firebase/firebase";

// value
const loginId = ref("");
const loginPassword = ref("");

const hasIdError = ref("");
const goVibrateAnimation = ref("");

const router = useRouter();

definePageMeta({
  middleware: ["admin"],
});

// method
const login = () => {
  if (loginId.value === "" || loginPassword.value === "") {
    textError();
    return;
  }

  auth
    .signInWithEmailAndPassword(loginId.value, loginPassword.value)
    .then((result) => {
      router.push("/adminPage");
      return;
    })
    .catch((err) => {
      textError();
    });
};

const textError = () => {
  console.log("error");
  hasIdError.value = true;
  goVibrateAnimation.value = true;

  // initialize
  setTimeout(() => {
    goVibrateAnimation.value = false;
  }, "500");
};
</script>

<template>
  <div
    class="flex flex-col w-screen items-center h-[calc(calc(100vh_-_75px))] justify-center"
  >
    <div class="flex flex-col items-center">
      <h1 class="text-5xl font-cormorant font-thin md:text-7xl">
        IceBreakApp Login
      </h1>
      <p
        class="text-center mt-2 font-notojp text-sm md:text-base font-semibold"
      >
        こちらは管理者専用のログインページとなります。<br />
        一般機能はログインをしなくても
        <br />サービスを受けることができます。
      </p>
    </div>
    <div class="flex flex-col gap-y-4 mt-4 w-[300px] md:w-[500px]">
      <p
        class="mr-auto my-2 text-red-500 text-sm md:text-xl invisible"
        :class="[
          {
            'animate-vibrate-1': goVibrateAnimation,
          },
          {
            'error-text': hasIdError,
          },
        ]"
      >
        IDが異なっています！！
      </p>
      <div class="flex flex-col gap-y-2">
        <label for="id" class="text-base text-gray-500">メールアドレス</label>
        <input
          v-model="loginId"
          type="text"
          class="w-full py-4 pl-2 rounded-lg text-lg border-gray-100 border-2 shadow-sm outline-none"
          placeholder="メールアドレスを入力してください"
        />
      </div>

      <div class="flex flex-col gap-y-2">
        <label for="id" class="text-base text-gray-500">パスワード</label>
        <input
          v-model="loginPassword"
          type="password"
          class="w-full py-4 pl-2 rounded-lg text-lg border-gray-100 border-2 shadow-sm outline-none"
          placeholder="パスワードを入力してください"
        />

        <button
          class="bg-orange-300 py-4 rounded-full mt-4 text-2xl flex justify-center items-center relative text-white"
          @click="login()"
        >
          ログイン
        </button>
      </div>
    </div>
  </div>
</template>
