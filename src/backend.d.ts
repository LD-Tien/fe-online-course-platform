export interface IBackendRes<T> {
  code: number
  message?: string
  errors?: Object
  data?: T
}

export interface IUserRegister {
  fname: string
  email: string
  password: string
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserRegisterInstructor {
  role: number
}
