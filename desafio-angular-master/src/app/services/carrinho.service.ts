import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {


  private objetoCEP !: any;

  constructor(private http: HttpClient) { }

  verificaCartaoUsuario(){
    return this.http.get(AppConstants.baseServidor+"cartao").pipe(
      data => {return data}
    )
  }

  
  updateCartao(cartao: any){
    console.log("CARTAO: ", cartao)


    return this.http.post(AppConstants.baseLogin+"cartao", cartao).subscribe(
      {
      next: (data: any) => {
        console.log("Cartao atualizado: ",data)
      },
      error: (err: any) => {
        console.log("Erro atualizando cartao", err)
      }
    })
  }

  //Verifica o CEP na API invertexto
  verificaCEP(cep: string) {
    return this.http.get("https://api.invertexto.com/v1/cep/" + cep + "?token=379|ILChWRDkDMtQ2SfI9jqvXuLHY73rAt9v", JSON.parse(JSON.stringify(cep))).pipe(data => {
      this.objetoCEP = JSON.stringify(data);
      return data;
    }
    )
  }

  get objetoCEPConstruido() {
    return this.objetoCEP;
  }


  //Tests debug
  enviarTest(compras: any[]) {
    return this.http.post(AppConstants.baseServidor + "compra/test", JSON.parse(JSON.stringify(compras))).subscribe(
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

  //Esvazia o carrinho
  esvaziarCarrinho() {
    localStorage.setItem("compras", JSON.stringify(new Array()))
  }

  //Realiza Checkout
  realizarCheckout(compras: any[], subTotal: any, cep: string) {
  
    var emailUsuario = localStorage.getItem("usuario")+"";

    var carrinho = {
      //"usuario": { "email": localStorage.getItem("usuario") },
      "resumoProdutos": compras,
      "valorTotal": subTotal,
      "cep": cep
    }

    console.log("OLHA O CARRINHO: ", carrinho)
    //Realizar pipe

    return this.http.post(AppConstants.baseServidor + "compra", JSON.parse(JSON.stringify(carrinho))).pipe(
      data => {
        return data;
      }
    )


  }


  adicionarAoCarrinho(produto: Produto){
    console.log("Produto solicitado a ser adicionado: ", produto)
    
    var carrinhoCompra = JSON.parse(localStorage.getItem("resumoCarrinhoProduto") + "")

    console.log("Vindo do localStorage: ", carrinhoCompra)

    //Lista de produtos que são iguais do produto recem adicionado ao carrinho 
    var encontrados = carrinhoCompra.filter( (element: { produto: { id: number; }; }) => element.produto.id == produto.id);
   
    console.log("Lista de produtos que são iguais do produto recem adicionado ao carrinho : ",encontrados)

    var valorAtualizado :number =  produto.qtdPretentida * (parseFloat(produto.precoUnitario));
    var quantidadeAtualizada :number = produto.qtdPretentida;

    for(var i = 0; i<encontrados.length; i++) {
      valorAtualizado += parseFloat(encontrados[i].valorTotal);
      quantidadeAtualizada += parseFloat(encontrados[i].quantidade);
    }

    //Lista de produtos que diferem do produto recem adicionado ao carrinho 
    var encontrados2 = carrinhoCompra.filter( (element: { produto: { id: number; }; }) => element.produto.id != produto.id);

    console.log("Lista de produtos que diferem do produto recem adicionado ao carrinho : ",encontrados2)

    produto.qtdPretentida = quantidadeAtualizada;

    var compra = {
      "produto": produto,
      "quantidade": quantidadeAtualizada
    }

    console.log("Compra atualizada : ", compra)

    encontrados2.push(compra);

    console.log("Adicionado a compra atualizado: ",encontrados2)

    localStorage.setItem("resumoCarrinhoProduto", JSON.stringify(encontrados2))
  }


}
