import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
 

  constructor(private http: HttpClient) { }

  buscarVendasUsuario() {
    
    return this.http.get(AppConstants.baseServidor+"venda/").pipe(
      data => {
        return data;
      }
    )

  }

  salvarVenda(compra: any){

    var venda = {
      "compra": compra,
      "status": "PAGAMENTO_APROVADO"
    }

    console.log("Json enviado ",JSON.parse(JSON.stringify(venda)));

    return this.http.post(AppConstants.baseServidor+"venda", JSON.parse(JSON.stringify(venda))).pipe(
      data =>{
        return data;
      }
    )

  }
}
