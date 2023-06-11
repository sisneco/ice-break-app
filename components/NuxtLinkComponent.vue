<script setup>
const props = defineProps({
  link: String,
  text: String,
  icon: String,
});

const cStore = commonStore();

const routingNow = () => {
  if (props.link === useRoute().fullPath) {
    return;
  }

  cStore.setIsAnimaiton(true);
};
</script>

<template>
  <NuxtLink
    @click="routingNow()"
    :to="link"
    class="w-full h-full flex items-center justify-center"
  >
    <font-awesome-icon :icon="['fas', icon]" class="text-2xl" />
    <span class="hidden md:inline md:pl-2 text-2xl font-serif">
      {{ text }}
    </span>
  </NuxtLink>
</template>
