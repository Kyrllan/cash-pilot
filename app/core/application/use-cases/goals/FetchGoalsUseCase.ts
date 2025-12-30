import type { IGoalRepository } from "../../../domain/repositories/IGoalRepository";
import type { Goal } from "../../../domain/entities/Goal";

export class FetchGoalsUseCase {
  constructor(private repository: IGoalRepository) {}

  async execute(userId: string): Promise<Goal[]> {
    if (!userId) throw new Error("Usuário não identificado.");
    return this.repository.fetchGoals(userId);
  }
}
