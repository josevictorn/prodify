import { InMemoryAdminsRepository } from 'test/repositories/in-memory-admins-repository'
import { RegisterAdminUseCase } from './register-admin'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { AdminAlreadyExistsError } from './errors/admin-already-exists-error'

let inMemoryAdminsRepository: InMemoryAdminsRepository
let fakeHasher: FakeHasher

let sut: RegisterAdminUseCase

describe('Register Admin', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterAdminUseCase(inMemoryAdminsRepository, fakeHasher)
  })

  it('should be able to register a new admin', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      admin: inMemoryAdminsRepository.items[0],
    })
  })

  it('should hash admin password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryAdminsRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register admin with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AdminAlreadyExistsError)
  })
})
