import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LendingController } from './lending.controller';
import { LendingService } from './lending.service';
import { LocalizedTextService } from './mapper/localized-text.service';
import { environment } from 'src/config';
import { TokenMiddleware } from 'src/config/middlewares/TokenMiddleware';

@Module({
  controllers: [LendingController],
  providers: [
    LendingService,
    {
      provide: LocalizedTextService,
      useValue: new LocalizedTextService(environment.COUNTRY),
    },
  ],
})
export class LendingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*');
  }
}
