import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('especialidades')
export class Especialidad {
  @PrimaryGeneratedColumn()
  id_especialidad: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}