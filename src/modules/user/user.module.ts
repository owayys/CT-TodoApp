import { Module, Provider } from '@nestjs/common';
import { CreateUserController } from './commands/create-user/create-user.controller';
import { CreateUserService } from './commands/create-user/create-user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { USER_REPOSITORY, USER_REPOSITORY_PATH } from './user.di-tokens';
import { UserRepository } from './database/user.repository';
import { DeleteUserController } from './commands/delete-user/delete-user.controller';
import { DeleteUserService } from './commands/delete-user/delete-user.service';

const controllers = [CreateUserController, DeleteUserController];

const commandHandlers: Provider[] = [CreateUserService, DeleteUserService];

const repositories: Provider[] = [
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository
    },
    {
        provide: USER_REPOSITORY_PATH,
        useValue: 'src/database/users.txt'
    }
];

@Module({
    imports: [CqrsModule],
    controllers: [...controllers],
    providers: [...commandHandlers, ...repositories]
})
export class UserModule {}
