import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity/cita.entity';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cita])],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
