import { Email } from './value-objects/email.value-object';
import { UserName } from './value-objects/user-name.value-object';

export class User {
    constructor(
        readonly _id: string,
        public name: UserName,
        public email: Email
    ) {}
}
