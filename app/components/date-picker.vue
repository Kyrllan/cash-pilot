<script setup lang="ts">
import { ref, watch } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";

// v-model externo (string ISO ou null)
const model = defineModel<string | null | undefined>();

// valor interno do calendário (CalendarDate)
const internal = ref<DateValue | null | undefined>(null);

// sempre que o v-model externo mudar → atualiza o calendário interno
watch(
  () => model.value,
  (iso) => {
    if (!iso) {
      internal.value = null;
      return;
    }

    const d = new Date(iso);
    internal.value = new CalendarDate(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate()
    );
  },
  { immediate: true }
);

// formatar ISO → dd/mm/yyyy
const formatDate = (iso: string | null | undefined) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR");
};

// quando o usuário seleciona no calendário
const onSelect = (date: any) => {
  internal.value = date;

  if (!date) {
    model.value = null;
    return;
  }

  const js = new Date(date.year, date.month - 1, date.day);
  model.value = js.toISOString();
};
</script>

<template>
  <UPopover class="w-full">
    <UInput
      :model-value="formatDate(model)"
      icon="i-heroicons-calendar-days-20-solid"
      readonly
      class="cursor-pointer"
    />

    <template #content>
      <UCalendar :v-model="internal" @update:model-value="onSelect" />
    </template>
  </UPopover>
</template>
