import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitasModule } from './citas/citas.module';
import { DiagnosticosModule } from './diagnosticos/diagnosticos.module';
import { PacientesModule } from './pacientes/pacientes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),

        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    CitasModule,
    PacientesModule,
    DiagnosticosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
