import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compra } from 'src/app/model/compra';
import { Produto } from 'src/app/model/produto';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CompraService } from 'src/app/services/compra.service';
import { VendasService } from 'src/app/services/vendas.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit, OnDestroy {

  //Declaração de variáveis
  public compras = new Array();
  public produtos = new Array();
  public valorTotal : number = 0;
  public carrinho = {
    "produtos": this.produtos,
    "valorTotal": this.valorTotal
  }
  public subTotal: number = 0;
  public cep: string = "";
  public erroCEP: boolean = false;
  public objetoCEP: any = '';
  public usuario: any;
  public pedidoRealizado: boolean = false;
  public erroPedido: boolean = false;
  public loadingPedido: boolean = false;

  //Construtor
  constructor(private compraService: CompraService, private carrinhoService: CarrinhoService,
    private vendaService: VendasService, private router: Router) { }

  //On Destroy
  ngOnDestroy(): void {
    localStorage.setItem("resumoCarrinhoProduto", JSON.stringify(this.compras));
  }

  //On init
  ngOnInit(): void {

    this.compras = JSON.parse(localStorage.getItem("resumoCarrinhoProduto") + "");
    this.calcularSubtotal();
    localStorage.setItem("cep", "");
    this.erroPedido = false;
    this.pedidoRealizado = false;

  }

  //Verifica CEP na API especificada no desafio.
  verificaCEP() {

    
    this.carrinhoService.verificaCEP(this.cep).subscribe({
      next: (data) => {
        console.log("olha o data: ", data)
        this.objetoCEP = data;
        this.erroCEP = false;
        this.usuario = localStorage.getItem("usuario")
        console.log("usuario ", this.usuario)
      },
      error: (err) => {
        console.log("Olha o erro: ", err)
        this.erroCEP = true;
      }
    })

    this.objetoCEP = this.carrinhoService.objetoCEPConstruido;
    console.log(this.carrinhoService.objetoCEPConstruido)
  }

  falaCEP() {
    var objetoEndereco = JSON.stringify(localStorage.getItem("cep"));
    console.log("Esse é o objeto: ", objetoEndereco)
  }

  aumentarQuantidadeProduto(compra: Compra) {

    compra.produto.qtdPretentida += 1;
    compra.quantidade+=1;
    if (compra.produto.qtdPretentida > compra.produto.qtdEstoque) compra.produto.qtdPretentida = compra.produto.qtdEstoque;
    compra.valorTotal = compra.produto.qtdPretentida * parseFloat(compra.produto.precoUnitario);
    compra.quantidade = compra.produto.qtdPretentida;
    this.calcularSubtotal();
  }

  diminuirQuantidadeProduto(compra: Compra) {
    compra.produto.qtdPretentida -= 1;
    compra.quantidade -=1;
    if (compra.produto.qtdPretentida == 0) compra.produto.qtdPretentida = 1;
    compra.valorTotal = compra.produto.qtdPretentida * parseFloat(compra.produto.precoUnitario);
    compra.quantidade = compra.produto.qtdPretentida;
    this.calcularSubtotal();
  }

  calcularSubtotal() {
    this.subTotal = 0;
    this.compras.forEach(element => {
     
      this.subTotal = this.subTotal +  (parseFloat(element.quantidade) * parseFloat(element.produto.precoUnitario));
      console.log("Valor do subtotal" + this.subTotal)
    })
  }

  excluirDoCarrinho(produtoId: number) {

    var result = window.confirm("Tem certeza que deseja excluir?");

    if (result) {
      var listaDeCompraSemProdutoEspecificado = this.compras.filter((element: { produto: { id: number; }; }) => element.produto.id != produtoId);

      this.compras = listaDeCompraSemProdutoEspecificado;

      localStorage.setItem("resumoCarrinhoProduto", JSON.stringify(listaDeCompraSemProdutoEspecificado))

      console.log(listaDeCompraSemProdutoEspecificado)
    }
    this.calcularSubtotal()
  }

  //Quantidade de itens no Carrinho
  get quantidadeItens() {

    var quantidadeItens = 0;

    this.compras.forEach(e => {
      quantidadeItens += e.quantidade;
    })

    return quantidadeItens;
  }

  limparCarrinho() {
    var result = window.confirm("Tem certeza que deseja excluir? IRÁ EXCLUIR TODOS OS ITENS DO CARRINHO");

    if (result) {
      this.compras = new Array();
      localStorage.setItem("resumoCarrinhoProduto", JSON.stringify(this.compras));
      this.subTotal = 0;
    }
  }

  enviarListaTest() {
    this.carrinhoService.enviarTest(this.compras);
  }

  //Finaliza compra
  checkout() {
    if (!this.objetoCEP.cep) {
      this.erroCEP = true;
      return
    }
    this.loadingPedido = true;
    this.carrinhoService.realizarCheckout(this.compras, this.subTotal, this.objetoCEP.cep).subscribe({
      next: (data) => {
        if (data) {
          this.pedidoRealizado = true;
          this.loadingPedido = false;
          console.log("O que retornou do checkout: " + JSON.stringify(data))
          this.finalizarVenda(data);

        }
      },
      error: (err) => {
        if (err) {
          this.pedidoRealizado = false;
          this.erroPedido = true;
          this.loadingPedido = false;
        }
      }
    });
    this.compras = new Array();
    localStorage.setItem("resumoCarrinhoProduto", JSON.stringify(this.compras))
  }

  finalizarVenda(compra: any){
    this.vendaService.salvarVenda(compra).subscribe({
      next: (data) => {
        console.log("Venda finalizada: ",data)
      },
      error: (err) => {
        console.log("Deu erro ao finalizar venda: ", err)
      }
    })
  }

  paginaDeProdutos() {
    this.router.navigate(["/produtos"]);
  }
}
