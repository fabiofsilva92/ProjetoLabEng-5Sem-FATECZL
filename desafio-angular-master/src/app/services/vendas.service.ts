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
}
