import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FilterExceptionHttp } from './common/filters/filter-exception-http.filter';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  //fará o tratamento de dados usando o serializer para outcoming
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterExceptionHttp,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
  exports: [],
})
export class AppModule {}
