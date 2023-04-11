<template>
  <div class="md:flex md:w-screen">
    <div class="fixed bottom-0 left-0 w-screen md:w-40 md:h-screen md:static">
      <ul
        class="flex justify-center flex-1 w-full bg-sky-200 h-[10vh] items-center md:h-full md:flex-col"
      >
        <li class="w-1/4 text-center text-white">🏚</li>
        <li class="w-1/4 text-center">🐁</li>
        <li class="w-1/4 text-center">a</li>
        <li class="w-1/4 text-center">a</li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>
