import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //配置跨域
  const options = new DocumentBuilder()
    .setTitle('后台管理API')
    .setDescription('供后台管理界面调用的服务端接口API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.SERVER_PORT || 3001;
  await app.listen(port);
  console.log(`http://localhost:${port}/api-docs`);
}
bootstrap();
