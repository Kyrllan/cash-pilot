<script setup lang="ts">
import type { Category, Goal } from "../types";

import DatePicker from "@/components/date-picker.vue";

type Props = {
  categories: Category[];
};

defineProps<Props>();

const form = defineModel<Goal>({ required: true });
defineEmits(["submit"]);

const formatMoney = (value: number) => {
  if (!value) return "";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const parseMoney = (value: string) => {
  if (!value) return 0;
  return Number(value.replace(/\./g, "").replace(",", "."));
};
</script>

<template>
  <UForm :state="form" class="flex flex-col gap-4" @submit="$emit('submit')">
    <UFormField label="Nome" name="name">
      <UInput v-model="form.name" class="w-full" size="lg" />
    </UFormField>

    <div class="flex gap-4 w-full">
      <UFormField label="Prazo" name="deadline">
        <DatePicker v-model="form.deadline" />
      </UFormField>

      <UFormField class="w-full" label="Categoria" name="categoryId">
        <USelect
          v-model="form.categoryId"
          :items="categories"
          value-key="id"
          label-key="name"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField class="w-full" label="Adicionar/Remover" name="incrementValue">
      <div class="flex flex-row items-center gap-2">
        <UButton
          icon="i-heroicons-minus"
          size="md"
          @click="form.currentValue -= form.incrementValue"
        />
        <UInput
          class="w-full"
          size="lg"
          :model-value="formatMoney(form.incrementValue)"
          @update:model-value="form.incrementValue = parseMoney($event)"
        />
        <UButton
          icon="i-heroicons-plus"
          @click="form.currentValue += form.incrementValue"
        />
      </div>
    </UFormField>

    <UFormField label="Valor Atual" name="currentValue">
      <UInput
        class="w-full"
        size="lg"
        :model-value="formatMoney(form.currentValue)"
        @update:model-value="form.currentValue = parseMoney($event)"
      />
    </UFormField>

    <UFormField label="Meta" name="totalValue">
      <UInput
        class="w-full"
        size="lg"
        :model-value="formatMoney(form.totalValue)"
        @update:model-value="form.totalValue = parseMoney($event)"
      />
    </UFormField>

    <div class="flex justify-end gap-4 mt-4">
      <UButton type="reset" color="neutral" variant="outline">Cancelar</UButton>
      <UButton type="submit">Salvar</UButton>
    </div>
  </UForm>
</template>
