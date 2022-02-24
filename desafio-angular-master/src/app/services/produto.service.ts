import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Compra } from '../model/compra';
import { Produto } from '../model/produto';
import { CompraService } from './compra.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {


  private isRequestRealizada: boolean = false;

  private produtos !: Produto[];

  constructor(private http: HttpClient, private compraService: CompraService) { }

  //Obtem todos os produtos cadastrados no db
  obterProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>
      (AppConstants.baseServidor + "produtos");
  }

  setRequestRealizada(booleano: boolean) {
    this.isRequestRealizada = booleano;
  }

  public get verificarSeJaFoiRealizadaRequest() {
    return this.isRequestRealizada;
  }

  setListaDeProdutos(produtos: Produto[]) {
    this.produtos = produtos;
  }

  public get listaDeProdutos() {
    return this.produtos;
  }

}
