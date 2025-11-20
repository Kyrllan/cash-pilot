<script setup lang="ts">
import type { GoalCategory, GoalCreate } from "../../types";
import { z } from "zod";

import DatePicker from "~/components/input/DatePicker.vue";
import CurrencyInput from "../input/CurrencyInput.vue";

type Props = {
  categories: GoalCategory[];
};

defineProps<Props>();

const goalSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  current_value: z
    .number()
    .min(0, { message: "Valor deve ser maior ou igual a zero" }),
  total_value: z
    .number()
    .min(0.01, { message: "Meta deve ser maior que zero" }),
});

const form = defineModel<GoalCreate>({
  required: true,
});

defineEmits(["submit", "cancel"]);
</script>

<template>
  <UForm
    :state="form"
    class="flex flex-col gap-4"
    :schema="goalSchema"
    @submit="$emit('submit', form)"
  >
    <UFormField label="Nome" name="name">
      <UInput v-model="form.name" class="w-full" size="lg" />
    </UFormField>

    <div class="flex gap-4 w-full">
      <UFormField label="Prazo" name="deadline">
        <DatePicker v-model="form.deadline" />
      </UFormField>

      <UFormField class="w-full" label="Categoria" name="categoryId">
        <USelect
          v-model="form.category_id"
          :items="categories"
          value-key="id"
          label-key="name"
          class="w-full"
        />
      </UFormField>
    </div>

    <CurrencyInput
      v-model="form.current_value"
      label="Valor Atual"
      name="currentValue"
    />

    <CurrencyInput v-model="form.total_value" label="Meta" name="totalValue" />

    <div class="flex justify-end gap-4 mt-4">
      <UButton
        type="reset"
        color="neutral"
        variant="outline"
        @click="$emit('cancel')"
      >
        Cancelar
      </UButton>
      <UButton type="submit">Salvar</UButton>
    </div>
  </UForm>
</template>
