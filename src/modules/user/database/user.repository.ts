import { User } from '../domain/user.entity';
import { writeFile, readFile } from 'fs/promises';
import { UserRepositoryPort } from './user.repository.port';
import { Email } from '../domain/value-objects/email.value-object';
import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_PATH } from '../user.di-tokens';
import { z } from 'zod';

export const userSchema = z.object({
    _id: z.string().uuid(),
    name: z.string(),
    email: z.string().email()
});

export type UserModel = z.infer<typeof userSchema>;

@Injectable()
export class UserRepository implements UserRepositoryPort {
    constructor(
        @Inject(USER_REPOSITORY_PATH)
        private readonly filePath: string
    ) {}

    private async readUsers(): Promise<User[]> {
        try {
            const fileContent = await readFile(this.filePath, 'utf-8');
            const lines = fileContent
                .split('\n')
                .filter((line) => line.trim().length > 0);
            return lines.map((line) => JSON.parse(line));
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw new Error(error.code);
        }
    }

    private async writeUsers(users: User[]): Promise<void> {
        const fileContent = users
            .map((user: User) => JSON.stringify(user))
            .join('\n');

        await writeFile(this.filePath, fileContent, 'utf-8');
    }

    async insert(entity: User): Promise<void> {
        const users = await this.readUsers();
        users.push(entity);
        this.writeUsers(users);
    }

    async findOneById(id: string): Promise<User> {
        const users = await this.readUsers();
        return users.find((user) => user._id == id);
    }

    async findOneByEmail(email: Email): Promise<User> {
        const users = await this.readUsers();
        return users.find((user) => user.email == email);
    }

    async findAll(): Promise<User[]> {
        return await this.readUsers();
    }

    async delete(id: string): Promise<boolean> {
        const users = await this.readUsers();
        this.writeUsers(users.filter((user) => user._id !== id));
        return true;
    }
}
