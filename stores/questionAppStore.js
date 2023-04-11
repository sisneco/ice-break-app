import { defineStore } from "pinia";
import { db, rdb } from "~/firebase/firebase";

export const questionStore = defineStore("questionStore", {
  state: () => ({
    id: "",
    groupsData: null,
  }),
  getters: {
    // FireStoreから名前を取り出す
    getNameList() {
      if (this.groupsData === null) {
        return;
      }

      return this.groupsData.name;
    },
  },
  //
  actions: {
    // setter for other file
    setId(id) {
      this.id = id;
    },
    setGroupsData(groupsData) {
      console.log(groupsData);
      this.groupsData = groupsData;
    },
  },
});
