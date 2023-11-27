import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePlatilloDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre del producto no debe ser vacío' })
  @IsString({ message: 'El campo nombre del producto debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre del producto no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'El campo urlPlatillo del producto no debe ser vacío',
  })
  @IsString({
    message: 'El campo urlPlatillo del producto debe ser de tipo cadena',
  })
  @MaxLength(100, {
    message:
      'El campo urlPlatillo del producto no debe ser mayor a 100 caracteres',
  })
  readonly urlPlatillo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio no de ser vacío' })
  @IsNumber({}, { message: 'El campo precio debe ser de tipo número' })
  readonly precio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo de tiempo de Preparacion no de ser vacío' })
  @IsNumber(
    {},
    { message: 'El campo de tiempo de Preparacion debe ser de tipo número' },
  )
  readonly tiempoPreparacion: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo disponibilidad no de ser vacío' })
  @IsNumber({}, { message: 'El campo disponibilidad debe ser de tipo número' })
  readonly disponibilidad: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo Pedido debe estar definido' })
  @IsNumber({}, { message: 'El campo Pedido debe ser de tipo numérico' })
  readonly idPedido: number;
}
