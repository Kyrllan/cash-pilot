import type { IGoalRepository } from "../../../domain/repositories/IGoalRepository";
import type { GoalCreateInput, Goal } from "../../../domain/entities/Goal";

export class CreateGoalUseCase {
  constructor(private repository: IGoalRepository) {}

  async execute(input: GoalCreateInput): Promise<Goal> {
    if (input.total_value <= 0) {
      throw new Error("A meta deve ser maior que zero.");
    }
    return this.repository.createGoal(input);
  }
}
