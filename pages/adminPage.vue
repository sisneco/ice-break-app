<script setup>
import { auth, db } from "~/firebase/firebase";

// store
const store = adminStore();

let uid = store.uid;
const list = ref(null);

// method
// adminが作成したgroupを全取得
const getIdList = async () => {
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
    if (user !== null) {
    }
    store.setUid(user.uid);
    uid = user.uid;
    getIdList();
  });
};

// created
if (uid === "") {
  getUid();
} else {
  getIdList();
}
</script>

<template>
  <div
    class="flex flex-col w-screen items-center h-[calc(calc(100vh_-_75px))] justify-center"
  >
    <div></div>
  </div>
</template>
