import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginServiceService } from './autenticacao/login/service/login-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log(this.loginService.token);

    

   /* if(localStorage.getItem("usuario") == null && request.method == "POST"){
      console.log("OLHA O METODO",request.method);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    }*/

    if(localStorage.getItem("usuario") && this.loginService.token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    }
    var httpEvent = next.handle(request);
    // console.log("ESSA EH A REQUEST!! : ",httpEvent);

    return httpEvent;
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
