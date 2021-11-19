<template>
  <div class="news">
    <div class="news__wrapper">
      <h3 class="cur-pointer" @click="viewNews">{{ title }}</h3>
      <p>{{ publishedAt.slice(0, 10) }}</p>
      <hr />
      <p>{{ description }}</p>
      <img
        class="cur-pointer"
        :src="urlToImage"
        alt=""
        srcset=""
        @click="viewNews"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "News",
  props: {
    author: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    publishedAt: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    urlToImage: {
      type: String,
      default: "",
    },
  },
  methods: {
    viewNews() {
      window.open(this.url, "_blank").focus();
    },
  },
});
</script>

<style lang="scss" scoped>
.news {
  width: 100%;
  display: block;
  word-wrap: break-word;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
  border: solid 1px #fff;
  border-bottom: solid 2px #333;
  counter-increment: news;
  animation: fadeIn 0.3s ease-in;
  &__wrapper {
    margin: 20px 0px;
    padding: 10px;
  }
  & img {
    width: 100%;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
