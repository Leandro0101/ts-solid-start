import { User } from '../../entities/User';
import { IMailProvider } from '../../providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private emailProvider: IMailProvider
  ) { }

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) throw new Error('User already exists');

    const user = new User(data);

    await this.usersRepository.save(user);

    this.emailProvider.sendMail({
      to: {
        email: data.email, name: data.name
      },
      from: {
        email: 'vitor@gmail.com', name: 'vitor'
      },
      subject: 'Olá, vc fez seu cadastro!',
      body: '<p>Você já pode fazer compras em nossa plataforma</p>'
    })
  }
}