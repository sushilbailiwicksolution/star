import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 * @ignore
 */
export interface Response<T> {
    status: string;
    errorInfo: {
        errorCode: number;
        errorLevel: string;
        errorMessage: string;
    };
    results: T;
}

/**
 * @ignore
 */
@Injectable()
export class ResTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => this.makeResponse(data)));
    }
    makeResponse(data) {
        return { status: "Success", errorInfo: { errorCode: 200, errorLevel: "OK", errorMessage: "Success" }, results: data };
    }
}