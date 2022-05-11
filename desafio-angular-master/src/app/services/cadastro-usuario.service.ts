import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {


  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: any) {
    return this.http.post(AppConstants.baseServidor + "cadastro-usuario", JSON.parse(JSON.stringify(usuario))).pipe(
      data => {
        console.log(data);
        return data;
      }
    )
  }

  verificaCPF(value: any) {

    var arrayDeFormatar = value.split(".");
    var ultimaparte = arrayDeFormatar[2].split("-");

    var formatado = arrayDeFormatar[0] + arrayDeFormatar[1] + ultimaparte[0] + ultimaparte[1];

    console.log("Formatado : ", formatado)

    return this.http.get("https://api.invertexto.com/v1/validator?token=381|9MwXkvoy9sjQweN5wfpACjnJ281qrRr8&value=" + formatado + "&type=cpf", JSON.parse(JSON.stringify(formatado))).pipe(
      data => {
        console.log(data);
        return data;
      }
    )
  }

  atualizarUsuario(usuario:any){

    let params = new HttpParams().set('id', usuario.id);

    console.log("Iniciando atualizarUsuario: ", usuario)

    return this.http.put(AppConstants.baseServidor+"cadastro-usuario/"+usuario.id, JSON.parse(JSON.stringify(usuario))).pipe(
      data => {
        console.log(data);
        return data;
      }
    )
  }

  atualizarUsuarioRecupera(usuario:any){

    let params = new HttpParams().set('id', usuario.id);

    console.log("Iniciando atualizarUsuario: ", usuario.id)

    return this.http.put(AppConstants.baseServidor+"cadastro-usuario/recupera/"+usuario.id, JSON.parse(JSON.stringify(usuario))).pipe(
      data => {
        console.log(data);
        return data;
      }
    )
  }

  buscarUsuarioPorId(id:any){
    return this.http.get(AppConstants.baseServidor+"cadastro-usuario/recupera/"+id).pipe(
      data => {
        return data;
      }
    )
  }

  recuperaSenha(email:any){
    return this.http.post(AppConstants.baseLogin+"/recupera/"+email, JSON.parse(JSON.stringify(email))).pipe(
      data => {
        console.log("Tentativa de recuperar senha: "+data);
        return data;
      }
    )
  }

  
}
