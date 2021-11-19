<template>
  <div class="news">
    <div class="news__wrapper">
      <!-- 標題 -->
      <h3 class="cur-pointer" @click="viewNews">{{ title }}</h3>
      <!-- 資料 -->
      <div class="flex flex-aic">
        <!-- 日期 -->
        <p>{{ publishedAt.slice(0, 10) }}</p>
        <!-- 我的最愛 -->
        <span
          v-show="favorite.findIndex((x) => x.title === title) === -1"
          class="mdi mdi-cards-heart-outline flex-mla cur-pointer"
          @click="toggleFavorite"
        ></span>
        <span
          v-show="favorite.findIndex((x) => x.title === title) !== -1"
          class="mdi mdi-cards-heart flex-mla cur-pointer"
          @click="toggleFavorite"
        ></span>
      </div>
      <hr />
      <!-- 敘述 -->
      <p>{{ description }}</p>
      <!-- 圖片 -->
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
    // 作者
    author: {
      type: String,
      default: "",
    },
    // 敘述
    description: {
      type: String,
      default: "",
    },
    // 發布時間
    publishedAt: {
      type: String,
      default: "",
    },
    // 標題
    title: {
      type: String,
      default: "",
    },
    // 連結
    url: {
      type: String,
      default: "",
    },
    // 圖片
    urlToImage: {
      type: String,
      default: "",
    },
  },
  computed: mapGetters(["favorite"]),
  methods: {
    /**
     * 檢視新聞
     */
    viewNews() {
      window.open(this.url, "_blank")?.focus();
    },
    /**
     * 新增/移除我的最愛
     */
    toggleFavorite() {
      // 是否在我的最愛中
      const exist =
        this.favorite.findIndex((x: NEWS) => x.title === this.title) !== -1;
      // 目標新聞物件
      const target = {
        title: this.title,
        author: this.author,
        description: this.description,
        publishedAt: this.publishedAt,
        url: this.url,
        urlToImage: this.urlToImage,
      } as NEWS;

      if (exist) {
        // 移除
        this.$store.dispatch("popFavorite", target);
      } else {
        // 新增
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
