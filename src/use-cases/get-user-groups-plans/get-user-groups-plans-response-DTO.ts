export interface IGetUserGroupsPlansResponseDTO {
  groupPlans: Array<{
    name: string,
    description: string,
    role: string,
    id: number
  }>
}
