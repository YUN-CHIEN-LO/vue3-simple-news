<template>
  <div class="navbar">
    <!-- 選單 -->
    <div
      class="navbar__tabs"
      :style="toggleMenu ? { overflow: 'visible' } : {}"
    >
      <div
        v-for="tab in tabList"
        :key="tab"
        :class="{ 'is-active': tab === category }"
        class="navbar__tab"
        @click="handleClickTab($event, tab, tab === category)"
      >
        {{ tab.toUpperCase() }}
      </div>
    </div>
    <!-- 搜尋 -->
    <div class="navbar__search">
      <input
        type="text"
        v-model="searchKeyWord"
        placeholder="search"
        @input="handleSearch"
      />
    </div>
    <!-- 我的最愛 -->
    <span
      v-show="favorite.length > 0"
      class="mdi mdi-cards-heart cur-pointer"
      @click="handleClickTab($event, 'favorite', false)"
    ></span>
    <span
      v-show="favorite.length === 0"
      class="mdi mdi-cards-heart-outline"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "Navbar",
  props: {
    category: {
      type: String,
      default: "general",
    },
    keyword: {
      type: String,
      default: "",
    },
  },
  computed: mapGetters(["favorite", "isMobile"]),
  setup(props) {
    // 選單陣列
    const tabList = ref([
      "general",
      "business",
      "entertainment",
      "health",
      "science",
      "sports",
      "technology",
    ]);
    // 關鍵字
    let searchKeyWord = ref("");
    // 關鍵字debounce timer
    const searchDebounceTimer = ref(0 as ReturnType<typeof setTimeout>);
    // 收合選單
    const toggleMenu = ref(false);
    // 監聽搜尋
    watchEffect(() => {
      searchKeyWord.value = props.keyword;
    });
    return {
      tabList,
      searchKeyWord,
      searchDebounceTimer,
      toggleMenu,
    };
  },
  mounted() {
    const _ = this;
    // 監聽點擊選單以外的動作
    document.body.addEventListener("click", () => {
      _.toggleMenu = false;
    });
  },
  methods: {
    /**
     * 處理點擊分類事件
     *
     * @param {string} category - 分類
     */
    handleClickTab(event: Event, category: string, isActive: boolean) {
      event.stopPropagation();
      this.toggleMenu = isActive ? true : false;
      this.$emit("change:tab", category);
    },

    /**
     * 處理搜尋事件
     */
    handleSearch() {
      const _ = this;
      // 簡單debounce
      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer);
      }
      this.searchDebounceTimer = setTimeout(() => {
        _.$emit("change:input", this.searchKeyWord);
      }, 300);
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1000;
  height: 45px;
  width: 100%;
  display: flex;
  transition-duration: 0.3s;
  padding-top: 10px;
  min-width: 410px;
  &__tabs {
    display: flex;
    flex-wrap: wrap;
    transition-duration: 0.3s;
  }
  &__tab {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    &:hover,
    &:active {
      background-color: #ddd;
    }
  }
  &__search {
    margin-left: auto;
    padding: 5px;
    & input {
      height: 30px;
    }
  }
  & .mdi {
    font-size: 32px;
  }
}
.is-active {
  background-color: #aaa !important;
  font-weight: bold;
}
</style>
