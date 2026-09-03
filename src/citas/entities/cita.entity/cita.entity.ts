import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn()
  id_cita: number;

  @Column({ type: 'datetime' })
  fecha_cita: Date;

  @Column({ type: 'varchar', length: 255 })
  motivo: string;

  @Column()
  id_paciente: number;

  @Column()
  id_medico_especialidad: number;
}
