import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RepartidorService } from './repartidor.service';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Repartidor')
@Controller('repartidor')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RepartidorController {
  constructor(private readonly repartidorService: RepartidorService) {}

  @Post()
  create(@Body() createRepartidorDto: CreateRepartidorDto) {
    return this.repartidorService.create(createRepartidorDto);
  }

  @Get()
  findAll() {
    return this.repartidorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repartidorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRepartidorDto: UpdateRepartidorDto,
  ) {
    return this.repartidorService.update(+id, updateRepartidorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repartidorService.remove(+id);
  }
}
