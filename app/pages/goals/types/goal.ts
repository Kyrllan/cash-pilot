export type Goal = {
    id: number;
    name: string;
    totalValue: number;
    currentValue: number;
    createdAt: Date;
    deadline: string;
    categoryId: number;
    userId: string;
}