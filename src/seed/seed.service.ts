import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async onModuleInit() {
    await this.runSeed();
  }

  private async runSeed() {
    // 1. Verificar si ya existen usuarios para no duplicar datos
    const userCount = await this.userRepository.count();
    if (userCount > 0) {
      return;
    }

    console.log('Seed: Iniciando inserción de datos de prueba...');

    // 2. Crear usuario Freelancer
    const freelancer = this.userRepository.create({
      email: 'freelancer@test.com',
      name: 'Alex Turner',
      password: 'password123', 
    });
    const savedUser = await this.userRepository.save(freelancer);

    // 3. Crear servicios asociados a ese usuario
    const service1 = this.serviceRepository.create({
      title: 'Diseño de logo profesional',
      category: 'Diseño',
      description: 'Incluye manual de marca, paleta de colores y formatos vectoriales.',
      price: 150.00,
      provider: savedUser, 
    });

    const service2 = this.serviceRepository.create({
      title: 'Desarrollo de Landing Page en Next.js',
      category: 'Desarrollo',
      description: 'Sitio web estático de alta conversión, optimizado para SEO y responsive.',
      price: 450.00,
      provider: savedUser,
    });

    await this.serviceRepository.save([service1, service2]);

    console.log('Seed: Datos cargados con éxito (1 Usuario, 2 Servicios).');
  }
}