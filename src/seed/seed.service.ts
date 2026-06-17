import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('SeedService');

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Service) private readonly serviceRepo: Repository<Service>,
  ) {}

  async runSeed() {
    // 1. Verificar si ya existen usuarios para no duplicar datos
    const userCount = await this.userRepo.count();
    
    if (userCount > 0) {
      this.logger.warn('⚠️ La base de datos ya contiene datos. Saltando el Seed.');
      return;
    }

    this.logger.log('🌱 Iniciando inserción de datos de prueba en Postgres...');

    // 2. Crear y guardar el usuario base
    const user = this.userRepo.create({
      name: 'Freelancer de Prueba',
      email: 'freelancer@test.com',
      password: 'password123', // Contraseña para simulación
    });
    const savedUser = await this.userRepo.save(user);

    // 3. Crear servicios amarrados a ese usuario
    const service1 = this.serviceRepo.create({
      title: 'Desarrollo Web con NestJS',
      category: 'Programación',
      description: 'Creación de APIs robustas y escalables.',
      price: 150.00,
      provider: savedUser, // Relación directa
    });

    await this.serviceRepo.save(service1);

    this.logger.localInstance.log('✅ Base de datos poblada con éxito (1 Usuario, 1 Servicio).');
  }
}