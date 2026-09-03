import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDiagnosticoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  descripcion: string;

  @IsInt()
  @IsNotEmpty()
  id_cita: number;
}
