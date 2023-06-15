<script setup>
const props = defineProps({
  text: String,
  okButtonText: String,
  cancelButtonText: String,
});

const isVisible = ref(false);

const val = ref("");

const visibleDialog = (param) => {
  isVisible.value = true;
  val.value = param;
};

const hideDialog = () => {
  isVisible.value = false;
};

defineExpose({
  visibleDialog,
});
</script>

<template>
  <div :class="[{ hidden: !isVisible }, { flex: isVisible }]" class="over-lay">
    <div
      class="w-[40vw] h-[40vh] bg-white z-10 flex flex-col justify-center items-center"
    >
      <h2 class="text-2xl">{{ text }}</h2>
      <div class="flex gap-x-4 mt-8">
        <button
          @click="hideDialog()"
          id="btn"
          class="text-gray-500 text-sm font-bold w-[100px] rounded py-2 shadow bg-red-300 hover:bg-red-400"
        >
          {{ cancelButtonText }}
        </button>

        <button
          @click="$emit('okEvent')"
          id="btn"
          class="text-gray-500 text-sm font-bold w-[100px] rounded py-2 shadow bg-sky-300 hover:bg-sky-400"
        >
          {{ okButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.over-lay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  overflow: hidden;

  align-items: center;
  justify-content: center;
}
</style>
