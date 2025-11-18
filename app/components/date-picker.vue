<script setup lang="ts">
import { ref, watch } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";

// Props opcionais
const props = defineProps<{
  label?: string;
  placeholder?: string;
}>();

// Valor externo do componente (string ISO ou null)
const model = defineModel<string | null>({ default: null });

// Mostra/esconde calendário
const isOpen = ref(false);

// Valor interno do calendário (CalendarDate)
const calendarValue = ref<DateValue | null>(null);

// Converte model → CalendarDate (quando o parent muda)
watch(
  () => model.value,
  (newIso) => {
    if (!newIso) {
      calendarValue.value = null;
      return;
    }

    const d = new Date(newIso);
    calendarValue.value = new CalendarDate(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate()
    );
  },
  { immediate: true }
);

// Formata ISO -> dd/mm/aaaa
const formatDate = (iso: string | null) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR");
};

// Quando o usuário escolhe a data no calendário
const updateCalendar = (date: DateValue | null) => {
  calendarValue.value = date;
  isOpen.value = false;

  if (!date) {
    model.value = null;
    return;
  }

  // CalendarDate -> JS Date -> ISO
  const jsDate = new Date(date.year, date.month - 1, date.day);
  model.value = jsDate.toISOString();
};
</script>

<template>
  <div class="relative w-full">
    <UPopover>
      <UInput
        :model-value="formatDate(model)"
        :label="props.label"
        :placeholder="props.placeholder"
        readonly
        class="cursor-pointer"
        icon="i-heroicons-calendar-days-20-solid"
        @click="isOpen = !isOpen"
      />
      <template #content>
        <UCalendar
          :model-value="calendarValue"
          @update:model-value="updateCalendar"
        />
      </template>
    </UPopover>
  </div>
</template>
