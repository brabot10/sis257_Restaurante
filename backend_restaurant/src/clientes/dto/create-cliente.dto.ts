import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre Cliente no de ser vacío' })
  @IsString({ message: 'El campo nombre Cliente debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre Cliente no debe ser mayor a 15 caracteres',
  })
  readonly nombreCliente: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo carnet Identidad debe estar definido' })
  @IsNumber(
    {},
    { message: 'El campo carnet Identidad debe ser de tipo numérico' },
  )
  readonly carnetIdentidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Edad debe estar definido' })
  @IsDateString({}, { message: 'El campo Edad debe ser de tipo fecha' })
  readonly edad: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo número debe estar definido' })
  @IsNumber({}, { message: 'El campo número debe ser de tipo numérico' })
  readonly numero: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Edad debe estar definido' })
  @IsDateString({}, { message: 'El campo Edad debe ser de tipo fecha' })
  readonly fechaRegistro: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo pedido debe estar definido' })
  @IsDateString({}, { message: 'El campo pedido debe ser de tipo numérico' })
  readonly idPedido: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo detalle debe estar definido' })
  @IsDateString({}, { message: 'El campo detalle debe ser de tipo numérico' })
  readonly idDetalles: number;
}
