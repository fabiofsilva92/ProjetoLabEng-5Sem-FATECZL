import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {


  private objetoCEP !: any;

  constructor(private http: HttpClient) { }

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
      "compras": compras,
      "valorTotal": subTotal,
      "cep": cep
    }

    console.log("OLHA O CARRINHO: ", carrinho)
    //Realizar pipe

    return this.http.post(AppConstants.baseServidor + "carrinho", JSON.parse(JSON.stringify(carrinho))).pipe(
      data => {
        return data;
      }
    )


  }


}
