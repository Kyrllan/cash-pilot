<script setup lang="ts">
import NoData from "@/atomic/organism/NoData.vue";
import CreateGoal from "@/atomic/organism/CreateGoal.vue";
import EditGoal from "@/atomic/organism/EditGoal.vue";
import GoalItem from "@/atomic/organism/Goaltem.vue";
import { useGoalController } from "./GoalController";
import { useBreakpoint } from "@/composables/useBreakpoint";

const { isMobile } = useBreakpoint();
const {
  goals,
  categories,
  goalFilterTab,
  items,
  modalCreate,
  modalEdit,
  form,
  goalSelected,
  initCreateGoal,
  createGoal,
  initUpdateGoal,
  updateGoal,
  deleteGoal,
} = useGoalController();
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
          @add-value="initUpdateGoal"
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
            @submit="createGoal"
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
            @submit="updateGoal"
            @cancel="modalEdit = false"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
