<script setup lang="ts">
import type { Goal } from "../types";

import DatePicker from "@/components/date-picker.vue";

const form = defineModel<Goal>({ required: true });
defineEmits(["submit"]);
</script>

<template>
  <UForm
    :state="form"
    class="flex flex-col gap-4 mt-4"
    @submit="$emit('submit')"
  >
    <UFormField label="Nome" name="name">
      <UInput v-model="form.name" class="w-full" size="lg" />
    </UFormField>

    <UFormField label="Valor Atual" name="currentValue">
      <UInput v-model="form.currentValue" class="w-full" size="lg" />
    </UFormField>

    <UFormField label="Data de Fim" name="deadline">
      <DatePicker v-model="form.deadline" />
    </UFormField>
  </UForm>
</template>
