import { Test, TestingModule } from '@nestjs/testing';
import { MedicoEspecialidadController } from './medico-especialidad.controller';

describe('MedicoEspecialidadController', () => {
  let controller: MedicoEspecialidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicoEspecialidadController],
    }).compile();

    controller = module.get<MedicoEspecialidadController>(
      MedicoEspecialidadController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
