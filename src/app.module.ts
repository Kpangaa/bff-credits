import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaqsModule } from './modules/faqs';

@Module({
  imports: [
    FaqsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
