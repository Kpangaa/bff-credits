import { Controller } from '@nestjs/common';
import { LendingService } from './lending.service';

@Controller('lending')
export class LendingController {
  constructor(private readonly lendingService: LendingService) {}
}
