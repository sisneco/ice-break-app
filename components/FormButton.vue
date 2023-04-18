<script setup>
const isAnimation = ref(false);

const emit = defineEmits();

const clickProcess = async () => {
  document.getElementById("btn").classList.add("bg-sky-300");
  document.getElementById("btn").classList.remove("bg-sky-400");

  await emit("clickEvent");

  document.getElementById("btn").classList.add("bg-sky-400");
  document.getElementById("btn").classList.remove("bg-sky-300");
};
</script>

<template>
  <button
    @click="clickProcess"
    id="btn"
    class="text-white text-lg font-bold w-[100px] rounded py-2 mt-4 ml-[196px] shadow bg-sky-400"
  >
    Go!!
  </button>
</template>
