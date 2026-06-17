import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Services')
@ApiBearerAuth() 
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Publicar un nuevo servicio (Autenticado)' })
  create(@Body() createServiceDto: CreateServiceDto, @Req() req: any) {
    // req.user contiene el payload descifrado del JWT ({ id, email, name })
    return this.servicesService.create(createServiceDto, req.user);
  }
}