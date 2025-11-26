<script setup lang="ts">
type Props = {
  label: string;
  value: number;
};

defineProps<Props>();

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
</script>

<template>
  <div class="flex flex-col">
    <span class="text-sm font-medium text-gray-500">{{ label }}</span>
    <span class="text-md font-bold">{{ formatCurrency(value) }}</span>
  </div>
</template>
