import { createStore } from "vuex";
import type { NEWS } from "@/type/NEWS";
export default createStore({
  state: {
    favorite: [] as NEWS[],
    isMobile: false as boolean,
  },
  mutations: {
    /**
     * 新增新聞到我的最愛
     *
     * @param {object} state - 狀態
     * @param {object} target - 要新增的新聞
     */
    pushFavorite(state, target: NEWS) {
      state.favorite.push(target);
    },
    /**
     * 從我的最愛移除新聞
     *
     * @param {object} state - 狀態
     * @param {object} target - 要移除的新聞
     */
    popFavorite(state, target: NEWS) {
      const idx = state.favorite.findIndex((x) => x.title === target.title);
      state.favorite.splice(idx, 1);
    },
    /**
     * 設置是否為mobile
     *
     * @param {object} state - 狀態
     * @param {boolean} val - 值
     */
    setIsMobile(state, val: boolean) {
      state.isMobile = val;
    },
  },
  actions: {
    pushFavorite(context, target: NEWS) {
      context.commit("pushFavorite", target);
    },
    popFavorite(context, target: NEWS) {
      context.commit("popFavorite", target);
    },
    setIsMobile(context, val: boolean) {
      context.commit("setIsMobile", val);
    },
  },
  getters: {
    favorite: (state) => state.favorite,
    isMobile: (state) => state.isMobile,
  },
});
