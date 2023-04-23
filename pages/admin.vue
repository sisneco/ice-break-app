<template>
  <div
    class="flex flex-col h-[90vh] md:w-[calc(calc(100vw_-_160px))] items-center md:flex-row-reverse md:h-screen mt-8"
  >
    <div>
      <h1 class="text-3xl font-serif font-thin">IceBreakApp Login</h1>
      <p class="text-xs text-center mt-2">
        こちらは管理者専用のログインページとなります。<br />
        一般機能はログインをしなくても
        <br />サービスを受けることができます。
      </p>
    </div>
    <div class="flex flex-col gap-y-4 mt-12">
      <div class="flex flex-col gap-y-2">
        <label for="id" class="text-base text-gray-500">ログインID</label>
        <input
          type="text"
          class="w-[300px] py-4 pl-2 rounded-lg text-lg border-gray-100 border-2 shadow-sm outline-none"
          placeholder="ログインIDを入力してください"
        />
      </div>

      <div class="flex flex-col gap-y-2">
        <label for="id" class="text-base text-gray-500">パスワード</label>
        <input
          type="text"
          class="w-[300px] py-4 pl-2 rounded-lg text-lg border-gray-100 border-2 shadow-sm outline-none"
          placeholder="パスワードを入力してください"
        />
      </div>

      <button
        class="bg-orange-100 py-4 rounded-full mt-4 text-gray-700 text-xl flex justify-center items-center relative"
      >
        <span> ログイン </span>
        <font-awesome-icon
          :icon="['fas', 'angle-right']"
          class="absolute right-8"
        />
      </button>
    </div>
  </div>
</template>
