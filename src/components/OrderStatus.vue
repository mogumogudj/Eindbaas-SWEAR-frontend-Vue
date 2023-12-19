<script setup>
import { defineProps } from "vue";

const props = defineProps(["content"]);

function getStatusStyles() {
  let textColor = "";
  let bgColor = "";
  let borderColor = "";

  switch (props.content) {
    case "Pending":
      textColor = "text-orange-500";
      bgColor = "bg-orange-100";
      borderColor = "border-orange-500";
      break;
    case "In Progress":
      textColor = "text-sky-400";
      bgColor = "bg-sky-100";
      borderColor = "border-sky-400";
      break;
    case "Completed":
      textColor = "text-green-400";
      bgColor = "bg-green-100";
      borderColor = "border-green-400";
      break;
    case "Cancelled":
      textColor = "text-red-500";
      bgColor = "bg-red-100";
      borderColor = "border-red-500";
      break;
    default:
      textColor = "text-neutral-400";
      bgColor = "bg-gray-100";
      borderColor = "border-gray-400";
      break;
  }

  return {
    textColor,
    bgColor,
    borderColor,
  };
}
</script>

<template>
  <div
    :class="[getStatusStyles().bgColor, getStatusStyles().borderColor]"
    class="w-fit min-w-[120px] px-2 border rounded"
  >
    <p
      :class="getStatusStyles().textColor"
      class="text-sm font-medium px-2 py-1 text-center"
    >
      {{ content }}
    </p>
  </div>
</template>

<style scoped></style>
