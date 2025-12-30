<script setup lang="ts">
import { z } from "zod";

import DatePicker from "~/atomic/molecule/DatePicker.vue";
import CurrencyInput from "~/atomic/molecule/CurrencyInput.vue";
import type { GoalCategory } from "~/core/domain/entities/GoalCategory";
import type { Goal } from "~/core/domain/entities/Goal";

type Props = {
  categories: GoalCategory[];
};

const props = defineProps<Props>();

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

const form = defineModel<Goal>({
  required: true,
});

defineEmits(["submit", "cancel"]);

const categoryImage = computed(() => {
  return props.categories.find((cat) => cat.id === form.value.category_id)
    ?.image_url;
});
</script>

<template>
  <UForm
    :state="form"
    class="flex flex-col gap-4"
    :schema="goalSchema"
    @submit="$emit('submit', form)"
  >
    <div>
      <img
        v-if="categoryImage"
        :src="categoryImage"
        alt="Imagem da categoria"
        class="relative w-full h-60 object-cover rounded-lg brightness-50"
      />
    </div>

    <UFormField label="Nome" name="name">
      <UInput v-model="form.name" class="w-full" size="xl" />
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
          size="xl"
        />
      </UFormField>
    </div>

    <div class="grid grid-cols-2 gap-4 w-full">
      <UFormField label="Valor Atual" name="currentValue">
        <CurrencyInput v-model="form.current_value" />
      </UFormField>

      <UFormField label="Meta" name="totalValue">
        <CurrencyInput v-model="form.total_value" />
      </UFormField>
    </div>

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
