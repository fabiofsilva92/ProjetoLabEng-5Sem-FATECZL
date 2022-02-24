import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { AppConstants } from '../../../app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {


  sessaoExpirada() {
    localStorage.setItem("sessao", "Sessão Expirada, por favor faça o login novamente");
  }

  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;

  constructor(private http: HttpClient, private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(JSON.stringify(localStorage.getItem('usuario'))));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.getValue();
  }

  public get token() {
    return localStorage.getItem("token");
  }

  login(usuario: any) {
    return this.http.post(AppConstants.baseLogin, JSON.parse(JSON.stringify(usuario))).subscribe(
      {
        next: (data) => {
          
          var token = JSON.parse(JSON.stringify(data)).token;
          localStorage.setItem("token", token);
          localStorage.setItem("usuario", JSON.stringify(usuario.login));
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("compras", JSON.stringify(new Array))
          localStorage.setItem("cep", ""),
          localStorage.removeItem("sessao");
          this.currentUserSubject.next(usuario.login)
          
          console.log("Current user value: ", this.currentUserValue)
          console.info("Token " + localStorage.getItem("token"));
          
          this.router.navigate(['/']); //Alterar
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  getRole(email: string){
    return this.http.post(AppConstants.baseServidor+"role", JSON.parse(JSON.stringify(email))).subscribe(
      {
        next: (data) => {
            console.log("Data: ",data);
            localStorage.setItem("role", JSON.stringify(data));
          
        },
        error: (err) => {
          console.log("ERRO : ",err);
        }
      }
    )
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('isLogged')
    localStorage.removeItem('compras')
    localStorage.removeItem('role')
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  setUserName(username: string) {
    localStorage.setItem('username', JSON.stringify(username))
  }

  getUserName() {
    return JSON.parse(JSON.stringify(localStorage.getItem('username')));
  }
}
