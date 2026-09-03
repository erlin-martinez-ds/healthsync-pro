import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cita } from './entities/cita.entity/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citasRepository: Repository<Cita>,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const fechaCita = new Date(createCitaDto.fecha_cita);

    if (fechaCita < new Date()) {
      throw new BadRequestException(
        'No se puede registrar una cita en el pasado',
      );
    }

    const citaExistente = await this.citasRepository.findOne({
      where: {
        fecha_cita: fechaCita,
        id_medico_especialidad: createCitaDto.id_medico_especialidad,
      },
    });

    if (citaExistente) {
      throw new BadRequestException(
        'El médico ya tiene una cita programada para esa fecha y hora',
      );
    }

    const cita = this.citasRepository.create({
      ...createCitaDto,
      fecha_cita: fechaCita,
    });

    return this.citasRepository.save(cita);
  }

  async findAll(): Promise<Cita[]> {
    return this.citasRepository.find();
  }

  async findOne(id: number): Promise<Cita> {
    const cita = await this.citasRepository.findOne({
      where: { id_cita: id },
    });

    if (!cita) {
      throw new NotFoundException(`No se encontró la cita con ID ${id}`);
    }

    return cita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.findOne(id);

    if (updateCitaDto.fecha_cita) {
      const nuevaFecha = new Date(updateCitaDto.fecha_cita);

      if (nuevaFecha < new Date()) {
        throw new BadRequestException(
          'No se puede actualizar una cita a una fecha pasada',
        );
      }

      cita.fecha_cita = nuevaFecha;
    }

    if (updateCitaDto.motivo !== undefined) {
      cita.motivo = updateCitaDto.motivo;
    }

    if (updateCitaDto.id_paciente !== undefined) {
      cita.id_paciente = updateCitaDto.id_paciente;
    }

    if (updateCitaDto.id_medico_especialidad !== undefined) {
      cita.id_medico_especialidad = updateCitaDto.id_medico_especialidad;
    }

    return this.citasRepository.save(cita);
  }

  async remove(id: number): Promise<void> {
    const cita = await this.findOne(id);

    await this.citasRepository.remove(cita);
  }
}
