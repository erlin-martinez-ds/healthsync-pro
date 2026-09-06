import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MedicoEspecialidad } from '../../medico-especialidad/entities/medico-especialidad.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id_medico: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  apellido: string;

  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
  })
  documento: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  telefono: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  correo: string;

  @OneToMany(
    () => MedicoEspecialidad,
    (medicoEspecialidad) => medicoEspecialidad.medico,
  )
  especialidades: MedicoEspecialidad[];
}