<template>
  <NewsPaper />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewsPaper from "./components/NewsPaper.vue";

export default defineComponent({
  name: "App",
  components: {
    NewsPaper,
  },
});
</script>

<style lang="scss">
</style>
