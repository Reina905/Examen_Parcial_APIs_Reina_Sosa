import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  // Buscar todos los servicios trayendo solo el nombre del proveedor
  async findAllPublic() {
    return this.serviceRepository.find({
      relations: ['provider'],
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        price: true,
        provider: {
          name: true, // Solo expone el nombre del usuario
        },
      },
    });
  }

  // Crear un servicio asociándolo al usuario logueado extraído del JWT
  async create(createServiceDto: CreateServiceDto, userPayload: any) {
    const service = this.serviceRepository.create({
      ...createServiceDto,
      provider: { id: userPayload.id } as User, // Vincula usando el ID del token
    });
    
    return this.serviceRepository.save(service);
  }
}