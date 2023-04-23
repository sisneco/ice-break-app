<script setup>
// => value
const emit = defineEmits();

let btnElement = null;

// => methods
const clickProcess = async () => {
  if (btnElement === null) {
    btnElement = document.getElementById("btn");
  }

  const btnClass = btnElement.classList;

  btnClass.add("bg-sky-300");
  btnClass.add("disabled");
  btnClass.add("pointer-events-none");
  btnClass.remove("bg-sky-400");

  await emit("clickEvent");

  btnClass.add("bg-sky-400");
  btnClass.remove("disabled");
  btnClass.remove("pointer-events-none");
  btnClass.remove("bg-sky-300");
};
</script>

<template>
  <button
    @click="clickProcess"
    id="btn"
    class="text-white text-lg font-bold w-[100px] rounded py-2 mt-4 ml-[196px] shadow bg-sky-400 hover:bg-sky-300"
  >
    Go!!
  </button>
</template>
