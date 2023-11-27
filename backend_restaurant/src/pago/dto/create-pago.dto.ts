import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePagoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo mes no debe ser vacío' })
  @IsString({ message: 'El campo mes debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo mes  no debe ser mayor a 50 caracteres',
  })
  readonly mes: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo días Extra no debe ser vacío' })
  @IsString({ message: 'El campo días Extra debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo dias Extra  no debe ser mayor a 250 caracteres',
  })
  readonly diasExtra: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo pago día no debe ser vacío' })
  @IsString({ message: 'El campo pago día debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo pago día debe ser de tipo número',
  })
  readonly pagoDia: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo pago día no debe ser vacío' })
  @IsString({ message: 'El campo pago día debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo descuento debe ser de tipo número',
  })
  readonly descuento: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo total no de ser vacío' })
  @IsNumber({}, { message: 'El campo total debe ser de tipo número' })
  readonly total: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo Repartidor debe estar definido' })
  @IsNumber({}, { message: 'El campo Repartidor debe ser de tipo numérico' })
  readonly idRepartidor: number;
  diasExtra: any;
}
