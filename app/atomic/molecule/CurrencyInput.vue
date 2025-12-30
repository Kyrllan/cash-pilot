<script setup lang="ts">
import { useCurrencyInput } from "vue-currency-input";

type CurrencyInputProps = {
  modelValue: number | null;
};

defineProps<CurrencyInputProps>();

const { formattedValue, inputRef } = useCurrencyInput({
  locale: "pt-BR",
  precision: 2,
  currency: "BRL",
});
</script>

<template>
  <UInput ref="inputRef" :value="formattedValue" size="xl" class="w-full" />
</template>
