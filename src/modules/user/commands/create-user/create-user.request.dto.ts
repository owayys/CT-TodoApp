import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDto {
    @ApiProperty({
        example: 'Ryomen Sukuna',
        description: 'User name'
    })
    @MaxLength(120)
    @MinLength(5)
    readonly name: string;

    @ApiProperty({
        example: 'sukuna@malevolent.shrine',
        description: 'User email'
    })
    @MaxLength(320)
    @MinLength(5)
    @IsEmail()
    readonly email: string;
}
