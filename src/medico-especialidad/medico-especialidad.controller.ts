import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { MedicoEspecialidadService } from './medico-especialidad.service';
import { CreateMedicoEspecialidadDto } from './dto/create-medico-especialidad.dto';
import { UpdateMedicoEspecialidadDto } from './dto/update-medico-especialidad.dto';

@Controller('medico-especialidad')
export class MedicoEspecialidadController {
  constructor(
    private readonly medicoEspecialidadService: MedicoEspecialidadService,
  ) {}

  @Post()
  create(@Body() createDto: CreateMedicoEspecialidadDto) {
    return this.medicoEspecialidadService.create(createDto);
  }

  @Get()
  findAll() {
    return this.medicoEspecialidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicoEspecialidadService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMedicoEspecialidadDto,
  ) {
    return this.medicoEspecialidadService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicoEspecialidadService.remove(id);
  }
}
