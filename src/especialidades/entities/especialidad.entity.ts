import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MedicoEspecialidad } from '../../medico-especialidad/entities/medico-especialidad.entity';

@Entity('especialidades')
export class Especialidad {
  @PrimaryGeneratedColumn()
  id_especialidad: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  descripcion: string;

  @OneToMany(
    () => MedicoEspecialidad,
    (medicoEspecialidad) => medicoEspecialidad.especialidad,
  )
  medicos: MedicoEspecialidad[];
}