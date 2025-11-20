<script setup lang="ts">
import { ref, watch } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";

// --------------------------
// MODELO EXTERNO ISO STRING
// --------------------------
const model = defineModel<string | null>({
  default: null,
});

// --------------------------
// MODELO INTERNO (DateValue)
// --------------------------
const internal = ref<DateValue | null>(null);

// --------------------------
// Sync do model externo → interno
// --------------------------
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

// --------------------------
// Formatador para o input
// --------------------------
const format = (iso: string | null): string => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR");
};

// --------------------------
// Handler da seleção do calendário
// --------------------------
function onSelect(value: DateValue | null) {
  if (!value) {
    model.value = null;
    internal.value = null;
    return;
  }

  internal.value = value;

  const js = new Date(value.year, value.month - 1, value.day);
  model.value = js.toISOString();
}
</script>

<template>
  <UPopover class="w-full">
    <UInput
      readonly
      class="cursor-pointer"
      :model-value="format(model)"
      icon="i-heroicons-calendar-days-20-solid"
    />

    <template #content>
      <UCalendar v-model="internal" @update:model-value="onSelect" />
    </template>
  </UPopover>
</template>
