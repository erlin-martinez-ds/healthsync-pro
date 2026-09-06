import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMedicoEspecialidadDto {
  @IsInt()
  @IsNotEmpty()
  id_medico!: number;

  @IsInt()
  @IsNotEmpty()
  id_especialidad!: number;
}
