import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  prefix: '/uploads/',
});

  app.enableCors({
     origin: 'https://library-managment-frontend-self.vercel.app/', 
    // origin: 'http://localhost:5173', // frontend origin
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',              // if you’re sending cookies or auth headers
  });


  const config = new DocumentBuilder()
    .setTitle('My NestJS API')
    .setDescription('Auto-generated Swagger API docs')
    .setVersion('1.0')
    .addBearerAuth({
				description: 'User JWT Token',
				type: 'http',
				scheme: 'bearer',
				in: 'header',
				name: 'jwt',
				bearerFormat: 'JWT',
			},
			'JWT-auth',) // for JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(process.env.PORT ?? 3000); 
  Logger.log(`${ await app.getUrl()}/api`) 
}
bootstrap();
