import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Service]), 
  ],
  providers: [SeedService],
})
export class SeedModule {}