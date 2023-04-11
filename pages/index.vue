<script setup>
import { db } from "@/firebase/firebase";
// => value

const questionAppStore = questionStore();

// id
const text = ref("");
// errorBoolean => Text
const hasIdError = ref(false);
const goVibrateAnimation = ref(false);

// => methods
const checkId = async () => {
  // initialize error animation value
  goVibrateAnimation.value = false;

  // empty is error
  if (text.value === "") {
    textError();
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
        textError();
        return;
      }

      // success
      questionAppStore.setGroupsData(val.data());

      useRouter().push("/successId");
    });
};

// text Error Process(visual)
const textError = () => {
  hasIdError.value = true;
  goVibrateAnimation.value = true;
};
</script>

<template>
  <navigation-bar>
    <div
      class="flex flex-col h-[90vh] md:w-[calc(calc(100vw_-_160px))] items-center md:flex-row-reverse md:h-screen"
    >
      <section
        class="h-1/2 rounded-b-[150px] w-full md:w-1/2 mb-8 relative md:h-full md:mb-0"
      >
        <p
          class="bg-orange-100 w-full h-[95%] rounded-b-[150px] md:rounded-none md:h-full"
        >
          <span class="text-gray-500 text-sm font-medium"
            >出会ってばかりだと少し恥ずかしい<br />
            そんなコト、ありませんか？ <br />
            このサイトは そんな悩みを少しでも解決するために<br />
            作成したアイスブレイクApp第1弾となります！ <br />
            ぜひ 仲間やお友達と更に仲良くなってください！！
          </span>
        </p>
        <img
          src="@/assets/img/dummy.jpg"
          alt="dummy"
          class="rounded-full w-[150px] h-[150px] absolute -bottom-8 left-[calc(50%_-_75px)] md:left-[calc(50%_-_150px)] md:w-[300px] md:h-[300px] md:bottom-1/2"
        />
      </section>
      <section
        class="h-1/2 md:h-screen md:w-1/2 md:flex md:flex-col md:justify-center md:items-center"
      >
        <h1 class="font-serif font-bold text-2xl md:text-3xl lg:text-5xl">
          聞きたいコト、ありまうす🐁
        </h1>
        <div class="flex flex-col items-center w-full h-full pt-4 md:h-auto">
          <p class="text-sm font-serif md:text-xl md:mt-4">
            聞きたいコト、気軽に質問しませんか？
          </p>
          <div class="flex flex-col items-center w-[300px]">
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
            <form-button @clickEvent="checkId">Go!! </form-button>
            <p
              class="text-lg pt-4 border-b-[1px] border-gray-400 w-[300px] text-gray-400 md:p"
            >
              > Admin login
            </p>
          </div>
        </div>
      </section>
    </div>
  </navigation-bar>
</template>

<style>
.error-text {
  visibility: inherit;
}
</style>
