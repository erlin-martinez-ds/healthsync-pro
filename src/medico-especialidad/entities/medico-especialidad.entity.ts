import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Medico } from '../../medicos/entities/medico.entity';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';

@Entity('medico_especialidad')
export class MedicoEspecialidad {
  @PrimaryGeneratedColumn()
  id_medico_especialidad!: number;

  @ManyToOne(() => Medico, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_medico' })
  medico!: Medico;

  @ManyToOne(() => Especialidad, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_especialidad' })
  especialidad!: Especialidad;
}
