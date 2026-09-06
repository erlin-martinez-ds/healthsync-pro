import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cita } from './entities/cita.entity';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';

import { Paciente } from '../pacientes/entities/paciente.entity';
import { MedicoEspecialidad } from '../medico-especialidad/entities/medico-especialidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cita,
      Paciente,
      MedicoEspecialidad,
    ]),
  ],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}