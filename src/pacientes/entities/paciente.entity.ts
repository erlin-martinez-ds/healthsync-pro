import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('pacientes')
@Unique(['documento'])
@Unique(['correo'])
export class Paciente {
  @PrimaryGeneratedColumn()
  id_paciente: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 50 })
  documento: string;

  @Column({ type: 'date' })
  fecha_nacimiento: string;

  @Column({ type: 'varchar', length: 30 })
  telefono: string;

  @Column({ type: 'varchar', length: 255 })
  correo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direccion?: string;
}
