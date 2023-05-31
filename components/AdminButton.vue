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
    class="text-gray-500 text-sm font-bold w-[100px] rounded py-2 shadow bg-gray-300 hover:bg-gray-400"
  >
    <slot></slot>
  </button>
</template>
