import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pirate from './pirate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Piraten API')
    .setDescription('Das Backend für die Task App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  const port = 8080;
  await app.listen(port);

  console.log(`⚡️ Server is running at http://localhost:${port}, haaaarrrrrr`);
  console.log(pirate);
}
bootstrap();
