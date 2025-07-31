import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductoModule } from './producto/producto.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carga .env automáticamente
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const user = config.get<string>('MONGO_USER');
        const password = config.get<string>('MONGO_PASSWORD');
        const host = config.get<string>('MONGO_HOST');
        const port = config.get<string>('MONGO_PORT');
        const db = config.get<string>('MONGO_DB');
        const uri = `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`;

        console.log(uri);
        return { uri };
      },
      inject: [ConfigService],
    }),
    ProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
