import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoEspecialidadDto } from './create-medico-especialidad.dto';

export class UpdateMedicoEspecialidadDto extends PartialType(
  CreateMedicoEspecialidadDto,
) {}
