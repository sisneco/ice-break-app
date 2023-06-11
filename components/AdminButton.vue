<script setup>
// => value
const emit = defineEmits();
</script>

<template>
  <button
    @click="$emit('clickEvent')"
    id="btn"
    class="text-gray-500 text-sm font-bold w-[100px] rounded py-2 shadow bg-gray-300 hover:bg-gray-400"
  >
    <slot></slot>
  </button>
</template>
