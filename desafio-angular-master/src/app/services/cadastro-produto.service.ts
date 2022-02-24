import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class CadastroProdutoService {


  constructor(private http: HttpClient) { }


  cadastrarProduto(produto: any) {

    console.log("Produto chegando: ", produto)
    return this.http.post(AppConstants.baseServidor + "produtos", JSON.parse(JSON.stringify(produto))).pipe(
      data => {
        console.log(data);
        return data;
      }
    )
  }

}
