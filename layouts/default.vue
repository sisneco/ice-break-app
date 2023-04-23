<template>
  <div class="md:flex md:w-screen md:flex-col overflow-hidden">
    <div
      class="bg-sky-200 fixed bottom-0 left-0 w-screen md:w-screen md:h-[75px] md:static md:shadow-md"
    >
      <ul
        class="flex justify-center flex-1 w-full items-center h-[10vh] md:h-full md:items-start md:pl-2 md:justify-start md:w-full"
      >
        <h1 class="hidden md:block font-bold font-serif text-4xl py-4 mx-2">
          IceBreak
        </h1>
        <NavigationBarTagLi>
          <NuxtLink to="/">
            <font-awesome-icon :icon="['fas', 'house']" class="text-2xl" />
            <span class="hidden md:inline md:pl-2 text-2xl font-serif">
              Home
            </span>
          </NuxtLink>
        </NavigationBarTagLi>
        <NavigationBarTagLi>
          <font-awesome-icon :icon="['fas', 'ear-listen']" class="text-2xl" />
          <span class="hidden md:inline md:pl-2 text-2xl font-serif"
            >Question
          </span>
        </NavigationBarTagLi>
        <NavigationBarTagLi>
          <NuxtLink to="/admin">
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
