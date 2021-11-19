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
    <div class="navbar__search">
      <input
        type="text"
        v-model="searchKeyWord"
        placeholder="search"
        @input="handleSearch"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

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
  setup(props) {
    const tabList = ref([
      "general",
      "business",
      "entertainment",
      "health",
      "science",
      "sports",
      "technology",
    ]);
    let searchKeyWord = ref("");
    const searchDebounceTimer = ref(0 as ReturnType<typeof setTimeout>);
    watchEffect(() => {
      searchKeyWord.value = props.keyword;
    });
    return {
      tabList,
      searchKeyWord,
      searchDebounceTimer,
    };
  },
  methods: {
    handleClickTab(category: string) {
      this.$emit("change:tab", category);
    },
    handleSearch() {
      const _ = this;
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
    &:hover {
      background-color: #ddd;
    }
  }
  &__search {
    padding: 10px;
  }
}
.is-active {
  background-color: #aaa !important;
  font-weight: bold;
}
</style>
