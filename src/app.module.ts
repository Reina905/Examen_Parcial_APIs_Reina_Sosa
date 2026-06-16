import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    UsersModule, 
    ServicesModule, 
    AuthModule, 
    SeedModule
  ],
  controllers: [AppController], 
  providers: [AppService],      
})
export class AppModule {}
