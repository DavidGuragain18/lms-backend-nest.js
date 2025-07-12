import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply global pipes
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('LMS API')
    .setDescription('Learning Management System API')
    .setVersion('1.0')
    .addBearerAuth() // For JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Must be BEFORE app.listen()

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();