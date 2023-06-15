<script setup>
import { storeToRefs } from "pinia";

const cStore = storeToRefs(commonStore());

const isAnimation = ref(false);

watch(cStore.isAnimation, () => {
  window.setTimeout(() => {
    commonStore().setIsAnimaiton(false);
  }, 2000);
});
</script>

<template>
  <div class="md:flex md:w-screen md:flex-col overflow-hidden bg">
    <div
      class="bg-sky-200 fixed bottom-0 left-0 w-screen md:w-screen h-[75px] md:static md:shadow-md z-50"
    >
      <ul
        :class="{ 'pointer-events-none': cStore.isAnimation.value }"
        class="flex justify-center flex-1 w-full items-center h-full md:items-start md:pl-2 md:justify-start md:w-full md:gap-x-8"
      >
        <h1
          class="hidden md:block font-cormorant text-5xl py-4 mx-2 font-semibold text-gray-500"
        >
          IceBreakApp
        </h1>
        <NavigationBarTagLi>
          <NuxtLinkComponent
            link="/"
            text="Home"
            icon="house"
          ></NuxtLinkComponent>
        </NavigationBarTagLi>
        <NavigationBarTagLi>
          <NuxtLinkComponent
            link="/question"
            text="Question"
            icon="ear-listen"
          ></NuxtLinkComponent>
        </NavigationBarTagLi>
        <NavigationBarTagLi>
          <NuxtLinkComponent
            link="/admin"
            text="Admin"
            icon="person-circle-check"
          ></NuxtLinkComponent>
        </NavigationBarTagLi>
      </ul>
    </div>
    <slot />
  </div>
</template>

<style>
.bg {
  background-image: url("@/assets/img/homeImg.jpg");
  background-position: 20%;
}
</style>
