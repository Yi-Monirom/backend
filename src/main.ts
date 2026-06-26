import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import dns from 'dns';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dns.setDefaultResultOrder('ipv4first');
  app.enableCors({ credentials: true, origin: true });
  console.log(process.env.DATABASE_HOST);
  console.log(process.env.DATABASE_NAME);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
