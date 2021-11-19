import { createStore } from "vuex";
import type { NEWS } from "@/type/NEWS";
export default createStore({
  state: {
    favorite: [] as NEWS[],
  },
  mutations: {
    pushFavorite(state, target: NEWS) {
      state.favorite.push(target);
    },
    popFavorite(state, target: NEWS) {
      const idx = state.favorite.findIndex((x) => x.title === target.title);
      state.favorite.splice(idx, 1);
    },
  },
  actions: {
    pushFavorite(context, target: NEWS) {
      context.commit("pushFavorite", target);
    },
    popFavorite(context, target: NEWS) {
      context.commit("popFavorite", target);
    },
  },
  getters: {
    favorite: (state) => state.favorite,
  },
});
