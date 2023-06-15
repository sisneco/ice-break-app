<script setup>
import { auth, db, rdb } from "~/firebase/firebase";
import ConfirmDialog from "~/components/ConfirmDialog.vue";

// store
const store = adminStore();

let uid = store.uid;
const groupList = ref(null); // 管理者の全グループIDリスト
const selectedId = ref(""); // 管理者の選択しているID
const questionList = ref([]); // 質問リスト
const userName = ref(""); // 追加する人の名前

const nameList = ref("");

// ダイアログコンポーネント関連
const dialogText = ref("");
const deleteDialog = ref();

const deleteName = ref("");

dialogText.value = "こんにちは！";

// method
const onButtonDelete = (name) => {
  dialogText.value = name + "さんを削除しますか？";
  deleteName.value = name;

  deleteDialog.value.visibleDialog();
};

// ユーザー追加
const addUserName = () => {
  if (userName.value === "" || selectedId.value === "") {
    return;
  }

  nameList.value.push(userName.value);

  const groupsRef = db.collection("groups").doc(selectedId.value);

  groupsRef.update({
    admin: uid,
    name: nameList.value,
  });
};

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

  groupList.value = arr;
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
  const arr = groupList.value;

  if (arr === null) {
    return "";
  }

  return arr.map((value) => value["id"]);
};

// ユーザーが選択したIDに当てはまるユーザー名と質問を取得
const getSelectedNameList = () => {
  if (selectedId.value === "" || groupList.value === "") {
    return;
  }

  const arr = groupList.value.filter(
    (value) => value["id"] === selectedId.value
  );

  nameList.value = arr[0].name;

  return arr[0].name;
};

function deleteUser() {
  const delName = deleteName.value;

  nameList.value = nameList.value.filter((v) => v != delName);

  const groupsRef = db.collection("groups").doc(selectedId.value);

  groupsRef.update({
    admin: uid,
    name: nameList.value,
  });
}

// 質問を取得
const getQuestionList = () => {
  rdb.ref(selectedId.value).on("value", (snapshots) => {
    const value = Object.values(snapshots.val());

    questionList.value = value;
  });
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
    <ConfirmDialog
      :text="dialogText"
      okButtonText="削除"
      cancelButtonText="キャンセル"
      @okEvent="deleteUser()"
      ref="deleteDialog"
    ></ConfirmDialog>
    <div class="w-full border-b-2 py-4">
      <select
        class="w-[300px] py-2 pl-2 rounded-lg text-lg border-gray-100 border-2 shadow-sm mt outline-none cursor-pointer"
        v-model="selectedId"
        @change="getQuestionList()"
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
      <table
        class="w-[45%] border-2 h-[700px] bg-white shadow flex flex-col gap-y-1 p-2"
      >
        <div class="flex border-b-2 pb-2 items-center gap-x-4">
          <h2 class="font-bold text-4xl font-cormorant inline">User Name</h2>
          <input
            v-model="userName"
            type="text"
            class="w-[350px] py-4 pl-2 rounded-lg border-gray-100 border-2 shadow-sm outline-none none"
            placeholder="追加するユーザー名を入力してください"
          />

          <AdminButton
            :class="{ 'disabled:bg-gray-100': userName === '' }"
            @clickEvent="addUserName()"
          >
            追加
          </AdminButton>
        </div>
        <tr
          v-for="name in getSelectedNameList()"
          key="name"
          class="py-2 border-b-2 text-xl w-full flex gap-4 items-center"
        >
          <span class="w-[150px] text-center">
            {{ name }}
          </span>
          <AdminButton> 編集 </AdminButton>
          <AdminButton @clickEvent="onButtonDelete(name)"> 削除 </AdminButton>
        </tr>
      </table>
      <section
        class="w-[45%] border-2 h-[700px] bg-white shadow flex flex-col gap-y-1 p-2"
      >
        <h2
          class="font-bold text-4xl w-full border-b-2 pb-2 font-cormorant drop-shadow-md"
        >
          Question List
        </h2>
        <p
          v-for="list in questionList"
          key="val"
          class="py-2 border-b-2 text-xl"
        >
          宛先： {{ list.name }} コメント： {{ list.text }}
        </p>
      </section>
    </div>
  </div>
</template>
