<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.8s;
}
.layout-enter-from,
.layout-leave-to {
  transform: translateX(800px);
  opacity: 0;
}
</style>
