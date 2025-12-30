import type { Goal, GoalCreateInput } from "../entities/Goal";
import type { GoalCategory } from "../entities/GoalCategory";

export interface IGoalRepository {
  fetchGoals(userId: string): Promise<Goal[]>;
  createGoal(goal: GoalCreateInput): Promise<Goal>;
  updateGoal(id: number, currentValue: number): Promise<Goal>;
  deleteGoal(id: number): Promise<void>;
  fetchGoalCategories(): Promise<GoalCategory[]>;
}
