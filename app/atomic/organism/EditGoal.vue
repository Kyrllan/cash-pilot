<script setup lang="ts">
import type { GoalSelect } from "../../types";
import DisplayTextField from "../molecule/DisplayTextField.vue";
import DisplayDateField from "@/atomic/molecule/DisplayDateField.vue";
import DisplayCurrencyField from "@/atomic/molecule/DisplayCurrencyField.vue";
import CurrencyInput from "@/atomic/molecule/CurrencyInput.vue";

const form = defineModel<GoalSelect>({ required: true });
defineEmits(["submit", "cancel"]);

const incrementValue = ref(0);

const increment = () => {
  form.value.current_value += incrementValue.value;
};

const decrement = () => {
  form.value.current_value -= incrementValue.value;
};
</script>

<template>
  <UForm :state="form" class="flex flex-col gap-4" @submit="$emit('submit')">
    <img
      :src="form.category.image_url"
      alt="Meta"
      class="w-full h-60 object-cover rounded-lg"
    />
    <div class="pt-2 grid grid-cols-2 w-full">
      <DisplayTextField label="Meta" :value="form.name" />
      <DisplayTextField label="Categoria" :value="form.category.name" />
    </div>
    <DisplayDateField label="Prazo" :value="form.deadline" />

    <div class="pt-2 flex gap-2">
      <div class="flex align-end gap-2">
        <UFormField>
          <UButton icon="i-heroicons-minus" size="md" @click="decrement" />
        </UFormField>
      </div>
      <CurrencyInput
        v-model="incrementValue"
        label="Adicionar/Remover"
        name="incrementValue"
      />
      <UFormField>
        <UButton icon="i-heroicons-plus" @click="increment" />
      </UFormField>
    </div>

    <div class="pt-2 grid grid-cols-2 w-full">
      <DisplayCurrencyField label="Valor atual" :value="form.current_value" />
      <DisplayCurrencyField label="Meta" :value="form.total_value" />
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
