import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Medico } from './entities/medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicosRepository: Repository<Medico>,
  ) {}

  async create(createMedicoDto: CreateMedicoDto): Promise<Medico> {
    const documentoExistente = await this.medicosRepository.findOne({
      where: { documento: createMedicoDto.documento },
    });

    if (documentoExistente) {
      throw new ConflictException(
        'Ya existe un médico registrado con ese documento',
      );
    }

    const correoExistente = await this.medicosRepository.findOne({
      where: { correo: createMedicoDto.correo },
    });

    if (correoExistente) {
      throw new ConflictException(
        'Ya existe un médico registrado con ese correo',
      );
    }

    const medico = this.medicosRepository.create(createMedicoDto);

    return this.medicosRepository.save(medico);
  }

  async findAll(): Promise<Medico[]> {
    return this.medicosRepository.find();
  }

  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicosRepository.findOne({
      where: { id_medico: id },
    });

    if (!medico) {
      throw new NotFoundException(`No se encontró el médico con ID ${id}`);
    }

    return medico;
  }

  async update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
    const medico = await this.findOne(id);

    if (updateMedicoDto.documento !== undefined) {
      const documentoExistente = await this.medicosRepository.findOne({
        where: { documento: updateMedicoDto.documento },
      });

      if (
        documentoExistente &&
        documentoExistente.id_medico !== medico.id_medico
      ) {
        throw new ConflictException(
          'Ya existe otro médico registrado con ese documento',
        );
      }

      medico.documento = updateMedicoDto.documento;
    }

    if (updateMedicoDto.correo !== undefined) {
      const correoExistente = await this.medicosRepository.findOne({
        where: { correo: updateMedicoDto.correo },
      });

      if (correoExistente && correoExistente.id_medico !== medico.id_medico) {
        throw new ConflictException(
          'Ya existe otro médico registrado con ese correo',
        );
      }

      medico.correo = updateMedicoDto.correo;
    }

    if (updateMedicoDto.nombre !== undefined) {
      medico.nombre = updateMedicoDto.nombre;
    }

    if (updateMedicoDto.apellido !== undefined) {
      medico.apellido = updateMedicoDto.apellido;
    }

    if (updateMedicoDto.telefono !== undefined) {
      medico.telefono = updateMedicoDto.telefono;
    }

    return this.medicosRepository.save(medico);
  }

  async remove(id: number): Promise<void> {
    const medico = await this.findOne(id);

    await this.medicosRepository.remove(medico);
  }
}
