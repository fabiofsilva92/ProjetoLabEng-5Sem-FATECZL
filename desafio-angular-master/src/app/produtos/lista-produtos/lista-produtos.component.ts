import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/autenticacao/login/service/login-service.service';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { browserRefresh } from 'src/app/app.component';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  //Construtor
  constructor(private produtoService: ProdutoService, private loginService: LoginServiceService, private compraService: CompraService) { }

  //Declaração de variaveis
  public produtos !: Produto[];

  private jaChamado !: boolean;

  //OnInit
  ngOnInit(): void {

    console.log('refreshed?:', browserRefresh);

    console.log("Antes da Request :", this.produtoService.verificarSeJaFoiRealizadaRequest);

    console.log("ROLE: ", localStorage.getItem("role"))

    this.produtoService.obterProdutos()
      .subscribe({
        next: (produtos: Produto[]) => {
          this.produtos = produtos;
          this.produtos.forEach(element => {
            element.qtdPretentida = 1;
            element.isAdicionado = false;
          });
          console.log(produtos);
          //  this.funcaoTeste(this.produtos);
          this.produtoService.setRequestRealizada(true);
          this.produtoService.setListaDeProdutos(this.produtos);
          console.log("Chamado? : ", this.produtoService.verificarSeJaFoiRealizadaRequest)
        },
        error: (err: Error) => {

          console.log("ESSE EH O ERRO ->", err);
        }
      })
  }

  aumentarQuantidade(produto: Produto) {
    produto.qtdPretentida = produto.qtdPretentida + 1;
    if (produto.qtdPretentida > produto.qtdEstoque) produto.qtdPretentida = produto.qtdEstoque;
    console.info(produto);
  }

  diminuirQuantidade(produto: Produto) {
    produto.qtdPretentida = produto.qtdPretentida - 1;
    if (produto.qtdPretentida == 0) produto.qtdPretentida = 1;
    console.info(produto);
  }

  adicionarAoCarrinho(produto: Produto) {
    this.compraService.addCompra(produto);
    produto.isAdicionado = true;

  }

  //Converte string para float
  public toFloat(paraConverter: string) {
    return parseFloat(paraConverter);
  }

}
