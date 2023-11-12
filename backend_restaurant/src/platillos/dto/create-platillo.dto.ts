import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlatilloDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre del producto no debe ser vacío' })
    @IsString({ message: 'El campo nombre del producto debe ser de tipo cadena' })
    readonly nombre: string;

    @IsNotEmpty({ message: 'El campo precio no de ser vacío' })
    @IsNumber({}, { message: 'El campo precio debe ser de tipo número' })
    readonly precio:number;

    @ApiProperty()
    @IsDefined({ message: 'El campo Pedido debe estar definido' })
    @IsNumber({}, { message: 'El campo Pedido debe ser de tipo numérico' })
    readonly idPedido: number;
}
