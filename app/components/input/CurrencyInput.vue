<script setup lang="ts">
import { useCurrencyInput } from "vue-currency-input";

type CurrencyInputProps = {
  locale?: string;
  precision?: number;
  currency?: string;
  label: string;
  name: string;
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
  <UFormField :label="label" :name="name">
    <UInput ref="inputRef" :value="formattedValue" size="lg" class="w-full" />
  </UFormField>
</template>
