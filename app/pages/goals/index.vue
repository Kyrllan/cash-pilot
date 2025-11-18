<script setup lang="ts">
import { ref, onMounted } from "vue";
import Filter from "./components/filter.vue";
import NoData from "./components/no-data.vue";
import Form from "./components/form.vue";

import type { Category, Goal } from "./types";

const supabase = useSupabaseClient();
const categories = ref<Category[]>([]);
const form = ref<Goal>({
  id: 0,
  name: "",
  totalValue: 0,
  currentValue: 0,
  createdAt: new Date(),
  deadline: new Date().toISOString(),
  categoryId: 0,
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
  console.log(data);
  categories.value = data;
};
</script>

<template>
  <div>
    <div class="pt-4 flex justify-between items-center">
      <span class="text-2xl font-bold">Minhas Metas</span>
      <UButton icon="i-heroicons-plus">Adicionar Meta</UButton>
    </div>
    <div class="py-4 w-150">
      <Filter />
    </div>

    <div>
      <NoData />
    </div>
    <div>
      {{ categories }}
    </div>
    <div>
      <Form v-model="form" />
    </div>
  </div>
</template>
