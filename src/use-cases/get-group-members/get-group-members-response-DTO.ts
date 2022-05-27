export interface IGetGroupMembersResponseDTO {
  members: Array<{
    name: string,
    username: string,
    role: string,
    id: number
  }>
}
