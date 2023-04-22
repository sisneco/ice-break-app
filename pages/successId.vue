<script setup>
import { rdb } from "@/firebase/firebase";

// store
const questionAppStore = questionStore();

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
      </div>
    </section>
  </div>
</template>
