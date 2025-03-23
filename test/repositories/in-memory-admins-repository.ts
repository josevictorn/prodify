import { AdminsRepository } from '@/domain/business/application/repositories/admins-repository'
import { Admin } from '@/domain/business/enterprise/entities/admin'

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = []

  async findByEmail(email: string) {
    const admin = this.items.find((item) => item.email === email)

    if (!admin) {
      return null
    }

    return admin
  }

  async findById(id: string) {
    const admin = this.items.find((item) => item.id.toString() === id)

    if (!admin) {
      return null
    }

    return admin
  }

  async create(admin: Admin) {
    this.items.push(admin)
  }

  async save(admin: Admin) {
    const itemIndex = this.items.findIndex((item) => item.id === admin.id)

    this.items[itemIndex] = admin
  }
}
