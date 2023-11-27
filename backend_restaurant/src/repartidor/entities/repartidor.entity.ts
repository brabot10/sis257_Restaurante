import { Pago } from 'src/pago/entities/pago.entity';
import { PedidoEntity } from 'src/pedido/entities/pedido.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('repartidor')
export class RepartidorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombreRepartidor: string;

  @Column({ type: 'int', nullable: false })
  carnetIdentidad: number;

  @Column({ type: 'int', nullable: false })
  edad: number;

  @OneToMany(() => PedidoEntity, pedidos => pedidos.repartidor)
  pedidos: PedidoEntity[];

  @OneToMany(() => Pago, pagos => pagos.repartidor)
  pagos: Pago[];
}
