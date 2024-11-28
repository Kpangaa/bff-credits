import { Controller, Get, Inject, Query } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { RestResponse } from '@pepa/platform-rest/.';

@Controller('faqs')
export class FaqsController {
    constructor(
        private readonly faqsService: FaqsService,
        @Inject('COUNTRY') private readonly country: string,
    ){}

    @Get('credits/api/v1/faqs')
    faqsLending(
        @Query('productKey') productKey: string,
    ) {
        const respFaqs = this.faqsService.getFaqsLending(productKey, this.country);
        return new RestResponse(respFaqs);
    }
}
