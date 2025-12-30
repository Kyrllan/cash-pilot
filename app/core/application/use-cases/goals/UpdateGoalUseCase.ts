import type { IGoalRepository } from "../../../domain/repositories/IGoalRepository";
import type { Goal } from "../../../domain/entities/Goal";

export class UpdateGoalUseCase {
  constructor(private repository: IGoalRepository) {}

  async execute(id: number, currentValue: number): Promise<Goal> {
    return this.repository.updateGoal(id, currentValue);
  }
}
