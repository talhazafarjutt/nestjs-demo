import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Get environment variables
  const port = configService.get<number>('PORT') || 3000;
  const apiTitle = configService.get<string>('API_TITLE') || 'Notes API';
  const apiDescription = configService.get<string>('API_DESCRIPTION') || 'A simple notes management API built with NestJS and MongoDB';
  const apiVersion = configService.get<string>('API_VERSION') || '1.0';
  const apiTag = configService.get<string>('API_TAG') || 'notes';
  const swaggerPath = configService.get<string>('SWAGGER_PATH') || 'api';
  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(apiTitle)
    .setDescription(apiDescription)
    .setVersion(apiVersion)
    .addTag(apiTag)
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);
  
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/${swaggerPath}`);
}
bootstrap();
