<script setup lang="ts">
import type { GoalSelect } from "../../types";
import DisplayTextField from "../molecule/DisplayTextField.vue";
import DisplayDateField from "@/atomic/molecule/DisplayDateField.vue";
import DisplayCurrencyField from "@/atomic/molecule/DisplayCurrencyField.vue";
import CurrencyInput from "@/atomic/molecule/CurrencyInput.vue";
import { useDate } from "../../composables/useDate";

const { formatDate } = useDate();

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
    <div class="relative w-full overflow-hidden">
      <img
        :src="form.category?.image_url"
        :alt="`Imagem da categoria ${form.name}`"
        loading="lazy"
        decoding="async"
        class="relative w-full h-60 object-cover rounded-lg brightness-50"
      />
      <div
        class="absolute top-2 right-2 bg-neutral-900 text-sm text-white p-1 px-2 rounded-lg"
      >
        {{ formatDate(new Date(form.deadline)) }}
      </div>
      <div class="flex absolute bottom-2 left-2 text-white px-2 rounded-lg">
        <div
          class="flex justify-between items-center text-sm font-medium text-green-300"
        >
          <UIcon
            :name="`i-heroicons-${form.category?.icon || 'currency-dollar'}`"
            class="size-6 text-white"
          />
        </div>

        <h2 class="pl-2 text-xl font-bold">
          {{ form.name }}
        </h2>
      </div>
    </div>

    <div class="pt-2 grid grid-cols-2 w-full">
      <DisplayCurrencyField label="Valor atual" :value="form.current_value" />
      <DisplayCurrencyField label="Meta" :value="form.total_value" />
    </div>

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
