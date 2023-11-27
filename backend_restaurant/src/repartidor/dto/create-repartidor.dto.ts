import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateRepartidorDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre del repartidor no debe ser vacío' })
  @IsString({
    message: 'El campo nombre del repartidor debe ser de tipo cadena',
  })
  @MaxLength(100, {
    message:
      'El campo nombre del repartidor  no debe ser mayor a 100 caracteres',
  })
  readonly nombreRepartidor: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo carnet de Identidad no de ser vacío' })
  @IsNumber(
    {},
    { message: 'El campo carnet de identidad debe ser de tipo número' },
  )
  readonly carnetIdentidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo edad no de ser vacío' })
  @IsNumber({}, { message: 'El campo edad debe ser de tipo número' })
  readonly edad: number;
}
