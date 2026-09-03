import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEspecialidadDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MaxLength(100, {
    message: 'El nombre no puede superar los 100 caracteres',
  })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto' })
  descripcion?: string;
}