import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { PedidoEntity } from 'src/pedido/entities/pedido.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}
  async create(createClienteDto: CreateClienteDto) {
    const existeCliente = await this.clienteRepository.findOneBy({
      nombreCliente: createClienteDto.nombreCliente,
      pedido: { id: createClienteDto.idPedido },
    });

    if (existeCliente) {
      throw new ConflictException(
        `El cliente ${createClienteDto.nombreCliente} ya existe.`,
      );
    }

    return this.clienteRepository.save({
      nombreCliente: createClienteDto.nombreCliente.trim(),
      carnetIdentidad: createClienteDto.carnetIdentidad,
      edad: createClienteDto.edad,
      numero: createClienteDto.numero,
      idPedido: { id: createClienteDto.idPedido },
      idDetalles: { id: createClienteDto.idDetalles },
    });
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      relations: ['pedido', 'detalles'],
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const Clientes = await this.clienteRepository.findOne({
      where: { id },
      relations: ['pedido', 'detalles'],
    });
    if (!Clientes) {
      throw new NotFoundException(`El Cliente no existe ${id}`);
    }
    return Clientes;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`El Cliente no existe ${id}`);
    }
    const clienteUpdate = Object.assign(cliente, updateClienteDto);
    clienteUpdate.pedido = { id: updateClienteDto.idPedido } as PedidoEntity;
    clienteUpdate.detalles = { id: updateClienteDto.idDetalles } as Detalle;
    return this.clienteRepository.save(clienteUpdate);
  }

  async remove(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException(`El cliente ${id} no existe.`);
    }

    return this.clienteRepository.delete(id);
  }
}
