<script setup lang="ts">
type Props = {
  label: string;
  value: string;
};

defineProps<Props>();

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};
</script>

<template>
  <div class="flex flex-col">
    <span class="text-sm font-medium text-gray-500">{{ label }}</span>
    <span class="text-md font-bold">{{ formatDate(value) }}</span>
  </div>
</template>
