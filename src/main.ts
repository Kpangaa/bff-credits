import { Logger, ValidationPipe } from '@nestjs/common';
import { RestApplicationFactory } from '@pepa/platform-rest';
import { AppModule } from './app.module';
import { environment } from './config';
import { options } from './app.options';

async function bootstrap() {
  const port = environment.port;

  // Rest application factory
  const app = await RestApplicationFactory.create(AppModule, options);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
