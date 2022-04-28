import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginServiceService } from './autenticacao/login/service/login-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(erro => {
      if(erro.status === 403){
        //this.loginService.logout();
        //this.loginService.sessaoExpirada();
        //location.reload();
      }

      const error = erro.error.message || erro.statusText;
      return throwError(error);
    }));
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
