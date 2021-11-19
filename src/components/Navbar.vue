<template>
  <div class="navbar">
    <div class="navbar__tabs">
      <div
        v-for="tab in tabList"
        :key="tab"
        :class="{ 'is-active': tab === category }"
        class="navbar__tab"
        @click="handleClickTab(tab)"
      >
        {{ tab.toUpperCase() }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Navbar",
  props: {
    category: {
      type: String,
      default: "general",
    },
  },
  setup() {
    const tabList = ref([
      "general",
      "business",
      "entertainment",
      "health",
      "science",
      "sports",
      "technology",
    ]);
    return {
      tabList,
    };
  },
  methods: {
    handleClickTab(category) {
      console.log(category);
      this.$emit("change:tab", category);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
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
  width: 100vw;
  display: flex;
  transition-duration: 0.3s;
  &__tabs {
    display: flex;
    flex-wrap: wrap;
    transition-duration: 0.3s;
  }
  &__tab {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    &:hover {
      background-color: #ddd;
    }
  }
}
.is-active {
  background-color: #aaa !important;
  font-weight: bold;
}
</style>
