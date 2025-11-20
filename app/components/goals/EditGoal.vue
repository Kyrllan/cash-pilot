<script setup lang="ts">
import type { GoalCategory, GoalCreate } from "../../types";

import DatePicker from "~/components/input/DatePicker.vue";
import CurrencyInput from "../input/CurrencyInput.vue";

type Props = {
  categories: GoalCategory[];
  isCreating: boolean;
};

defineProps<Props>();

const form = defineModel<GoalCreate>({ required: true });
defineEmits(["submit", "cancel", "increment", "decrement"]);
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
          v-model="form.category_id"
          :items="categories"
          value-key="id"
          label-key="name"
          class="w-full"
        />
      </UFormField>
    </div>

    <div v-if="!isCreating" class="flex gap-2">
      <div class="flex align-end gap-2">
        <UFormField>
          <UButton
            icon="i-heroicons-minus"
            size="md"
            @click="$emit('decrement')"
          />
        </UFormField>
      </div>
      <CurrencyInput
        v-model="form.increment_value"
        label="Adicionar/Remover"
        name="incrementValue"
      />
      <UFormField>
        <UButton icon="i-heroicons-plus" @click="$emit('increment')" />
      </UFormField>
    </div>

    <CurrencyInput
      v-if="isCreating"
      v-model="form.current_value"
      label="Valor Atual"
      name="currentValue"
    />

    <CurrencyInput
      v-if="isCreating"
      v-model="form.total_value"
      label="Meta"
      name="totalValue"
    />

    <div v-if="!isCreating">
      <span>Valor Atual: {{ form.current_value }}</span>
    </div>

    <div v-if="!isCreating">
      <span>Meta: {{ form.total_value }}</span>
    </div>

    <div class="flex justify-end gap-4 mt-4">
      <UButton
        type="reset"
        color="neutral"
        variant="outline"
        @click="$emit('cancel')"
        >Cancelar</UButton
      >
      <UButton type="submit">Salvar</UButton>
    </div>
  </UForm>
</template>
