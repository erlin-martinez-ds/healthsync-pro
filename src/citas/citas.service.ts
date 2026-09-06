import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

import { Paciente } from '../pacientes/entities/paciente.entity';
import { MedicoEspecialidad } from '../medico-especialidad/entities/medico-especialidad.entity';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citasRepository: Repository<Cita>,

    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,

    @InjectRepository(MedicoEspecialidad)
    private readonly medicoEspecialidadRepository: Repository<MedicoEspecialidad>,
  ) {}

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const fechaCita = new Date(createCitaDto.fecha_cita);

    if (fechaCita < new Date()) {
      throw new BadRequestException(
        'No se puede registrar una cita en el pasado',
      );
    }

    const paciente = await this.pacientesRepository.findOne({
      where: {
        id_paciente: createCitaDto.id_paciente,
      },
    });

    if (!paciente) {
      throw new NotFoundException(
        `No se encontró el paciente con ID ${createCitaDto.id_paciente}`,
      );
    }

    const medicoEspecialidad = await this.medicoEspecialidadRepository.findOne({
      where: {
        id_medico_especialidad: createCitaDto.id_medico_especialidad,
      },
    });

    if (!medicoEspecialidad) {
      throw new NotFoundException(
        `No se encontró la relación médico-especialidad con ID ${createCitaDto.id_medico_especialidad}`,
      );
    }

    const citaExistente = await this.citasRepository.findOne({
      where: {
        fecha_cita: fechaCita,
        medicoEspecialidad: {
          id_medico_especialidad: createCitaDto.id_medico_especialidad,
        },
      },
    });

    if (citaExistente) {
      throw new BadRequestException(
        'El médico ya tiene una cita programada para esa fecha y hora',
      );
    }

    const cita = this.citasRepository.create({
      fecha_cita: fechaCita,
      motivo: createCitaDto.motivo,
      paciente,
      medicoEspecialidad,
    });

    return this.citasRepository.save(cita);
  }

  async findAll(): Promise<Cita[]> {
    return this.citasRepository.find({
      relations: {
        paciente: true,
        medicoEspecialidad: {
          medico: true,
          especialidad: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Cita> {
    const cita = await this.citasRepository.findOne({
      where: {
        id_cita: id,
      },
      relations: {
        paciente: true,
        medicoEspecialidad: {
          medico: true,
          especialidad: true,
        },
      },
    });

    if (!cita) {
      throw new NotFoundException(`No se encontró la cita con ID ${id}`);
    }

    return cita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.findOne(id);

    let nuevaFecha = cita.fecha_cita;
    let nuevoMedicoEspecialidad = cita.medicoEspecialidad;

    if (updateCitaDto.fecha_cita) {
      nuevaFecha = new Date(updateCitaDto.fecha_cita);

      if (nuevaFecha < new Date()) {
        throw new BadRequestException(
          'No se puede actualizar una cita a una fecha pasada',
        );
      }
    }

    if (updateCitaDto.id_paciente !== undefined) {
      const paciente = await this.pacientesRepository.findOne({
        where: {
          id_paciente: updateCitaDto.id_paciente,
        },
      });

      if (!paciente) {
        throw new NotFoundException(
          `No se encontró el paciente con ID ${updateCitaDto.id_paciente}`,
        );
      }

      cita.paciente = paciente;
    }

    if (updateCitaDto.id_medico_especialidad !== undefined) {
      const medicoEspecialidad =
        await this.medicoEspecialidadRepository.findOne({
          where: {
            id_medico_especialidad: updateCitaDto.id_medico_especialidad,
          },
        });

      if (!medicoEspecialidad) {
        throw new NotFoundException(
          `No se encontró la relación médico-especialidad con ID ${updateCitaDto.id_medico_especialidad}`,
        );
      }

      nuevoMedicoEspecialidad = medicoEspecialidad;
    }

    const citaExistente = await this.citasRepository.findOne({
      where: {
        fecha_cita: nuevaFecha,
        medicoEspecialidad: {
          id_medico_especialidad:
            nuevoMedicoEspecialidad.id_medico_especialidad,
        },
      },
    });

    if (citaExistente && citaExistente.id_cita !== id) {
      throw new BadRequestException(
        'El médico ya tiene una cita programada para esa fecha y hora',
      );
    }

    cita.fecha_cita = nuevaFecha;
    cita.medicoEspecialidad = nuevoMedicoEspecialidad;

    if (updateCitaDto.motivo !== undefined) {
      cita.motivo = updateCitaDto.motivo;
    }

    return this.citasRepository.save(cita);
  }

  async remove(id: number): Promise<void> {
    const cita = await this.findOne(id);

    try {
      await this.citasRepository.remove(cita);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(
          'No se puede eliminar la cita porque tiene diagnósticos asociados',
        );
      }

      throw error;
    }
  }

  async findDetalle(id: number) {
    const cita = await this.citasRepository
      .createQueryBuilder('cita')
      .leftJoinAndSelect('cita.paciente', 'paciente')
      .leftJoinAndSelect('cita.medicoEspecialidad', 'medicoEspecialidad')
      .leftJoinAndSelect('medicoEspecialidad.medico', 'medico')
      .leftJoinAndSelect('medicoEspecialidad.especialidad', 'especialidad')
      .leftJoinAndSelect('cita.diagnosticos', 'diagnostico')
      .where('cita.id_cita = :id', { id })
      .getOne();

    if (!cita) {
      throw new NotFoundException(`No se encontró la cita con ID ${id}`);
    }

    return {
      id_cita: cita.id_cita,
      fecha: this.formatFecha(cita.fecha_cita),
      motivo: cita.motivo,
      paciente: {
        nombre: cita.paciente.nombre,
        apellido: cita.paciente.apellido,
      },
      medico: {
        nombre: cita.medicoEspecialidad.medico.nombre,
        apellido: cita.medicoEspecialidad.medico.apellido,
        especialidad: {
          nombre: cita.medicoEspecialidad.especialidad.nombre,
        },
      },
      diagnosticos: cita.diagnosticos.map((diagnostico) => ({
        descripcion: diagnostico.descripcion,
      })),
    };
  }

  private formatFecha(fecha: Date): string {
    return new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      hour12: true,
    })

      .format(fecha)
      .replace(',', '');
  }
}
