<script setup lang="ts">
import { ref, onMounted } from "vue";
import Filter from "../../components/goals/filter.vue";
import NoData from "../../components/goals/no-data.vue";
import Form from "../../components/goals/form.vue";

import type { GoalCategory, Goal } from "../../types";

const supabase = useSupabaseClient();
const categories = ref<GoalCategory[]>([]);
const modal = ref(false);
const modalTitle = ref("Adicionar Meta");
const form = ref<Goal>({
  id: 0,
  name: "",
  incrementValue: 0,
  currentValue: 0,
  totalValue: 0,
  createdAt: new Date(),
  deadline: new Date().toISOString(),
  categoryId: 1,
  userId: "",
});
onMounted(() => {
  fetchCategories();
});

const fetchCategories = async () => {
  const { data, error } = await supabase.from("category_goal").select("*");
  if (error) {
    console.log(error);
    return;
  }
  categories.value = data;
};
</script>

<template>
  <div>
    <div class="pt-4 flex justify-between items-center">
      <span class="text-2xl font-bold">Minhas Metas</span>
      <UButton icon="i-heroicons-plus" @click="modal = true"
        >Criar Meta</UButton
      >
    </div>
    <div class="py-4 w-150">
      <Filter />
    </div>

    <div>
      <NoData />
    </div>
    <UModal
      v-model:open="modal"
      :title="modalTitle"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
    >
      <template #body>
        <Form v-model="form" :categories="categories" />
      </template>
    </UModal>
  </div>
</template>
