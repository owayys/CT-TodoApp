import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserRequestDto } from './create-user.request.dto';
import { CreateUserCommand } from './create-user.command';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { routesV1 } from 'src/configs/app.routes';

@Controller(routesV1.version)
export class CreateUserController {
    constructor(private readonly commandBus: CommandBus) {}

    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({
        status: HttpStatus.OK
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST
    })
    @Post(routesV1.user.root)
    async create(@Body() body: CreateUserRequestDto) {
        const command = new CreateUserCommand(body.name, body.email);
        console.log(body);
        return await this.commandBus.execute(command);
    }
}
