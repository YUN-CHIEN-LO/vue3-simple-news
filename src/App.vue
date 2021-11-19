<template>
  <div class="app">
    <Navbar
      :category="category"
      :keyword="keyword"
      @change:tab="handleClickTab"
      @change:input="handleSearch"
    />
    <NewsPaper :category="category" :keyword="keyword" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NewsPaper from "./components/NewsPaper.vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    NewsPaper,
    Navbar,
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
    handleClickTab(category: string) {
      this.category = category;
      this.keyword = "";
    },
    handleSearch(keyword: string) {
      console.log(keyword);
      this.keyword = keyword;
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
