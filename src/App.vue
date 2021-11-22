<template>
  <div class="app">
    <Navbar
      :category="category"
      :keyword="keyword"
      @change:tab="handleClickTab"
      @change:input="handleSearch"
    />
    <NewsPaper :category="category" :keyword="keyword" />
    <BackTop @backtop="scrollTop" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NewsPaper from "./components/NewsPaper.vue";
import Navbar from "./components/Navbar.vue";
import BackTop from "./components/BackTop.vue";

export default defineComponent({
  name: "App",
  components: {
    NewsPaper,
    Navbar,
    BackTop,
  },
  setup() {
    // 分類
    const category = ref("general");
    // 關鍵字
    const keyword = ref("");

    return {
      category,
      keyword,
    };
  },
  mounted() {
    this.$store.dispatch("setIsMobile", () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  },
  methods: {
    /**
     * 捲動至頁頂
     */
    scrollTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },

    /**
     * 處理點擊分頁事件
     *
     * @param {string} category - 分類
     */
    handleClickTab(category: string) {
      this.category = category;
      this.keyword = "";
      this.scrollTop();
    },

    /**
     * 處理搜尋事件
     *
     * @param {string} keyword - 關鍵字
     */
    handleSearch(keyword: string) {
      this.keyword = keyword;
      this.scrollTop();
    },
  },
});
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}
</style>
