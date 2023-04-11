<template>
  <button
    @click="$emit('clickEvent')"
    class="bg-sky-400 text-white text-lg font-bold w-[100px] rounded py-2 mt-4 ml-[196px] shadow"
  >
    <slot></slot>
  </button>
</template>
