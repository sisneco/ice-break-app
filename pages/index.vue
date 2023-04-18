<script setup>
import { db } from "@/firebase/firebase";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
// => value

// store
const questionAppStore = questionStore();

// Elements
let idInputFormElement = null;
let replyInputFormElement = null;

onMounted(() => {
  idInputFormElement = document.getElementById("id-input-form");

  replyInputFormElement = document.getElementById("reply-input-form");
});

// id
const text = ref("");
// errorBoolean => Text
const hasIdError = ref(false);
const hasReplyError = ref(false);
const goVibrateAnimation = ref(false);

const successId = ref(false);

const idInputFormAnimateEndFlg = ref(false);

// 選択項目
const selected = ref("");

// セレクトボックスで扱う値
let names = [];

// => methods

const checkId = async (event) => {
  // initialize error animation value
  goVibrateAnimation.value = false;

  // empty is error
  if (text.value === "") {
    textError(event);
    return;
  }

  // firebase access
  await db
    .collection("groups")
    .doc(text.value)
    .get()
    .then((val) => {
      // Not Getting => error
      if (val.data() === undefined) {
        textError(event);
        return;
      }

      // success
      hasIdError.value = false;

      questionAppStore.setGroupsData(val.data());

      names = questionAppStore.getNameList;
      successId.value = true;

      setTimeout(() => {
        idInputFormElement.style.display = "none";

        replyInputFormElement.style.display = "flex";
        idInputFormAnimateEndFlg.value = true;
      }, "500");
    });
};

// text Error Process(visual)
const textError = (event) => {
  hasIdError.value = true;
  goVibrateAnimation.value = true;
};
</script>

<template>
  <div
    class="flex flex-col h-[90vh] md:w-[calc(calc(100vw_-_160px))] items-center md:flex-row-reverse md:h-screen"
  >
    <section
      class="h-1/2 rounded-b-[150px] w-full md:w-1/2 mb-8 relative md:h-full md:mb-0"
    >
      <p
        class="bg-orange-100 w-full h-[95%] rounded-b-[150px] md:rounded-none md:h-full md:flex md:justify-center md:items-center md:flex-col md:bg-gradient-to-b from-orange-200 via-orange-100 to-orange-50"
      >
        <img
          src="@/assets/img/dummy.jpg"
          alt="dummy"
          class="rounded-full w-[150px] h-[150px] absolute -bottom-8 left-[calc(50%_-_75px)] md:left-[calc(50%_-_150px)] md:w-[30vw] md:h-[30vw] md:bottom-1/2 md:static"
        />
        <span class="text-gray-500 text-lg font-medium hidden md:inline"
          >出会ってばかりだと少し恥ずかしい<br />
          そんなコト、ありませんか？ <br />
          このサイトは そんな悩みを少しでも解決するために<br />
          作成したアイスブレイクApp第1弾となります！ <br />
          ぜひ 仲間やお友達と更に仲良くなってください！！
        </span>
      </p>
    </section>
    <section
      class="h-1/2 md:h-screen md:w-1/2 md:flex md:flex-col md:justify-center md:items-center"
    >
      <h1 class="font-serif font-bold text-2xl md:text-2xl lg:text-4xl">
        聞きたいコト、ありまうす
      </h1>
      <div class="flex flex-col items-center w-full h-full pt-4 md:h-auto">
        <p class="text-sm font-serif md:text-base md:mt-4">
          聞きたいコト、気軽に質問しませんか？
        </p>

        <div
          class="flex flex-col items-center w-[300px]"
          id="id-input-form"
          :class="{ 'animate-slide-out-left': successId }"
        >
          <p
            id="errorText"
            class="mr-auto my-2 text-red-500 text-sm font-bold invisible"
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
          <input
            type="text"
            v-model="text"
            class="w-[300px] py-4 pl-2 rounded-lg text-lg border-gray-100 border-2 shadow-sm outline-none"
            placeholder="管理者から共有されたIDを入力"
          />
          <form-button @clickEvent="checkId($event)">Go!! </form-button>
          <p
            class="text-lg pt-4 border-b-[1px] border-gray-400 w-[300px] text-gray-400"
          >
            > Admin login
          </p>
        </div>
        <div
          class="flex-col items-center w-full gap-y-4 hidden"
          id="reply-input-form"
          :class="{ 'animate-slide-in-right': idInputFormAnimateEndFlg }"
        >
          <p
            id="errorText"
            class="mr-auto my-2 text-red-500 text-sm font-bold invisible"
            :class="[
              {
                'animate-vibrate-1': goVibrateAnimation,
              },
              {
                'error-text': hasReplyError,
              },
            ]"
          >
            IDが異なっています！！
          </p>
          <select
            class="w-[300px] py-4 pl-2 rounded-lg text-sm border-gray-100 border-2 shadow-sm mt text-gray-500 outline-none"
            v-model="selected"
          >
            <option disabled value="">宛先を選んでください</option>
            <option v-for="name in names" key="name">{{ name }}</option>
          </select>

          <input
            type="text"
            class="w-[300px] py-4 pl-2 rounded-lg text-sm border-gray-100 border-2 shadow-sm outline-none"
            placeholder="質問したいコトは？"
          />
          <button
            class="bg-sky-400 text-white text-lg font-bold w-[100px] rounded py-2 mt-4 ml-[196px] shadow"
          >
            Reply
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.error-text {
  visibility: inherit;
}
</style>
