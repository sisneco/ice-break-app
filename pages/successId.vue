<script setup>
import { rdb } from "@/firebase/firebase";

// store
const questionAppStore = questionStore();

// 選択項目
const selected = ref("");

// セレクトボックスで扱う値
const names = questionAppStore.getNameList;

rdb.ref("question").push();
</script>

<template>
  <div class="flex flex-col h-[90vh] items-center">
    <section class="h-1/2 rounded-b-[150px] w-full mb-8 relative">
      <p class="absolute">戻るボタン</p>
      <p class="bg-orange-100 w-full h-[95%] rounded-b-[150px]"></p>
      <img
        src="@/assets/img/dummy.jpg"
        alt="dummy"
        class="rounded-full w-[150px] h-[150px] absolute -bottom-8 left-[calc(50%_-_75px)]"
      />
    </section>
    <section class="h-1/2">
      <div class="flex flex-col items-center w-full h-full gap-y-8 pt-4">
        <p class="text-sm font-serif">宛先を選んで、質問してみよう！</p>
        <div class="flex flex-col items-center w-full gap-y-4">
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
