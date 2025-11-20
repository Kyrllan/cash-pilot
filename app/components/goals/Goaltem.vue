<script setup lang="ts">
import type { GoalSelect } from "../../types";
import { useDate } from "../../composables/useDate";

const { formatDate } = useDate();

type GoalItemProps = {
  goal: GoalSelect;
};

const percentage = computed(() => {
  if (props.goal.total_value === 0) {
    return 0;
  }
  return Math.round((props.goal.current_value / props.goal.total_value) * 100);
});

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const props = defineProps<GoalItemProps>();
defineEmits(["delete", "add-value"]);
</script>

<template>
  <div class="rounded-lg bg-green-700/80 text-white shadow-lg overflow-hidden">
    <div class="h-40 w-full overflow-hidden">
      <img
        :src="goal.category?.image_url"
        :alt="`Imagem da categoria ${goal.name}`"
        class="object-cover w-full h-full"
      />
    </div>

    <div class="p-4">
      <div
        class="flex justify-between items-center text-sm font-medium text-green-300"
      >
        <span>Prazo: {{ formatDate(new Date(goal.deadline)) }}</span>
        <UIcon
          :name="`i-heroicons-${goal.category?.icon || 'currency-dollar'}`"
          class="size-6 text-green-300"
        />
      </div>

      <h2 class="text-xl font-bold">
        {{ goal.name }}
      </h2>

      <div class="pt-4">
        <div class="flex items-center justify-between text-lg">
          <div>
            <span class="text-green-300">{{
              formatCurrency(goal.current_value)
            }}</span>
            <span class="text-green-300">
              / {{ formatCurrency(goal.total_value) }}</span
            >
          </div>
          <div>
            <span class="text-sm font-bold text-green-300"
              >{{ percentage }}%</span
            >
          </div>
        </div>

        <div class="flex items-center gap-3">
          <UProgress v-model="percentage" />
        </div>
      </div>

      <div class="pt-6 flex gap-3">
        <UButton
          label="Adicionar Valor"
          color="primary"
          variant="solid"
          block
          size="lg"
          @click="$emit('add-value', goal)"
        />

        <UButton
          icon="i-heroicons-trash"
          color="secondary"
          variant="solid"
          block
          size="lg"
          class="flex-1 text-white"
          @click="$emit('delete', goal.id)"
        />
      </div>
    </div>
  </div>
</template>
