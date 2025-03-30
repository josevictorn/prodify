import { UniqueEntityID } from '@/core/entities/unique-entity-is'
import { Admin } from '@/domain/business/enterprise/entities/admin'
import { Prisma, User as PrismaAdmin, UserRole } from '@prisma/client'

export class PrismaAdminMapper {
  static toDomain(raw: PrismaAdmin): Admin {
    return Admin.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(admin: Admin): Prisma.UserUncheckedCreateInput {
    return {
      id: admin.id.toString(),
      role: UserRole.ADMIN,
      name: admin.name,
      email: admin.email,
      password: admin.password,
    }
  }
}
