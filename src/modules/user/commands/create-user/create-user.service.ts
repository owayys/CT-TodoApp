import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../domain/user.entity';
import { randomUUID } from 'crypto';
import { UserName } from '../../domain/value-objects/user-name.value-object';
import { Email } from '../../domain/value-objects/email.value-object';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { OK } from 'zod';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
    constructor(
        @Inject(USER_REPOSITORY)
        protected readonly userRepo: UserRepositoryPort
    ) {}

    async execute(command: CreateUserCommand): Promise<any> {
        const user = new User(
            randomUUID(),
            new UserName(command.name),
            new Email(command.email)
        );

        try {
            await this.userRepo.insert(user);
            return OK(user._id);
        } catch (error) {
            throw error;
        }
    }
}
