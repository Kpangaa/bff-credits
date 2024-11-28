import { DynamicModule, Module } from '@nestjs/common';
import { ApiExtrapayService } from './api-extrapay-service.service';
import { HttpClientModule } from '@pepa/http-client';

@Module({
  controllers: [],
  providers: [ApiExtrapayService],
  exports: [ApiExtrapayService],
})
export class ModulesApiExtrapayClient {
  static register(options: Record<string, unknown>): DynamicModule {
    return {
      module: ModulesApiExtrapayClient,
      providers: [ApiExtrapayService],
      exports: [ModulesApiExtrapayClient],
      imports: [
        HttpClientModule.forRoot([
          {
            name: 'HTTP_CLIENT_API_EXTRA_PAY',
            baseUrl: <string>options['urlBase'],
          },
        ]),
      ],
      global: true,
    };
  }
}
