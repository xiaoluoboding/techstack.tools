type UserId = number
type UserRole = 'OWNER' | 'USER'

export enum UserRoleEnum {
  OWNER = 'OWNER',
  USER = 'USER'
}

export interface User {
  id: UserId

  createdTs: string
  updatedTs: string

  email: string
  name: string
  role: UserRole
}

export interface UserCreate {
  email: string
  name: string
  role: UserRole
  password: string
}

export interface UserDelete {
  id: UserId
}

export interface UserPatch {
  name?: string
  password?: string
}

export type UserState = {
  userMap: Map<number, User>
  currentUser: User | Partial<User>
}
