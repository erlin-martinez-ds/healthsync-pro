import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePacienteDto {
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
  @MaxLength(50)
  documento: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_nacimiento: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  correo: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  direccion?: string;
}
