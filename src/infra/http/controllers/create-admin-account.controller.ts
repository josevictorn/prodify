import { AdminAlreadyExistsError } from '@/domain/business/application/use-cases/errors/admin-already-exists-error'
import { RegisterAdminUseCase } from '@/domain/business/application/use-cases/register-admin'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createAdminAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAdminAccountBodySchema = z.infer<typeof createAdminAccountBodySchema>

@Controller('/accounts/admin')
export class CreateAdminAccountController {
  constructor(private registerAdmin: RegisterAdminUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAdminAccountBodySchema))
  async handle(@Body() body: CreateAdminAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerAdmin.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AdminAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
