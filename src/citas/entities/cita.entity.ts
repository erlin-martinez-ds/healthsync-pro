import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Paciente } from '../../pacientes/entities/paciente.entity';
import { MedicoEspecialidad } from '../../medico-especialidad/entities/medico-especialidad.entity';
import { Diagnostico } from '../../diagnosticos/entities/diagnostico.entity';
@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn()
  id_cita: number;

  @Column({ type: 'datetime' })
  fecha_cita: Date;

  @Column({
    type: 'varchar',
    length: 255,
  })
  motivo: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.citas, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_paciente' })
  paciente: Paciente;

  @ManyToOne(() => MedicoEspecialidad, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_medico_especialidad' })
  medicoEspecialidad: MedicoEspecialidad;

  @OneToMany(() => Diagnostico, (diagnostico) => diagnostico.cita)
  diagnosticos: Diagnostico[];
}
