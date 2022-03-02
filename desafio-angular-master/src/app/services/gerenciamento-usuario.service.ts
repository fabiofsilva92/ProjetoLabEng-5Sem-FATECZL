import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import * as bcrypt from "bcryptjs";

@Injectable({
  providedIn: 'root'
})
export class GerenciamentoUsuarioService {


  constructor(private http : HttpClient) { }

  retornarUsuario(){
    var usuario = localStorage.getItem("usuario")?.split("\"")[1];

    var email = bcrypt.hashSync(usuario+"", 10)

    return this.http.get(AppConstants.baseServidor + "cadastro-usuario",{"params": {"email": email}} ).pipe(
      data => {
        console.log("Requisição feita em : " + AppConstants.baseServidor+"cadastro-usuario/"+email)
        return data;
      }
    )
  }
}
