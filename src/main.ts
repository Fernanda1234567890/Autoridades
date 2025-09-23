import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.setGlobalPrefix('api')
  app.enableCors({
  origin:'*', // tus dos frontends
  credentials: true, // si usas cookies o headers de autorización
});

  await app.listen(3000);
}
bootstrap();