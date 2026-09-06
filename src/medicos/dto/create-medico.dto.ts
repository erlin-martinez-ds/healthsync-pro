import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  documento: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(150)
  correo: string;
}
