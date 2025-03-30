import { Either, left, right } from '@/core/either'
import { AdminAlreadyExistsError } from './errors/admin-already-exists-error'
import { Admin } from '../../enterprise/entities/admin'
import { AdminsRepository } from '../repositories/admins-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

interface RegisterAdminUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterAdminUseCaseResponse = Either<
  AdminAlreadyExistsError,
  {
    admin: Admin
  }
>

@Injectable()
export class RegisterAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterAdminUseCaseRequest): Promise<RegisterAdminUseCaseResponse> {
    const adminWithSameEmail = await this.adminsRepository.findByEmail(email)

    if (adminWithSameEmail) {
      return left(new AdminAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const admin = Admin.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.adminsRepository.create(admin)

    return right({
      admin,
    })
  }
}
