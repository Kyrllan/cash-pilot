export type Goal = {
    id: number;
    name: string;
    incrementValue: number;
    currentValue: number;
    totalValue: number;
    createdAt: Date;
    deadline: string;
    categoryId: number;
    userId: string;
}