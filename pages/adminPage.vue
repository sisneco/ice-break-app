<script setup>
import { auth, db } from "~/firebase/firebase";

// store
const store = adminStore();

let uid = store.uid;
const list = ref(null);
const selected = ref("");

// method
// adminが作成したgroupを全取得
const getGroupIdList = async () => {
  const querySnapshot = await db
    .collection("groups")
    .where("admin", "==", uid)
    .get();

  let arr = new Array();

  querySnapshot.forEach((doc) => {
    let tmp = null;
    tmp = doc.data();
    tmp.id = doc.id;
    arr.push(tmp);
  });

  list.value = arr;
};

// adminのUIDを取得する
const getUid = () => {
  auth.onAuthStateChanged(async (user) => {
    if (user === null) {
      return;
    }
    store.setUid(user.uid);
    uid = user.uid;
    getGroupIdList();
  });
};

// created
if (uid === "") {
  getUid();
} else {
  getGroupIdList();
}

// ログインユーザーが登録しているグループIDを全件取得
const getAllGroupId = () => {
  const arr = list.value;

  if (arr === null) {
    return "";
  }

  return arr.map((value) => value["id"]);
};

// ユーザーが選択したIDに当てはまるユーザー名を取得
const getSelectedName = () => {
  if (selected.value === "" || list.value === "") {
    return;
  }

  const arr = list.value.filter((value) => value["id"] === selected.value);

  return arr[0].name;
};

// ログアウト処理 -> 管理者ログインページに遷移
const logout = () => {
  auth.signOut().then(() => {
    useRouter().push("/admin");
  });
};
</script>

<template>
  <div
    class="flex flex-col w-screen items-center h-[calc(calc(100vh_-_75px))] px-8 font-notojp"
  >
    <div class="w-full border-b-2 py-4">
      <select
        class="w-[300px] py-2 pl-2 rounded-lg text-lg border-gray-100 border-2 shadow-sm mt outline-none cursor-pointer"
        v-model="selected"
      >
        <option disabled value="">宛先を選んでください</option>
        <option v-for="id in getAllGroupId()" key="id">{{ id }}</option>
      </select>

      <button
        @click="logout()"
        id="btn"
        class="text-white text-lg font-bold w-[100px] rounded py-2 shadow bg-sky-400 hover:bg-sky-300 ml-16"
      >
        LogOut
      </button>
    </div>

    <div class="w-full mt-4 flex justify-around">
      <section
        class="w-[45%] border-2 h-[700px] bg-white shadow flex flex-col gap-y-1 p-2"
      >
        <h2
          class="font-bold text-4xl w-full border-b-2 pb-2 font-cormorant drop-shadow-md"
        >
          UserName ~
        </h2>
        <p
          v-for="name in getSelectedName()"
          key="name"
          class="py-2 border-b-2 text-xl"
        >
          {{ name }}
        </p>
      </section>
      <section class="w-[45%] border-2 h-[700px] bg-white shadow"></section>
    </div>
  </div>
</template>
