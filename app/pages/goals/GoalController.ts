import { SupabaseGoalRepository } from "~/core/infrastructure/repositories/SupabaseGoalRepository";
import type { Goal, GoalCreateInput } from "~/core/domain/entities/Goal";
import { FetchGoalCategoriesUseCase } from "~/core/application/use-cases/goals/FetchGoalCategoriesUseCase";
import { FetchGoalsUseCase } from "~/core/application/use-cases/goals/FetchGoalsUseCase";
import { CreateGoalUseCase } from "~/core/application/use-cases/goals/CreateGoalUseCase";
import { UpdateGoalUseCase } from "~/core/application/use-cases/goals/UpdateGoalUseCase";
import { DeleteGoalUseCase } from "~/core/application/use-cases/goals/DeleteGoalUseCase";
import type { GoalCategory } from "~/core/domain/entities/GoalCategory";

export const useGoalController = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const toast = useToast();

  const goalsRepository = new SupabaseGoalRepository(supabase);
  const fetchGoalsUseCase = new FetchGoalsUseCase(goalsRepository);
  const createGoalUseCase = new CreateGoalUseCase(goalsRepository);
  const updateGoalUseCase = new UpdateGoalUseCase(goalsRepository);
  const deleteGoalUseCase = new DeleteGoalUseCase(goalsRepository);
  const fetchGoalCategoriesUseCase = new FetchGoalCategoriesUseCase(
    goalsRepository
  );

  const categories = ref<GoalCategory[]>([]);
  const goals = ref<Goal[]>([]);
  const goalFilterTab = ref();
  const modalCreate = ref(false);
  const modalEdit = ref(false);
  const incrementValue = ref(0);
  const form = ref<Goal>({
    id: 0,
    name: "",
    current_value: 0,
    total_value: 0,
    deadline: new Date().toISOString(),
    category_id: 1,
    user_id: "",
  });
  const goalSelected = ref<Goal>({} as Goal);
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

  watch(goalFilterTab, (tabIndex) => {
    filterGoals(tabIndex);
  });

  const fetchGoals = async () => {
    try {
      if (!user.value?.sub) return;
      goals.value = await fetchGoalsUseCase.execute(user.value.sub);
    } catch (error: any) {
      console.error("Erro ao buscar metas:", error);
    }
  };

  const createGoal = async () => {
    try {
      if (!user.value?.sub) return;
      await createGoalUseCase.execute({
        name: form.value.name,
        current_value: form.value.current_value,
        total_value: form.value.total_value,
        deadline: form.value.deadline,
        category_id: form.value.category_id,
        user_id: user.value.sub,
      });
      toast.add({
        title: "Sucesso",
        description: "Meta criada com sucesso!",
        color: "success",
      });
    } catch (error: any) {
      toast.add({
        title: "Erro",
        description: error.message || "Erro ao criar meta",
        color: "error",
      });
    } finally {
      fetchGoals();
      modalCreate.value = false;
    }
  };

  const updateGoal = async () => {
    try {
      await updateGoalUseCase.execute(
        goalSelected.value.id,
        goalSelected.value.current_value
      );
      toast.add({
        title: "Sucesso",
        description: "Meta atualizada com sucesso!",
        color: "success",
      });
    } catch (error: any) {
      toast.add({
        title: "Erro",
        description: error.message || "Erro ao atualizar meta",
        color: "error",
      });
    } finally {
      fetchGoals();
      modalEdit.value = false;
    }
  };

  const deleteGoal = async (id: number) => {
    try {
      await deleteGoalUseCase.execute(id);
      toast.add({
        title: "Sucesso",
        description: "Meta excluída com sucesso!",
        color: "success",
      });
    } catch (error: any) {
      toast.add({
        title: "Erro",
        description: error.message || "Erro ao excluir meta",
        color: "error",
      });
    } finally {
      fetchGoals();
    }
  };

  const fetchCategories = async () => {
    try {
      categories.value = await fetchGoalCategoriesUseCase.execute();
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const filterGoals = (tabIndex: string) => {
    if (tabIndex === "0") {
      goals.value = [...goals.value].sort((a, b) => {
        return (
          new Date(b.created_at ?? 0).getTime() -
          new Date(a.created_at ?? 0).getTime()
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

  const initCreateGoal = () => {
    form.value = {
      id: 0,
      name: "",
      current_value: 0,
      total_value: 0,
      deadline: new Date().toISOString(),
      category_id: 1,
      user_id: "",
    };
    modalCreate.value = true;
  };

  const initUpdateGoal = (goal: Goal) => {
    goalSelected.value = {
      id: goal.id,
      name: goal.name,
      current_value: goal.current_value,
      total_value: goal.total_value,
      deadline: goal.deadline,
      category: goal.category,
      created_at: goal.created_at,
      category_id: goal.category_id,
      user_id: goal.user_id,
    };
    modalEdit.value = true;
  };

  onMounted(() => {
    fetchCategories();
    fetchGoals();
  });

  return {
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
  };
};
