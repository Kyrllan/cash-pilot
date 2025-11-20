<script setup lang="ts">
import { watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";

type CurrencyInputProps = {
  locale?: string;
  precision?: number;
  currency?: string;
  label: string;
  name: string;
};

defineProps<CurrencyInputProps>();

// v-model do componente com sintaxe segura
const modelValue = defineModel<number | null>({ default: null });

// Configuração do currency input
const { inputRef, numberValue } = useCurrencyInput({
  locale: "pt-BR",
  precision: 2,
  currency: "BRL",
});

// Atualiza v-model
watch(numberValue, (val) => {
  modelValue.value = val ?? 0;
});

// Atualiza input interno quando v-model externo mudar
watch(modelValue, (val) => {
  if (val !== numberValue.value) {
    numberValue.value = val ?? null;
  }
});
</script>

<template>
  <UFormField :label="label" :name="name">
    <UInput ref="inputRef" size="lg" class="w-full" />
  </UFormField>
</template>
