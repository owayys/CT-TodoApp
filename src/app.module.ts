import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [CqrsModule, UserModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
