import type { GoalCategory } from "./goalCategory";

export type GoalSelect = {
    id: number;
    name: string;
    current_value: number;
    total_value: number;
    deadline: string;
    created_at: string;
    category_id: number;
    category: GoalCategory;
    user_id: string;
}