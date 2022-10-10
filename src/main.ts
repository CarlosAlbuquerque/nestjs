import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // Para o validator personalizado funcionar
  // temos que fazer com que a injeção de pacote ocorra fora do container do nest
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3333);
}
bootstrap();
