import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Clientes')
export class Cliente {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombreCliente: string;

  @Column({ type: 'int', nullable: false })
  carnetIdentidad: number;

  @Column({ name: 'Edad' })
  edad: Date;

  @Column({ type: 'int', nullable: false })
  numero: number;

  @Column({ name: 'fecha_registro' })
  fechaRegistro: Date;
}
