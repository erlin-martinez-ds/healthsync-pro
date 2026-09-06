import { Test, TestingModule } from '@nestjs/testing';
import { MedicoEspecialidadService } from './medico-especialidad.service';

describe('MedicoEspecialidadService', () => {
  let service: MedicoEspecialidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicoEspecialidadService],
    }).compile();

    service = module.get<MedicoEspecialidadService>(MedicoEspecialidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
