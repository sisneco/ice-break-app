<template>
  <div class="md:flex md:w-screen overflow-hidden">
    <div
      class="bg-sky-200 fixed bottom-0 left-0 w-screen md:w-[15vw] md:min-w-[200px] md:h-screen md:static md:shadow-md md:rounded-r-2xl"
    >
      <ul
        class="flex justify-center flex-1 w-full h-[10vh] items-center md:h-full md:flex-col md:items-start md:pl-2 md:justify-start"
      >
        <h1 class="hidden md:block font-bold font-serif text-4xl py-4 ml-2">
          IceBreak
        </h1>
        <li>
          <h2
            class="hidden md:block text-2xl font-sans font-semibold text-gray-500"
          >
            Menu
          </h2>
        </li>
        <NavigationBarTagLi>
          <font-awesome-icon :icon="['fas', 'house']" class="text-2xl" />
          <span class="hidden md:inline md:pl-2 text-4xl font-serif">
            Home
          </span>
        </NavigationBarTagLi>
        <NavigationBarTagLi>
          <font-awesome-icon :icon="['fas', 'ear-listen']" class="text-2xl" />
          <span class="hidden md:inline md:pl-2 text-4xl font-serif"
            >Question
          </span>
        </NavigationBarTagLi>
      </ul>
    </div>
    <slot />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.8s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(1000px);
}
</style>
