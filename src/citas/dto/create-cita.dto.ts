import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCitaDto {
  @IsDateString()
  @IsNotEmpty()
  fecha_cita: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  motivo: string;

  @IsInt()
  @IsNotEmpty()
  id_paciente: number;

  @IsInt()
  @IsNotEmpty()
  id_medico_especialidad: number;
}
