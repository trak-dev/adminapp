export default class UserModel {
    id?: number
    declare firstname: string
    declare lastname: string
    declare email: string
    declare password: string
    password_token?: string
    pseudo?: string
    isadmin?: boolean
    address?: string
  }