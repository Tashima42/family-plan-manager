export class UserGroupPlan {
  private userId: number;
  private groupPlanId: number;
  private role: string;
  private id: number;

  constructor(userId: number, groupPlanId: number, role: string, id?: number) {
    this.userId = userId;
    this.groupPlanId = groupPlanId;
    this.role = role;
    this.id = id;
  }

  getUserId(): number {
    return this.userId;
  }
  getGroupPlanId(): number {
    return this.groupPlanId;
  }
  getRole(): string {
    return this.role;
  }
  getId(): number {
    return this.id;
  }
  setId(id: number): void {
    this.id = id;
  }
}
