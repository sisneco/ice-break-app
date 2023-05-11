import { defineStore } from "pinia";

export const adminStore = defineStore("adminStore", {
  state: () => ({
    uid: "",
  }),
  getters: {},
  actions: {
    setUid(uid) {
      this.uid = uid;
    },
  },
});
