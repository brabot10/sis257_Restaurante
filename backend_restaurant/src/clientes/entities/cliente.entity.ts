import { Detalle } from 'src/detalles/entities/detalle.entity';
import { PedidoEntity } from 'src/pedido/entities/pedido.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
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

  @OneToMany(() => PedidoEntity, pedidos => pedidos.Cliente)
  pedidos: PedidoEntity[];

  @OneToMany(() => Detalle, detalles => detalles.clientes)
  detalles: Detalle[];
}
