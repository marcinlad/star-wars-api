import { writeFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { execSync } from 'child_process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // generate swagger docs
  const config = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('API for retrieving Star Wars characters')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  writeFileSync('./docs/swagger-spec.json', JSON.stringify(document, null, 2));

  // generate redoc docs from swagger spec
  execSync(
    'npx redocly build-docs docs/swagger-spec.json --output docs/index.html',
    { stdio: 'inherit' },
  );

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
