import { Detalle } from 'src/detalles/entities/detalle.entity';
import { PedidoEntity } from 'src/pedido/entities/pedido.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('clientes')
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

  @ManyToOne(() => PedidoEntity, pedido => pedido.clientes)
  @JoinColumn({ name: 'id_Pedido', referencedColumnName: 'id' })
  pedido: PedidoEntity;

  @OneToMany(() => Detalle, detalles => detalles.clientes)
  detalles: Detalle;
}
