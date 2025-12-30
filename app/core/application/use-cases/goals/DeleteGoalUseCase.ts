import type { IGoalRepository } from "../../../domain/repositories/IGoalRepository";

export class DeleteGoalUseCase {
  constructor(private repository: IGoalRepository) {}

  async execute(id: number): Promise<void> {
    await this.repository.deleteGoal(id);
  }
}
