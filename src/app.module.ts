import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductoModule } from './producto/producto.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
        return { uri };
      },
      inject: [ConfigService],
    }),
    ProductoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
