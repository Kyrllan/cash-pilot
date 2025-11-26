<script setup lang="ts">
import { ref, onMounted } from "vue";
import NoData from "../../components/goals/NoData.vue";
import Form from "../../components/goals/CreateGoal.vue";
import GoalItem from "../../components/goals/Goaltem.vue";

import type { GoalCategory, GoalCreate, GoalSelect } from "../../types";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const toast = useToast();
const categories = ref<GoalCategory[]>([]);
const modal = ref(false);
const modalTitle = ref("Adicionar Meta");
const form = ref<GoalCreate>({
  id: 0,
  name: "",
  increment_value: 0,
  current_value: 0,
  total_value: 0,
  deadline: new Date().toISOString(),
  category_id: 1,
  user_id: "",
});
const goals = ref<GoalSelect[]>([]);
const goalFilterTab = ref(0);

const items = [
  {
    label: "Mais Recentes",
    slot: "recent",
  },
  {
    label: "Prazo Final",
    slot: "deadline",
  },
  {
    label: "Mais Proximas de concluir",
    slot: "closest",
  },
];

onMounted(() => {
  fetchCategories();
  fetchGoals();
});

const isCreating = computed(() => modalTitle.value === "Adicionar Meta");

const fetchCategories = async () => {
  const { data, error } = await supabase.from("category_goal").select("*");
  if (error) {
    console.log(error);
    return;
  }
  categories.value = data;
};

const initCreateGoal = () => {
  modalTitle.value = "Adicionar Meta";
  form.value = {
    id: 0,
    name: "",
    increment_value: 0,
    current_value: 0,
    total_value: 0,
    deadline: new Date().toISOString(),
    category_id: 1,
    user_id: "",
  };
  modal.value = true;
};

const createGoal = async () => {
  const { error } = await supabase
    .from("goals")
    .insert({
      name: form.value.name,
      current_value: form.value.current_value,
      total_value: form.value.total_value,
      deadline: form.value.deadline,
      category_id: form.value.category_id,
      user_id: user.value?.sub,
    })
    .select();
  if (error) {
    toast.add({
      title: "Erro ao criar meta",
      description: error.message,
      color: "error",
    });
    return;
  }
  toast.add({
    title: "Meta criada",
    description: "Meta criada com sucesso.",
    color: "success",
  });
  modal.value = false;
  fetchGoals();
};

const fetchGoals = async () => {
  const { data, error } = await supabase
    .from("goals")
    .select(`*, category:category_id (*)`)
    .eq("user_id", user.value?.sub);
  if (error) {
    toast.add({
      title: "Erro ao buscar metas",
      description: error.message,
      color: "error",
    });
    return;
  }
  console.log(data);
  goals.value = data;
};

const deleteGoal = async (id: number) => {
  const { error } = await supabase.from("goals").delete().eq("id", id);
  if (error) {
    toast.add({
      title: "Erro ao deletar meta",
      description: error.message,
      color: "error",
    });
    return;
  }
  toast.add({
    title: "Meta deletada",
    description: "Meta deletada com sucesso.",
    color: "success",
  });
  fetchGoals();
};

const initAddValue = (goal: GoalSelect) => {
  modalTitle.value = "Adicionar Valor";
  form.value = {
    id: goal.id,
    name: goal.name,
    increment_value: 0,
    current_value: 0,
    total_value: goal.total_value,
    deadline: goal.deadline,
    category_id: goal.category_id,
    user_id: user.value?.sub || "",
  };
  modal.value = true;
};
</script>

<template>
  <div>
    <div class="pt-4 flex justify-between items-center">
      <span class="text-2xl font-bold">Minhas Metas</span>
      <UButton icon="i-heroicons-plus" @click="initCreateGoal"
        >Criar Meta</UButton
      >
    </div>
    <div class="py-4 w-150">
      <UTabs v-model="goalFilterTab" :items="items" class="mb-4" />
    </div>
    {{ goalFilterTab }}

    <div v-if="goals.length === 0">
      <NoData />
    </div>
    <div class="grid grid-cols-4 gap-4">
      <GoalItem
        v-for="goal in goals"
        :key="goal.id"
        :goal="goal"
        @delete="deleteGoal"
        @add-value="addValue"
      />
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
        <Form
          v-model="form"
          :categories="categories"
          :is-creating="isCreating"
          @submit="isCreating ? createGoal() : ''"
          @cancel="modal = false"
          @increment="form.current_value += form.increment_value"
          @decrement="form.current_value -= form.increment_value"
        />
      </template>
    </UModal>
  </div>
</template>
