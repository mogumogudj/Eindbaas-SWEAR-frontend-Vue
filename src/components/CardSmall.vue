<script setup>
import { defineProps } from "vue";

const props = defineProps(["title", "content", "icon"]);

function titleColor() {
  if (props.title === "Pending") {
    return "text-amber-500";
  } else if (props.title === "In Progress") {
    return "text-sky-400";
  } else if (props.title === "Delivered") {
    return "text-green-400";
  } else if (props.title === "Canceled") {
    return "text-red-500";
  } else {
    return "text-neutral-400";
  }
}
</script>

<template>
  <div
    class="w-[200px] h-[96px] bg-white p-4 mr-4 rounded flex flex-col justify-between"
  >
    <div class="flex row mb-2">
      <img v-if="props.icon" :src="props.icon" alt="Icon" class="mr-2" />
      <h3 :class="titleColor() + ' text-sm '">{{ title }}</h3>
    </div>
    <span class="text-2xl font-semibold" v-if="title === 'Total Revenue'"
      >€{{ content }}</span
    >
    <span class="text-2xl font-semibold" v-else>{{ content }}</span>
  </div>
</template>

<style scoped></style>
