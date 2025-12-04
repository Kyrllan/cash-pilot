<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import NoData from "@/atomic/organism/NoData.vue";
import CreateGoal from "@/atomic/organism/CreateGoal.vue";
import EditGoal from "@/atomic/organism/EditGoal.vue";
import GoalItem from "@/atomic/organism/Goaltem.vue";
import { useBreakpoint } from "@/composables/useBreakpoint";

import type { GoalCategory, GoalCreate, GoalSelect } from "../../types";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const toast = useToast();
const { isMobile } = useBreakpoint();
const categories = ref<GoalCategory[]>([]);
const modalCreate = ref(false);
const modalEdit = ref(false);
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
const goalSelected = ref<GoalSelect>({} as GoalSelect);
const goalFilterTab = ref();

const items = [
  {
    label: "Recentes",
    slot: "recent",
  },
  {
    label: "Prazo Final",
    slot: "deadline",
  },
  {
    label: "Proximas de concluir",
    slot: "closest",
  },
];

onMounted(() => {
  fetchCategories();
  fetchGoals();
});

watch(goalFilterTab, (tabIndex) => {
  filterGoals(tabIndex);
});

const fetchCategories = async () => {
  const { data, error } = await supabase.from("category_goal").select("*");
  if (error) {
    console.log(error);
    return;
  }
  categories.value = data;
};

const initCreateGoal = () => {
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
  modalCreate.value = true;
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
  modalCreate.value = false;
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
  goals.value = data;
  filterGoals(goalFilterTab.value);
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
  goalSelected.value = {
    id: goal.id,
    name: goal.name,
    current_value: goal.current_value,
    total_value: goal.total_value,
    deadline: goal.deadline,
    category: goal.category,
    created_at: goal.created_at,
    category_id: goal.category_id,
    category: {
      id: goal.category.id,
      name: goal.category.name,
      image_url: goal.category.image_url,
      icon: goal.category.icon,
    },
    user_id: goal.user_id,
  };
  modalEdit.value = true;
};

const addValue = async () => {
  const { error } = await supabase
    .from("goals")
    .update({
      current_value: goalSelected.value.current_value,
    })
    .eq("id", goalSelected.value.id);
  if (error) {
    toast.add({
      title: "Erro ao adicionar valor",
      description: error.message,
      color: "error",
    });
    return;
  }
  toast.add({
    title: "Valor adicionado",
    description: "Valor adicionado com sucesso.",
    color: "success",
  });
  modalEdit.value = false;
  fetchGoals();
};

const filterGoals = (tabIndex: string) => {
  if (tabIndex === "0") {
    goals.value = [...goals.value].sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }
  if (tabIndex === "1") {
    goals.value = [...goals.value].sort((a, b) => {
      return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
    });
  }
  if (tabIndex === "2") {
    goals.value = [...goals.value].sort((a, b) => {
      const progressA = a.current_value / a.total_value;
      const progressB = b.current_value / b.total_value;

      return progressB - progressA;
    });
  }
};
</script>

<template>
  <div>
    <div class="pt-4 flex gap-3 justify-between items-end">
      <span class="text-2xl font-bold">Minhas Metas</span>
      <UButton icon="i-heroicons-plus" @click="initCreateGoal"
        >Criar Meta</UButton
      >
    </div>
    <Transition
      appear
      :enter-active-class="'transition-opacity duration-200'"
      :leave-active-class="'transition-opacity duration-200'"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div class="py-4" v-if="goals.length !== 0">
        <UTabs
          v-model="goalFilterTab"
          :items="items"
          class="mb-4 overflow-x-auto"
        />
      </div>
    </Transition>

    <Transition
      mode="out-in"
      :enter-active-class="'transition-opacity duration-200'"
      :leave-active-class="'transition-opacity duration-200'"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div class="py-4" v-if="goals.length === 0">
        <NoData />
      </div>
      <TransitionGroup
        v-else
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        :enter-active-class="'transition duration-200 ease-out'"
        :leave-active-class="'transition duration-200 ease-in'"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
        move-class="transition-transform duration-200"
      >
        <GoalItem
          v-for="goal in goals"
          :key="goal.id"
          :goal="goal"
          @delete="deleteGoal"
          @add-value="initAddValue"
        />
      </TransitionGroup>
    </Transition>
    <UModal
      v-model:open="modalCreate"
      title="Adicionar Meta"
      :fullscreen="isMobile"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
    >
      <template #body>
        <div class="p-2 sm:p-4">
          <CreateGoal
            v-model="form"
            :categories="categories"
            @submit="createGoal()"
            @cancel="modalCreate = false"
          />
        </div>
      </template>
    </UModal>
    <UModal
      v-model:open="modalEdit"
      title="Adicionar Valor"
      :fullscreen="isMobile"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
    >
      <template #body>
        <div class="p-2 sm:p-4">
          <EditGoal
            v-model="goalSelected"
            @submit="addValue"
            @cancel="modalEdit = false"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
