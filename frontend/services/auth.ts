import API from '@/utils/api'

export function login(email: string, password: string) {
  return API.post<User>('/api/v1/auth/login', {
    email,
    password
  })
}

export function signup(email: string, password: string, role: UserRole) {
  return API.post<User>('/api/v1/auth/signup', {
    email,
    name: email,
    role,
    password
  })
}

export function signout() {
  return API.post('/api/v1/auth/logout')
}
