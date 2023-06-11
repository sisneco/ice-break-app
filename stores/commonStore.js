import { defineStore } from "pinia";

export const commonStore = defineStore("commonStore", {
  state: () => ({
    isAnimation: false,
  }),
  getters: {},
  actions: {
    setIsAnimaiton(isAnimation) {
      this.isAnimation = isAnimation;
    },
  },
});
