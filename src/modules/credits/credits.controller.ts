import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PepaExecutionContext } from '@pepa/common';
import { Client, RequestClient, RestResponse } from '@pepa/platform-rest/.';
import { MatrixCallApi } from './utils/matrix-call-api';
import { DatalistProductType, PRODUCT_FEATURED } from 'src/common/constants';
import { ApiLoansServiceService } from 'src/integrations/api-loans-client/src';
import { ApiExtrapayService } from 'src/integrations/api-extrapay-client/src';
import { LoanCheckoutServiceService } from 'src/integrations/loan-checkout-service/src';
import { LoansProductsServiceService } from 'src/integrations/loans-products-service/src';

@Controller('credits')
@ApiTags('Credits - Home Prestamos')
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export class CreditsController {
  constructor(private readonly creditsService: CreditsService,
    private readonly context: PepaExecutionContext,
    private loan: ApiLoansServiceService,
    private extrapay: ApiExtrapayService,
    private loanCheckoutService: LoanCheckoutServiceService,
    private loanProductService: LoansProductsServiceService,

  ) {}

  @Get(['credits/api/v1/featured-product', 'api/credit/v1/featured-product'])
  @ApiOperation({ summary: 'Get list button show in home credits' })
  async getFeaturedProduct(@Client() client: RequestClient) {
    const clientId = client.sub;
    const auth: string = this.context.get('token');

    const listProductClient = await this.getListProuct(client);

    const { body } = await MatrixCallApi(
      PRODUCT_FEATURED,
      auth,
      clientId,
      this.loan,
      this.extrapay,
      this.loanProductService,
    );

    if (body?.status) {
      return new RestResponse(body);
    }

    const result = this.creditsService.getFeaturedProduct(
      body.availableCredit,
      body.productType,
      listProductClient.body,
    );

    return result;
  }

  @Get(['credits/api/v1/list-product', 'api/credit/v1/list-product'])
  @ApiOperation({ summary: 'Get list of users products' })
  async getListProuct(
    @Client() client: RequestClient,
  ): Promise<RestResponse<DatalistProductType>> {
    const clientId = client.sub;
    const resultLoans = await this.loanCheckoutService.getProductClient(
      clientId,
    );
    return resultLoans;
  }
}

