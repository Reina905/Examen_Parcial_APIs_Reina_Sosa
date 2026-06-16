import { Controller, Get } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Public') 
@Controller('public')
export class PublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('services')
  @ApiOperation({ summary: 'Obtener todos los servicios disponibles (Público)' })
  findAll() {
    return this.servicesService.findAllPublic();
  }
}