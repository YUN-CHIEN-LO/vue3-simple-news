<template>
  <div class="newspaper">
    <div class="newpaper__wrapper">
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

<script>
import { defineComponent, ref, watchEffect, watch } from "vue";
import News from "@/components/News.vue";
import api from "@/api/index";
const { news } = api;
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
    const getNewsApi = () => {
      news
        .getHeadLines(props.category, "us")
        .then((res) => {
          const timer = setTimeout(() => {
            newsList.value = res.data.articles;
            renderNewsList.value = [...newsList.value];
            clearTimeout(timer);
          }, 200);
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
      (newValue, oldValue) => {
        renderNewsList.value = [
          ...newsList.value.filter((x) => {
            const target = `${x.title}${x.author}${
              x.description
            }${x.publishedAt.slice(0, 10)}`.replace(/\s/g, "");
            return target
              .toLowerCase()
              .includes(newValue.toLowerCase().replace(/\s/g, ""));
          }),
        ];
      }
    );
    return {
      renderNewsList,
    };
  },
});
</script>

<style lang="scss" scoped>
.newspaper {
  min-width: 410px;
  &__wrapper {
    width: 100%;
    @include setWaterFall(1);
  }
}
</style>
