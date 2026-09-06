import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicoEspecialidad } from './entities/medico-especialidad.entity';
import { CreateMedicoEspecialidadDto } from './dto/create-medico-especialidad.dto';
import { UpdateMedicoEspecialidadDto } from './dto/update-medico-especialidad.dto';

import { Medico } from '../medicos/entities/medico.entity';
import { Especialidad } from '../especialidades/entities/especialidad.entity';

@Injectable()
export class MedicoEspecialidadService {
  constructor(
    @InjectRepository(MedicoEspecialidad)
    private readonly medicoEspecialidadRepository: Repository<MedicoEspecialidad>,

    @InjectRepository(Medico)
    private readonly medicosRepository: Repository<Medico>,

    @InjectRepository(Especialidad)
    private readonly especialidadesRepository: Repository<Especialidad>,
  ) {}

  async create(
    createDto: CreateMedicoEspecialidadDto,
  ): Promise<MedicoEspecialidad> {
    const medico = await this.medicosRepository.findOne({
      where: {
        id_medico: createDto.id_medico,
      },
    });

    if (!medico) {
      throw new NotFoundException(
        `No se encontró el médico con ID ${createDto.id_medico}`,
      );
    }

    const especialidad = await this.especialidadesRepository.findOne({
      where: {
        id_especialidad: createDto.id_especialidad,
      },
    });

    if (!especialidad) {
      throw new NotFoundException(
        `No se encontró la especialidad con ID ${createDto.id_especialidad}`,
      );
    }

    const existente = await this.medicoEspecialidadRepository.findOne({
      where: {
        medico: {
          id_medico: createDto.id_medico,
        },
        especialidad: {
          id_especialidad: createDto.id_especialidad,
        },
      },
    });

    if (existente) {
      throw new ConflictException(
        'El médico ya tiene asignada esta especialidad',
      );
    }

    const medicoEspecialidad = this.medicoEspecialidadRepository.create({
      medico,
      especialidad,
    });

    return this.medicoEspecialidadRepository.save(medicoEspecialidad);
  }

  async findAll(): Promise<MedicoEspecialidad[]> {
    return this.medicoEspecialidadRepository.find({
      relations: { medico: true, especialidad: true },
    });
  }

  async findOne(id: number): Promise<MedicoEspecialidad> {
    const medicoEspecialidad = await this.medicoEspecialidadRepository.findOne({
      where: {
        id_medico_especialidad: id,
      },
      relations: { medico: true, especialidad: true },
    });

    if (!medicoEspecialidad) {
      throw new NotFoundException(
        `No se encontró la relación médico-especialidad con ID ${id}`,
      );
    }

    return medicoEspecialidad;
  }

  async update(
    id: number,
    updateDto: UpdateMedicoEspecialidadDto,
  ): Promise<MedicoEspecialidad> {
    const medicoEspecialidad = await this.findOne(id);

    const nuevoMedicoId =
      updateDto.id_medico ?? medicoEspecialidad.medico.id_medico;

    const nuevaEspecialidadId =
      updateDto.id_especialidad ??
      medicoEspecialidad.especialidad.id_especialidad;

    const medico = await this.medicosRepository.findOne({
      where: {
        id_medico: nuevoMedicoId,
      },
    });

    if (!medico) {
      throw new NotFoundException(
        `No se encontró el médico con ID ${nuevoMedicoId}`,
      );
    }

    const especialidad = await this.especialidadesRepository.findOne({
      where: {
        id_especialidad: nuevaEspecialidadId,
      },
    });

    if (!especialidad) {
      throw new NotFoundException(
        `No se encontró la especialidad con ID ${nuevaEspecialidadId}`,
      );
    }

    const existente = await this.medicoEspecialidadRepository.findOne({
      where: {
        medico: {
          id_medico: nuevoMedicoId,
        },
        especialidad: {
          id_especialidad: nuevaEspecialidadId,
        },
      },
    });

    if (
      existente &&
      existente.id_medico_especialidad !==
        medicoEspecialidad.id_medico_especialidad
    ) {
      throw new ConflictException(
        'El médico ya tiene asignada esta especialidad',
      );
    }

    medicoEspecialidad.medico = medico;
    medicoEspecialidad.especialidad = especialidad;

    return this.medicoEspecialidadRepository.save(medicoEspecialidad);
  }

  async remove(id: number): Promise<void> {
    const medicoEspecialidad = await this.findOne(id);

    await this.medicoEspecialidadRepository.remove(medicoEspecialidad);
  }
}
