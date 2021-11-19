<template>
  <div class="timeline">
    <event />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Event from "@/components/Event.vue";
export default defineComponent({
  name: "TimeLine",
  components: { Event },
});
</script>

<style></style>
