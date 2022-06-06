import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compra } from 'src/app/model/compra';
import { Produto } from 'src/app/model/produto';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CompraService } from 'src/app/services/compra.service';
import { VendasService } from 'src/app/services/vendas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit, OnDestroy {

  //Declaração de variáveis
  public compras = new Array();
  public produtos = new Array();
  public valorTotal: number = 0;
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
  public pedidoRealizadoBoleto: boolean = false;
  public pedidoRealizadoCartao: boolean = false;
  public erroPedido: boolean = false;
  public loadingPedido: boolean = false;

  public boleto: boolean = false;
  public cartao: boolean = false;
  public escolherMetodo: boolean = false;

  public cartaoCompleto: any;

  public cartaozinho = { id: "", nome: "", cpf: "", numCartao: "", validade: "", codSeguranca: "" };

  cartaoUsuario !: FormGroup;

  //Construtor
  constructor(private formBuilder: FormBuilder, private compraService: CompraService, private carrinhoService: CarrinhoService,
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

    this.cartaoUsuario = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      numCartao: ['', Validators.required],
      validade: ['', Validators.required],
      codSeguranca: ['', Validators.required]
    })

    this.carrinhoService.verificaCartaoUsuario().subscribe({
      next: (data) => {
        console.log("Cartão : ", data);
        this.cartaoCompleto = data;
        this.f['id'].setValue(this.cartaoCompleto.id)
        this.f['nome'].setValue(this.cartaoCompleto.usuario.nome)
        this.f['cpf'].setValue(this.cartaoCompleto.usuario.cpf)
        this.f['numCartao'].setValue(this.cartaoCompleto.numCartao)
        this.f['validade'].setValue(this.cartaoCompleto.validade)
        this.f['codSeguranca'].setValue(this.cartaoCompleto.codSeguranca)
        console.log("Esse é o cartao do usuario logado: ", this.cartaoCompleto)
      }, error: (err) => {
        console.log("Erro: ", err)
      }
    })

  }

  //Finaliza compra
  checkout() {
    /*     if (!this.objetoCEP.cep) {
          this.erroCEP = true;
          return
        }
        /* this.loadingPedido = true; */
    /* this.loadingPedido = false; */

    this.carrinhoService.realizarCheckout(this.compras, this.subTotal, this.objetoCEP.cep).subscribe({
      next: (data) => {
        if (data) {
          if (this.boleto) {
            this.pedidoRealizadoBoleto = true;
          } else {
            this.pedidoRealizadoCartao = true;
            this.updateCartao();
          }
          //this.pedidoRealizado = true;
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

  updateCartao() {
    
    this.cartaozinho.id = this.f['id'].value;
    this.cartaozinho.nome = this.f['nome'].value
    this.cartaozinho.cpf = this.f['cpf'].value;
    this.cartaozinho.numCartao = this.f['numCartao'].value;
    this.cartaozinho.validade = this.f['validade'].value;
    this.cartaozinho.codSeguranca = this.f['codSeguranca'].value;
    this.carrinhoService.updateCartao(this.cartaozinho).subscribe({
      next: (data:any) => {
        console.log("OLHA O QUE VOLTOU : ", data)
      },
      error: (err:any) => {
        console.log("Deu erro: ", err)
      }
    })
  }

  get f() {
    return this.cartaoUsuario.controls;
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
    compra.quantidade += 1;
    if (compra.produto.qtdPretentida > compra.produto.qtdEstoque) compra.produto.qtdPretentida = compra.produto.qtdEstoque;
    compra.valorTotal = compra.produto.qtdPretentida * parseFloat(compra.produto.precoUnitario);
    compra.quantidade = compra.produto.qtdPretentida;
    this.calcularSubtotal();
  }

  diminuirQuantidadeProduto(compra: Compra) {
    compra.produto.qtdPretentida -= 1;
    compra.quantidade -= 1;
    if (compra.produto.qtdPretentida == 0) compra.produto.qtdPretentida = 1;
    compra.valorTotal = compra.produto.qtdPretentida * parseFloat(compra.produto.precoUnitario);
    compra.quantidade = compra.produto.qtdPretentida;
    this.calcularSubtotal();
  }

  calcularSubtotal() {
    this.subTotal = 0;
    this.compras.forEach(element => {

      this.subTotal = this.subTotal + (parseFloat(element.quantidade) * parseFloat(element.produto.precoUnitario));
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

  escolherMetodoPagamento() {
    if (!this.objetoCEP.cep) {
      this.erroCEP = true;
      return
    }
    this.escolherMetodo = true;
    this.pedidoRealizado = true;
  }



  selecionaBoleto() {
    this.boleto = true;
    this.escolherMetodo = false;
  }

  voltarBoleto() {
    this.boleto = false;
    this.escolherMetodo = true;
  }

  selecionaCartao() {
    this.cartao = true;
    this.escolherMetodo = false;
    //TODO fazer chamada e verificar se tem cartão, se tiver preencher automatico senão pedir pra cadastrar
  }

  voltarCartao() {
    this.cartao = false;
    this.escolherMetodo = true;
  }

  finalizarVenda(compra: any) {
    this.vendaService.salvarVenda(compra).subscribe({
      next: (data) => {
        console.log("Venda finalizada: ", data)
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
