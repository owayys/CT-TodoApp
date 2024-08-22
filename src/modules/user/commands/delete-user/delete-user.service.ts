import { CommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { UserRepository } from '../../database/user.repository';
import { OK } from 'zod';

@CommandHandler(DeleteUserCommand)
export class DeleteUserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepository
    ) {}

    async execute(command: DeleteUserCommand): Promise<any> {
        try {
            this.userRepo.delete(command.userId);
            return OK('User deleted!');
        } catch (error) {
            throw error;
        }
    }
}
