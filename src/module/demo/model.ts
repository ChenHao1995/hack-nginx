import { Model, Collection } from 'backbone-react'

interface userInfo {
  [key: string]: any
  /** 姓名 */
  name: string
  /** 年龄 */
  age?: number
}

export class User extends Model {
  attributes: userInfo = this.attributes
  defaults(): userInfo {
    return {
      name: '',
      age: 0,
    }
  }
  getName() {
    return this.get('name')
  }
}

export class Users extends Collection<User> {
  model = User
}

export default new Users()
