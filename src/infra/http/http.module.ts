import { Module } from '@nestjs/common'
import { CreateAdminAccountController } from './controllers/create-admin-account.controller'
import { RegisterAdminUseCase } from '@/domain/business/application/use-cases/register-admin'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAdminAccountController],
  providers: [RegisterAdminUseCase],
})
export class HttpModule {}
