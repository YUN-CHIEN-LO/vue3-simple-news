<template>
  <div class="news">
    <div class="news__wrapper">
      <h3 class="cur-pointer" @click="viewNews">{{ title }}</h3>
      <div class="flex flex-aic">
        <p>{{ publishedAt.slice(0, 10) }}</p>
        <span
          v-show="favorite.findIndex((x) => x.title === title) === -1"
          class="mdi mdi-cards-heart-outline flex-mla"
          @click="toggleFavorite"
        ></span>
        <span
          v-show="favorite.findIndex((x) => x.title === title) !== -1"
          class="mdi mdi-cards-heart flex-mla"
          @click="toggleFavorite"
        ></span>
      </div>
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

<script lang="ts">
import { NEWS } from "@/type/NEWS";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    favorite: NEWS[];
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
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
  computed: mapGetters(["favorite"]),
  methods: {
    viewNews() {
      window.open(this.url, "_blank")?.focus();
    },
    toggleFavorite() {
      const exist =
        this.favorite.findIndex((x: NEWS) => x.title === this.title) !== -1;
      const target = {
        title: this.title,
        author: this.author,
        description: this.description,
        publishedAt: this.publishedAt,
        url: this.url,
        urlToImage: this.urlToImage,
      } as NEWS;
      if (exist) {
        this.$store.dispatch("popFavorite", target);
      } else {
        this.$store.dispatch("pushFavorite", target);
      }
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
