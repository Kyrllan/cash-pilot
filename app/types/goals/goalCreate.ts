export type GoalCreate = {
    id: number;
    name: string;
    increment_value: number;
    current_value: number;
    total_value: number;
    deadline: string;
    category_id: number;
    user_id: string;
}