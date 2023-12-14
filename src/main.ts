import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Back-end todo app')
    .setDescription(
      'This API allows you to manage tasks and categories using a JSON-based database. You can create, read, update, and delete tasks and categories, as well as assign tasks to categories. The API follows the RESTful principles and uses the HTTP methods GET, POST, and DELETE. The API also validates the data and handles errors gracefully',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
