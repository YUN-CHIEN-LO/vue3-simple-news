<template>
  <div class="newspaper">
    <div class="newpaper__wrapper">
      <news
        v-for="(news, index) in newsList"
        :key="news.publishedAt"
        :index="index"
        :author="news.author"
        :description="news.description"
        :publishedAt="news.publishedAt"
        :title="news.title"
        :url="news.url"
        :urlToImage="news.urlToImage"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
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
  },
  setup(props) {
    const newsList = ref([]);
    const getNewsApi = () => {
      news
        .getHeadLines(props.category, "us")
        .then((res) => {
          const timer = setTimeout(() => {
            newsList.value = res.data.articles;
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
    return {
      newsList,
    };
  },
});
</script>

<style lang="scss" scoped>
.newspaper {
  &__wrapper {
    width: 100%;
    @include setWaterFall(1);
  }
}
</style>
