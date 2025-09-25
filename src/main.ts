import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'uploads/personas'), {
    prefix: '/uploads/personas/',
  });
  app.setGlobalPrefix('api')
  app.enableCors({
  origin:'*', 
  credentials: true, 
});

  await app.listen(3000);
}
bootstrap();