<script setup lang="ts">
type Props = {
  label: string;
  value: string;
};

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col">
    <span class="text-sm font-medium text-gray-500">{{ label }}</span>
    <span class="text-md font-bold">{{ value }}</span>
  </div>
</template>
