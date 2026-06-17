import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'freelancer@test.com', 
    description: 'El correo electrónico registrado del freelancer' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Contraseña en texto plano para la simulación' 
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}