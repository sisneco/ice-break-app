<template>
  <div class="md:flex md:w-screen md:flex-col overflow-hidden bg">
    <div
      class="bg-sky-100 fixed bottom-0 left-0 w-screen md:w-screen h-[75px] md:static md:shadow-md z-50"
    >
      <ul
        class="flex justify-center flex-1 w-full items-center h-full md:items-start md:pl-2 md:justify-start md:w-full md:gap-x-8"
      >
        <h1
          class="hidden md:block font-cormorant text-5xl py-4 mx-2 font-semibold text-gray-500"
        >
          IceBreakApp
        </h1>
        <NavigationBarTagLi>
          <NuxtLink
            to="/"
            class="w-full h-full flex items-center justify-center"
          >
            <font-awesome-icon :icon="['fas', 'house']" class="text-2xl" />
            <span class="hidden md:inline md:pl-2 text-2xl font-serif">
              Home
            </span>
          </NuxtLink>
        </NavigationBarTagLi>
        <NavigationBarTagLi>
          <NuxtLink
            to="/question"
            class="w-full h-full flex items-center justify-center"
          >
            <font-awesome-icon :icon="['fas', 'ear-listen']" class="text-2xl" />
            <span class="hidden md:inline md:pl-2 text-2xl font-serif"
              >Question
            </span>
          </NuxtLink>
        </NavigationBarTagLi>
        <NavigationBarTagLi>
          <NuxtLink
            to="/admin"
            class="w-full h-full flex items-center justify-center"
          >
            <font-awesome-icon
              :icon="['fas', 'person-circle-check']"
              class="text-2xl"
            />
            <span class="hidden md:inline md:pl-2 text-2xl font-serif">
              Admin
            </span>
          </NuxtLink>
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
