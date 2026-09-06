import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicoEspecialidadController } from './medico-especialidad.controller';
import { MedicoEspecialidadService } from './medico-especialidad.service';
import { MedicoEspecialidad } from './entities/medico-especialidad.entity';

import { Medico } from '../medicos/entities/medico.entity';
import { Especialidad } from '../especialidades/entities/especialidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicoEspecialidad,
      Medico,
      Especialidad,
    ]),
  ],
  controllers: [MedicoEspecialidadController],
  providers: [MedicoEspecialidadService],
})
export class MedicoEspecialidadModule {}