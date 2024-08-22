import { Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from 'src/configs/app.routes';
import { DeleteUserCommand } from './delete-user.command';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller(routesV1.version)
export class DeleteUserController {
    constructor(private readonly commandBus: CommandBus) {}

    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({
        description: 'User deleted',
        status: HttpStatus.OK
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND
    })
    @Post(routesV1.user.delete)
    async delete(@Param('id') id: string) {
        const command = new DeleteUserCommand(id);
        return await this.commandBus.execute(command);
    }
}
