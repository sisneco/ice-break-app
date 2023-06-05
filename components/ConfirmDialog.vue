<script setup>
const props = defineProps({
  text: String,
});
</script>

<template>
  <div id="overlay">
    <div
      class="w-[40vw] h-[40vh] bg-white z-10 flex flex-col justify-center items-center"
    >
      <h2>{{ text }}</h2>
      <button
        @click="$emit('clickEvent')"
        id="btn"
        class="text-gray-500 text-sm font-bold w-[100px] rounded py-2 shadow bg-gray-300 hover:bg-gray-400"
      >
        <slot></slot>
      </button>
    </div>
  </div>
</template>

<style scoped>
#overlay {
  z-index: 1;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
