import { AdminsRepository } from '@/domain/business/application/repositories/admins-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Admin } from '@/domain/business/enterprise/entities/admin'
import { UserRole } from '@prisma/client'
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper'

@Injectable()
export class PrismaAdminsRepository implements AdminsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const admin = await this.prisma.user.findUnique({
      where: {
        email,
        role: UserRole.ADMIN,
      },
    })

    if (!admin) {
      return null
    }

    return PrismaAdminMapper.toDomain(admin)
  }

  async findById(adminId: string) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: adminId,
        role: UserRole.ADMIN,
      },
    })

    if (!admin) {
      return null
    }

    return PrismaAdminMapper.toDomain(admin)
  }

  async create(admin: Admin) {
    const data = PrismaAdminMapper.toPrisma(admin)

    await this.prisma.user.create({
      data,
    })
  }

  async save(admin: Admin) {
    const data = PrismaAdminMapper.toPrisma(admin)

    await this.prisma.user.update({
      where: {
        id: data.id,
        role: UserRole.ADMIN,
      },
      data,
    })
  }
}
