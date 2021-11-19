<template>
  <div class="newspaper">
    <div
      v-if="renderNewsList[slideIdx]"
      class="newspaper__highlight hide-sm-show-lg"
    >
      <img :src="renderNewsList[slideIdx].urlToImage" alt="" srcset="" />
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
    <div class="newspaper__wrapper">
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
    <h1 class="tac" v-if="renderNewsList.length === 0">No Matching Results.</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, watch } from "vue";
import News from "@/components/News.vue";
import api from "@/api/index";
const { news } = api;
type NEWS = {
  title: string;
  author: string;
  description: string;
  publishedAt: string;
};
export default defineComponent({
  name: "NewsPaper",
  components: { News },
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
    const newsList = ref([]);
    const renderNewsList = ref([]);
    let slideIdx = ref(0 as number);
    const slidetimer = ref(0 as ReturnType<typeof setTimeout>);
    const getNewsApi = () => {
      news
        .getHeadLines(props.category, "us")
        .then((res) => {
          const timer = setTimeout(() => {
            newsList.value = res.data.articles;
            renderNewsList.value = [...newsList.value];
            slideIdx.value = 0;
            clearTimeout(timer);
          }, 200) as ReturnType<typeof setTimeout>;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    watchEffect(() => {
      getNewsApi();
    });

    watch(
      () => props.keyword,
      (newValue) => {
        renderNewsList.value = [
          ...newsList.value.filter((x) => {
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
        slideIdx.value = 0;
      }
    );
    return {
      renderNewsList,
      slideIdx,
      slidetimer,
    };
  },
  mounted() {
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
}
</style>
