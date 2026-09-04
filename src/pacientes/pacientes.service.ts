import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacientesRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    await this.ensureUnique(createPacienteDto.documento, createPacienteDto.correo);

    const paciente = this.pacientesRepository.create(createPacienteDto);
    return this.pacientesRepository.save(paciente);
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacientesRepository.find();
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacientesRepository.findOne({
      where: { id_paciente: id },
    });

    if (!paciente) {
      throw new NotFoundException(`No se encontró el paciente con ID ${id}`);
    }

    return paciente;
  }

  async update(
    id: number,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    const paciente = await this.findOne(id);

    if (
      updatePacienteDto.documento !== undefined ||
      updatePacienteDto.correo !== undefined
    ) {
      await this.ensureUnique(
        updatePacienteDto.documento ?? paciente.documento,
        updatePacienteDto.correo ?? paciente.correo,
        id,
      );
    }

    Object.assign(paciente, updatePacienteDto);
    return this.pacientesRepository.save(paciente);
  }

  async remove(id: number): Promise<void> {
    const paciente = await this.findOne(id);
    await this.pacientesRepository.remove(paciente);
  }

  private async ensureUnique(
    documento: string,
    correo: string,
    excludedId?: number,
  ): Promise<void> {
    const existingPaciente = await this.pacientesRepository.findOne({
      where: [{ documento }, { correo }],
    });

    if (existingPaciente && existingPaciente.id_paciente !== excludedId) {
      throw new ConflictException('El documento o correo ya está registrado');
    }
  }
}
