import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((responseController: NestResponse) => {
        if (responseController instanceof NestResponse) {
          const cxt = context.switchToHttp();
          const res = cxt.getResponse();
          const { headers, status, body } = responseController;

          const namesHeaders = Object.getOwnPropertyNames(headers);

          namesHeaders.forEach((nameHeader) => {
            const valueHeader = headers[nameHeader];
            this.httpAdapter.setHeader(res, nameHeader, valueHeader);
          });

          this.httpAdapter.status(res, status);

          return body;
        }

        return responseController;
      }),
    );
  }
}
