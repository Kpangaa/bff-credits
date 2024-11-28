import { Module } from '@nestjs/common';
import { LendingService } from './lending.service';
import { LendingController } from './lending.controller';

@Module({
  controllers: [LendingController],
  providers: [LendingService],
})
export class LendingModule {}
