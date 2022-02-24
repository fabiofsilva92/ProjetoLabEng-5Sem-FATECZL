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

    console.log("Produto solicitado a ser adicionado: ", produto)
    
    var carrinhoCompra = JSON.parse(localStorage.getItem("compras") + "")

    console.log("Vindo do localStorage: ", carrinhoCompra)

    var encontrados = carrinhoCompra.filter( (element: { produto: { id: number; }; }) => element.produto.id == produto.id);
   
    console.log("Lista de produtos que são iguais do produto recem adicionado ao carrinho : ",encontrados)

    var valorAtualizado :number =  produto.qtdPretentida * (parseFloat(produto.precoUnitario));
    var quantidadeAtualizada :number = produto.qtdPretentida;

    for(var i = 0; i<encontrados.length; i++) {
      valorAtualizado += parseFloat(encontrados[i].valorTotal);
      quantidadeAtualizada += parseFloat(encontrados[i].quantidade);
    }

    var encontrados2 = carrinhoCompra.filter( (element: { produto: { id: number; }; }) => element.produto.id != produto.id);

    console.log("Lista de produtos que diferem do produto recem adicionado ao carrinho : ",encontrados2)

    produto.qtdPretentida = quantidadeAtualizada;

    var compra = {
      "produto": produto,
      "valorTotal": valorAtualizado,
      "quantidade": quantidadeAtualizada
    }

    console.log("Compra atualizada : ", compra)

    encontrados2.push(compra);

    console.log("Adicionado a compra atualizado: ",encontrados2)

    localStorage.setItem("compras", JSON.stringify(encontrados2))

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
