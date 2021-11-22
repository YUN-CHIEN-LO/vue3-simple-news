import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { NEWS } from "./src/type/NEWS";

declare module "@vue/runtime-core" {
  interface State {
    favorite: NEWS[];
    isMobile: boolean;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
