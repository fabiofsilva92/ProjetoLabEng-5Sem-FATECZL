import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Compra } from '../model/compra';
import { browserRefresh } from '../app.component';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  public compras = new Array();


  //Adiciona produtos ao carrinho
  addCompra(produto: Produto) {

    

  }

  //Foi utilizado para tests
  mandarCompras() {
    return this.http.post(AppConstants.baseServidor + "compra", JSON.parse(JSON.stringify(this.compras[0]))).subscribe(
      {
        next: (data) => {
          console.log(JSON.stringify(data))
        },
        error: (err) => {
          console.log("Erro ao enviar compra", err);
        }
      }
    )
  }

  get comprasAdicionadas() {
    return this.compras;
  }
}
