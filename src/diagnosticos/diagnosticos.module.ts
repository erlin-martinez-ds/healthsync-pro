import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiagnosticosController } from './diagnosticos.controller';
import { DiagnosticosService } from './diagnosticos.service';
import { Diagnostico } from './entities/diagnostico.entity';

import { Cita } from '../citas/entities/cita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Diagnostico,
      Cita,
    ]),
  ],
  controllers: [DiagnosticosController],
  providers: [DiagnosticosService],
})
export class DiagnosticosModule {}