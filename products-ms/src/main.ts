import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Main")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.setGlobalPrefix('api/v1')

  await app.listen(envs.port);
  logger.log(`App running on port ${envs.port}`)
}
bootstrap();
