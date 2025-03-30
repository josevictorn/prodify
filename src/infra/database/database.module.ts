import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AdminsRepository } from '@/domain/business/application/repositories/admins-repository'
import { PrismaAdminsRepository } from './prisma/repositories/prisma-admins-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: AdminsRepository,
      useClass: PrismaAdminsRepository,
    },
  ],
  exports: [PrismaService, AdminsRepository],
})
export class DatabaseModule {}
