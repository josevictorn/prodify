import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-is'

export interface AdminProps {
  name: string
  email: string
  password: string
}

export class Admin extends Entity<AdminProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  static create(props: AdminProps, id?: UniqueEntityID) {
    const admin = new Admin(props, id)

    return admin
  }
}
