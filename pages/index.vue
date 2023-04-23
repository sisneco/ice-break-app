<script setup>
import { db, rdb } from "@/firebase/firebase";
// => value

// store
const questionAppStore = questionStore();

// Elements
let idInputFormElement = null;
let replyInputFormElement = null;

// id
const textId = ref("");
const replyText = ref("");
const replyErrorText = ref("宛先または聞きたいコトが入力されていません！");
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
const checkId = async () => {
  if (idInputFormElement === null) {
    idInputFormElement = document.getElementById("id-input-form");
  }

  if (replyInputFormElement === null) {
    replyInputFormElement = document.getElementById("reply-input-form");
  }

  // empty is error
  if (textId.value === "") {
    textError();
    return;
  }

  // firebase access
  await db
    .collection("groups")
    .doc(textId.value)
    .get()
    .then((val) => {
      // Not Getting => error
      if (val.data() === undefined) {
        textError();
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
const textError = () => {
  hasIdError.value = true;
  goVibrateAnimation.value = true;

  // initialize
  setTimeout(() => {
    goVibrateAnimation.value = false;
  }, "500");
};

const replyMessage = () => {
  if (hasErrorReplyText()) {
    return;
  }

  rdb.ref(textId.value).push({
    text: replyText.value,
  });
};

const hasErrorReplyText = () => {
  const commonErrorProcess = (text) => {
    replyErrorText.value = text;
    hasReplyError.value = true;

    goVibrateAnimation.value = true;
    setTimeout(() => {
      goVibrateAnimation.value = false;
    }, "500");
  };

  if (selected.value === "") {
    commonErrorProcess("宛先または聞きたいコトが入力されていません！");
    return true;
  }

  if (replyText.value.length > 20) {
    commonErrorProcess("聞きたいコトは20文字以内で入力してください！");
    return true;
  }

  return false;
};
</script>

<template>
  <div
    class="flex flex-col h-[calc(calc(100vh_-_75px))] md:w-screen items-center md:flex-row-reverse"
  >
    <section
      class="h-1/2 rounded-b-[150px] w-full md:w-[60%] mb-8 relative md:h-full md:mb-0 bg-gradient-to-b from-orange-200 via-orange-100 to-orange-50 md:rounded-none md:flex md:flex-col md:gap-y-2"
    >
      <img
        src="@/assets/img/questionImg.jpg"
        alt="dummy"
        class="rounded-full w-[150px] h-[150px] absolute -bottom-8 left-[calc(50%_-_75px)] md:static md:w-[35vh] md:h-[35vh]"
      />
      <img
        src="@/assets/img/questionImg2.jpg"
        alt="dummy"
        class="hidden rounded-full w-[30vh] h-[30vh] ml-auto mr-[200px] md:inline"
      />
      <p
        class="text-gray-900 text-xl hidden mt-8 font-serif mr-[400px] md:inline"
      >
        出会ってばかりだと少し恥ずかしい... そんなコト、ありませんか？ <br />
        このサイトは そんな悩みを少しでも解決するために<br />
        作成したアイスブレイクApp第1弾となります！ <br />
        ぜひ 仲間やお友達と更に仲良くなってください！！
      </p>
    </section>
    <section
      class="h-1/2 md:h-screen md:w-[40%] md:flex md:flex-col md:items-center md:justify-center"
    >
      <div
        class="flex flex-col items-center w-full h-[210px] pt-4 md:h-auto"
        :class="{ 'pt-0': successId }"
      >
        <p class="text-sm font-serif md:text-base lg:text-xl">
          聞きたいコト、気軽に質問しませんか？
        </p>

        <div
          class="flex flex-col items-center w-[300px]"
          id="id-input-form"
          :class="{ 'animate-slide-out-left': successId }"
        >
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
          <input
            type="text"
            v-model="textId"
            class="w-[300px] py-4 pl-2 rounded-lg text-lg border-gray-100 border-2 shadow-sm outline-none"
            placeholder="管理者から共有されたIDを入力"
          />
          <form-button @clickEvent="checkId()" class="md:ml-0 md:mt-8 md:w-full"
            >Go!!
          </form-button>
        </div>
        <div
          class="flex-col items-center w-[300px] gap-y-2 hidden h-full justify-center md:gap-y-4 mt-2"
          id="reply-input-form"
          :class="{ 'animate-slide-in-right': idInputFormAnimateEndFlg }"
        >
          <p
            id="errorText"
            class="mr-auto text-red-500 text-sm font-bold invisible"
            :class="[
              {
                'animate-vibrate-1': goVibrateAnimation,
              },
              {
                'error-text': hasReplyError,
              },
            ]"
          >
            {{ replyErrorText }}
          </p>
          <select
            class="w-[300px] py-3 pl-2 rounded-lg text-sm border-gray-100 border-2 shadow-sm mt text-gray-500 outline-none"
            v-model="selected"
          >
            <option disabled value="">宛先を選んでください</option>
            <option v-for="name in names" key="name">{{ name }}</option>
          </select>
          <input
            type="text"
            v-model="replyText"
            class="w-[300px] py-3 pl-2 rounded-lg text-sm border-gray-100 border-2 shadow-sm outline-none"
            placeholder="聞きたいコトはなんですか？"
          />

          <button
            class="bg-sky-400 text-white text-lg font-bold w-[100px] rounded py-2 mt-4 ml-[196px] shadow"
            @click="replyMessage"
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
