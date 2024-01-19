export interface IUser {
  id: number | null
  name: string | null
  email: string | null
  verification: boolean
}
export interface IRegistration {
  name: string
  email: string
  password: string
}
export interface ILogin {
  email: string
  password: string
}
export interface IForgotPassword {
  email: string
}
export interface IResetPassword {
  password: string
  unique: string | undefined
}
export interface IAuthState {
  user: IUser | null
  token: string
}
