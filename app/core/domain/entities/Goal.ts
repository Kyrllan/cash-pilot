import type { GoalCategory } from "./GoalCategory";

export interface Goal {
  id: number;
  name: string;
  current_value: number;
  total_value: number;
  deadline: string;
  created_at?: string;
  category_id: number;
  category?: GoalCategory;
  user_id: string;
}

export interface GoalCreateInput {
  name: string;
  current_value: number;
  total_value: number;
  deadline: string;
  category_id: number;
  user_id: string;
}
