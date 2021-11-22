<template>
  <div class="newspaper">
    <div v-if="isLoading" class="newspaper__loading">
      <span class="mdi mdi-reload"></span>
    </div>
    <!-- 頭條 -->
    <div
      v-if="!isLoading && renderNewsList[slideIdx]"
      v-show="!showFavorite"
      class="newspaper__highlight hide-sm-show-lg"
    >
      <!-- 圖片 -->
      <img :src="renderNewsList[slideIdx].urlToImage" alt="" srcset="" />
      <!-- 文字 -->
      <div
        class="newspaper__highlight__text"
        @click="window.open(renderNewsList[0].url, '_blank').focus()"
      >
        <p>
          {{ renderNewsList[slideIdx].author }} |
          {{ renderNewsList[slideIdx].publishedAt.slice(0, 10) }}
        </p>
        <h1>{{ renderNewsList[slideIdx].title }}</h1>
      </div>
    </div>

    <!-- 新聞列 -->
    <div v-if="!isLoading" class="newspaper__wrapper">
      <news
        v-for="news in renderNewsList"
        :key="news.publishedAt"
        :author="news.author"
        :description="news.description"
        :publishedAt="news.publishedAt"
        :title="news.title"
        :url="news.url"
        :urlToImage="news.urlToImage"
      />
    </div>
    <!-- 提示文字 -->
    <h1 class="tac" v-if="!isLoading && renderNewsList.length === 0">
      No Matching Results.
    </h1>
    <h1 class="tac" v-if="!isLoading && favorite.length === 0 && showFavorite">
      No Favorite News.
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { mapGetters } from "vuex";
import News from "@/components/News.vue";
import type { NEWS } from "@/type/NEWS";
import api from "@/api/index";
const { news } = api;
export default defineComponent({
  name: "NewsPaper",
  props: {
    // 分類
    category: {
      type: String,
      default: "general",
    },
    // 關鍵字
    keyword: {
      type: String,
      default: "",
    },
  },
  components: { News },
  setup(props) {
    // 所有新聞陣列
    const newsList = ref([] as NEWS[]);
    // 渲染的新聞陣列
    const renderNewsList = ref([] as NEWS[]);
    // 頭條新聞idx
    let slideIdx = ref(0 as number);
    // 頭寮新聞timer
    const slidetimer = ref(0 as ReturnType<typeof setTimeout>);
    // 是否顯示我的最愛
    let showFavorite = ref(false);
    // loading狀態
    let isLoading = ref(false);

    // 更新新聞資料
    const handleLoad = (data: NEWS[]) => {
      newsList.value = data.map((x: NEWS) => x);
      renderNewsList.value = [...newsList.value];
      slideIdx.value = 0;
      const timer = setTimeout(() => {
        isLoading.value = false;
        clearTimeout(timer);
      }, 500);
    };

    // 取得新聞API
    const getNewsApi = () => {
      isLoading.value = true;

      news
        .getHeadLines(props.category, "us")
        .then((res) => {
          handleLoad(res.data.articles);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 監聽切換分類事件
    watchEffect(() => {
      if (props.category === "favorite") {
        showFavorite.value = true;
      } else {
        showFavorite.value = false;
        getNewsApi();
      }
    });

    return {
      newsList,
      renderNewsList,
      slideIdx,
      slidetimer,
      showFavorite,
      isLoading,
    };
  },
  computed: mapGetters(["favorite"]),
  watch: {
    // 監聽顯示我的最愛
    showFavorite(newValue) {
      const arr = newValue ? this.favorite : this.newsList;
      this.renderNewsList = [...arr];
      this.slideIdx = 0;
    },
    // 監聽搜尋關鍵字
    keyword(newValue) {
      const arr = this.showFavorite ? this.favorite : this.newsList;
      this.renderNewsList = [
        ...arr.filter((x: NEWS) => {
          const { title, author, description, publishedAt } = x as NEWS;
          const target = `${title}${author}${description}${publishedAt.slice(
            0,
            10
          )}`.replace(/\s/g, "");
          return target
            .toLowerCase()
            .includes(newValue.toLowerCase().replace(/\s/g, ""));
        }),
      ];
      this.slideIdx = 0;
    },
  },
  mounted() {
    // 播放頭條新聞
    this.slidetimer = setInterval(() => {
      if (this.slideIdx + 1 < this.renderNewsList.length) this.slideIdx++;
      else {
        this.slideIdx = 0;
      }
    }, 10000);
  },
});
</script>

<style lang="scss" scoped>
.newspaper {
  min-width: 410px;
  &__highlight {
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    & img {
      width: 100%;
    }
    &__text {
      position: absolute;
      bottom: 0;
      left: 0;
      cursor: pointer;
      width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.5);
      & h1,
      & p {
        color: #fff;
        text-align: right;
      }
      transition-duration: 0.3s;
    }
  }
  &__loading {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    & span {
      font-size: 48px;
      &:before {
        animation: loading 1s linear infinite;
      }
    }
  }
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
