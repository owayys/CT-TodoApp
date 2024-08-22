import { RepositoryPort } from 'src/common/repository.port';
import { User } from '../domain/user.entity';
import { Email } from '../domain/value-objects/email.value-object';

export interface UserRepositoryPort extends RepositoryPort<User> {
    findOneByEmail(email: Email): Promise<User>;
}
