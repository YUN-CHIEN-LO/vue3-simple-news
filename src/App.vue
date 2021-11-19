<template>
  <div>
    <Navbar :category="category" @change:tab="handleClickTab" />
    <NewsPaper :category="category" />
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
    return {
      category,
    };
  },
  methods: {
    handleClickTab(category: string) {
      this.category = category;
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
