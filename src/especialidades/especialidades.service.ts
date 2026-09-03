import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Especialidad } from './entities/especialidad.entity';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) {}

  async create(
    createEspecialidadDto: CreateEspecialidadDto,
  ): Promise<Especialidad> {
    const { nombre } = createEspecialidadDto;

    const especialidadExistente = await this.especialidadRepository.findOne({
      where: { nombre },
    });

    if (especialidadExistente) {
      throw new ConflictException(
        'Ya existe una especialidad con ese nombre',
      );
    }

    const especialidad =
      this.especialidadRepository.create(createEspecialidadDto);

    return await this.especialidadRepository.save(especialidad);
  }

  async findAll(): Promise<Especialidad[]> {
    return await this.especialidadRepository.find();
  }

  async findOne(id: number): Promise<Especialidad> {
    const especialidad = await this.especialidadRepository.findOne({
      where: { id_especialidad: id },
    });

    if (!especialidad) {
      throw new NotFoundException(
        `No existe una especialidad con el ID ${id}`,
      );
    }

    return especialidad;
  }

  async update(
    id: number,
    updateEspecialidadDto: UpdateEspecialidadDto,
  ): Promise<Especialidad> {
    const especialidad = await this.findOne(id);

    if (updateEspecialidadDto.nombre) {
      const especialidadExistente =
        await this.especialidadRepository.findOne({
          where: { nombre: updateEspecialidadDto.nombre },
        });

      if (
        especialidadExistente &&
        especialidadExistente.id_especialidad !== id
      ) {
        throw new ConflictException(
          'Ya existe una especialidad con ese nombre',
        );
      }
    }

    Object.assign(especialidad, updateEspecialidadDto);

    return await this.especialidadRepository.save(especialidad);
  }

  async remove(id: number): Promise<void> {
    const especialidad = await this.findOne(id);

    await this.especialidadRepository.remove(especialidad);
  }
}