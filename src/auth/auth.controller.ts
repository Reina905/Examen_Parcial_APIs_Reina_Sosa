import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth') // Agrupa este controlador bajo la sección "Auth" en Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Simular inicio de sesión de un Freelancer' })
  @ApiResponse({ 
    status: 200, 
    description: 'Autenticación exitosa. Retorna el token JWT y los datos básicos del usuario.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          name: 'Alex Turner',
          email: 'freelancer@test.com'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciales inválidas (Email o contraseña incorrectos).' 
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}