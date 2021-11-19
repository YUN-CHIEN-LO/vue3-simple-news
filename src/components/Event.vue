<template>
  <div class="event">123</div>
</template>

<script>
import { defineComponent } from "vue";
import api from "@/api/index";
const { news } = api;
export default defineComponent({
  name: "Event",
  mounted() {
    news
      .getHeadLines("technology", "us")
      .then((res) => {
        console.log(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
</script>

<style></style>
