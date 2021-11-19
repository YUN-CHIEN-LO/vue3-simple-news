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
    const category = ref("general");
    const keyword = ref("");
    return {
      category,
      keyword,
    };
  },
  methods: {
    scrollTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    handleClickTab(category: string) {
      this.category = category;
      this.keyword = "";
      this.scrollTop();
    },
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
