import API from '@/utils/api'

export function createUser(userCreate: UserCreate) {
  return API.post<User[]>('/api/v1/user', userCreate)
}

export function deleteUser(userId: userId) {
  return API.delete<User>(`/api/v1/user/${userId}`)
}

export function patchUser(userPatch: UserPatch) {
  return API.patch<User>(`/api/v1/user/${userPatch.id}`, userPatch)
}

export function getUserList() {
  return API.get<User[]>('/api/v1/user')
}

export function getUserInfo() {
  return API.get<User>('/api/v1/user/me')
}
