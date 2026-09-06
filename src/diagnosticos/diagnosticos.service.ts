import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cita } from '../citas/entities/cita.entity';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';
import { UpdateDiagnosticoDto } from './dto/update-diagnostico.dto';
import { Diagnostico } from './entities/diagnostico.entity';

@Injectable()
export class DiagnosticosService {
  constructor(
    @InjectRepository(Diagnostico)
    private readonly diagnosticosRepository: Repository<Diagnostico>,

    @InjectRepository(Cita)
    private readonly citasRepository: Repository<Cita>,
  ) {}

  async create(
    createDiagnosticoDto: CreateDiagnosticoDto,
  ): Promise<Diagnostico> {
    const cita = await this.citasRepository.findOne({
      where: {
        id_cita: createDiagnosticoDto.id_cita,
      },
    });

    if (!cita) {
      throw new NotFoundException(
        `No se encontró la cita con ID ${createDiagnosticoDto.id_cita}`,
      );
    }

    const diagnostico = this.diagnosticosRepository.create({
      descripcion: createDiagnosticoDto.descripcion,
      cita,
    });

    return this.diagnosticosRepository.save(diagnostico);
  }

  async findAll(): Promise<Diagnostico[]> {
    return this.diagnosticosRepository.find({
      relations: {
        cita: true,
      },
    });
  }

  async findOne(id: number): Promise<Diagnostico> {
    const diagnostico = await this.diagnosticosRepository.findOne({
      where: {
        id_diagnostico: id,
      },
      relations: {
        cita: true,
      },
    });

    if (!diagnostico) {
      throw new NotFoundException(
        `No se encontró el diagnóstico con ID ${id}`,
      );
    }

    return diagnostico;
  }

  async update(
    id: number,
    updateDiagnosticoDto: UpdateDiagnosticoDto,
  ): Promise<Diagnostico> {
    const diagnostico = await this.findOne(id);

    if (updateDiagnosticoDto.descripcion !== undefined) {
      diagnostico.descripcion = updateDiagnosticoDto.descripcion;
    }

    if (updateDiagnosticoDto.id_cita !== undefined) {
      const cita = await this.citasRepository.findOne({
        where: {
          id_cita: updateDiagnosticoDto.id_cita,
        },
      });

      if (!cita) {
        throw new NotFoundException(
          `No se encontró la cita con ID ${updateDiagnosticoDto.id_cita}`,
        );
      }

      diagnostico.cita = cita;
    }

    return this.diagnosticosRepository.save(diagnostico);
  }

  async remove(id: number): Promise<void> {
    const diagnostico = await this.findOne(id);

    await this.diagnosticosRepository.remove(diagnostico);
  }
}