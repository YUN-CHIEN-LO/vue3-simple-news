<template>
  <div class="newspaper">
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
</template>

<script>
import { defineComponent, ref } from "vue";
import News from "@/components/News.vue";
import api from "@/api/index";
const { news } = api;
export default defineComponent({
  name: "NewsPaper",
  components: { News },
  setup() {
    const newsList = ref([]);
    return {
      newsList,
    };
  },
  created() {
    news
      .getHeadLines("technology", "us")
      .then((res) => {
        console.log(res.data.articles);
        this.newsList = res.data.articles;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
</script>

<style lang="scss" scoped>
.newspaper {
  @include setWaterFall(1);
}

/* Extra small devices (phones, 500px and down) */
@media only screen and (max-width: 500px) {
  .newspaper {
    margin: 50px 0px;
  }
}

/* Small devices (portrait tablets and large phones, 500px and up) */
@media only screen and (min-width: 500px) {
  .newspaper {
    margin: 50px;
  }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .newspaper {
    margin: 50px 80px;
    @include setWaterFall(2);
  }
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .newspaper {
    margin: 50px 100px;
    @include setWaterFall(3);
  }
}
</style>
