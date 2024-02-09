import * as fs from 'fs';
import * as https from 'https';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
/**
 * @ignore
 */
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions: {
  //     key: fs.readFileSync('/home/ssl_cert/star-ads-app/new-private-key.txt', 'utf8'),
  //     cert: fs.readFileSync('/home/ssl_cert/star-ads-app/new-certificate.crt', 'utf8'),
  //   },
  // });

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('/home/ssl_cert/star-ads-app/new-private-key.txt', 'utf8'),
      cert: fs.readFileSync('/home/ssl_cert/star-ads-app/8254c3b042470198.crt'),
    },
  });
  

  const globalPrefix = 'application-service/secured';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  /**
   * Display API using swagger to a port 
   * @function 
   */
  const port = process.env.APP_PORT || 3377;
  // const port = 3333;
  const config = new DocumentBuilder()
    .setTitle('Star Api')
    .setDescription('Star API Documentation')
    .setVersion('2.0')
    .addTag('star')
    .build();
    /**
     * @param app is argument passed to createDocument of swaggerModule. It contains all the api components.
     */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);
  app.enableCors({});
  /**
   * @param port is where our Swagger API is running 
   */
  await app.listen(port);
  /**
   * Logger is simply message function . It display port  
   */
  Logger.log(
    `🚀 Application is running on PORT: ${port} URIs:- ${globalPrefix}`
  );
}
bootstrap();