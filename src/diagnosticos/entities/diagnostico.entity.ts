import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Cita } from '../../citas/entities/cita.entity/cita.entity';

@Entity('diagnosticos')
export class Diagnostico {
  @PrimaryGeneratedColumn()
  id_diagnostico: number;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @ManyToOne(() => Cita, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_cita' })
  cita: Cita;

  @RelationId((diagnostico: Diagnostico) => diagnostico.cita)
  id_cita: number;
}
