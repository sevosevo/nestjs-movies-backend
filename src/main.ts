import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = 8000;
  await app.listen(PORT, () => console.log('Listening to port ' + PORT));
}
bootstrap();
