<template>
  <div class="backtop" @click="handleclick">
    <span class="mdi mdi-arrow-up-bold-circle"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BackTop",
  methods: {
    handleclick(): void {
      this.$emit("backtop");
    },
  },
});
</script>

<style lang="scss">
.backtop {
  position: fixed;
  bottom: 20px;
  right: 0;
  cursor: pointer;
  font-size: 48px;
  margin: 10px;
  & span {
    color: #aaa;
    transition-duration: 0.3s;
  }
  &:hover {
    & span {
      color: #333;
    }
  }
}
</style>
