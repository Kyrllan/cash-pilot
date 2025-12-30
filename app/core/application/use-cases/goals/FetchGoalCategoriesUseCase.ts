import type { IGoalRepository } from "../../../domain/repositories/IGoalRepository";
import type { GoalCategory } from "../../../domain/entities/GoalCategory";

export class FetchGoalCategoriesUseCase {
  constructor(private repository: IGoalRepository) {}

  async execute(): Promise<GoalCategory[]> {
    return this.repository.fetchGoalCategories();
  }
}
