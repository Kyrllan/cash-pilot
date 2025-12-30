import type { Database } from "@/supabase/types";
import type { IGoalRepository } from "../../domain/repositories/IGoalRepository";
import type { Goal, GoalCreateInput } from "../../domain/entities/Goal";
import type { GoalCategory } from "../../domain/entities/GoalCategory";
import type { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseGoalRepository implements IGoalRepository {
  constructor(private client: SupabaseClient<Database>) {}

  async fetchGoals(userId: string): Promise<Goal[]> {
    const { data, error } = await this.client
      .from("goals")
      .select("*, category:category_id (*)")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    return (data || []) as unknown as Goal[];
  }

  async createGoal(goal: GoalCreateInput): Promise<Goal> {
    const { data, error } = await this.client
      .from("goals")
      .insert({
        name: goal.name,
        current_value: goal.current_value,
        total_value: goal.total_value,
        deadline: goal.deadline,
        category_id: goal.category_id,
        user_id: goal.user_id,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as unknown as Goal;
  }

  async updateGoal(id: number, currentValue: number): Promise<Goal> {
    const { data, error } = await this.client
      .from("goals")
      .update({
        current_value: currentValue,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as unknown as Goal;
  }

  async deleteGoal(id: number): Promise<void> {
    const { error } = await this.client.from("goals").delete().eq("id", id);

    if (error) throw new Error(error.message);
  }

  async fetchGoalCategories(): Promise<GoalCategory[]> {
    const { data, error } = await this.client.from("category_goal").select("*");

    if (error) throw new Error(error.message);

    return (data || []) as GoalCategory[];
  }
}
