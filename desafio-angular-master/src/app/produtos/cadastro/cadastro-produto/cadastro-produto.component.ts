import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/produto';
import { CadastroProdutoService } from 'src/app/services/cadastro-produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  //Declaração de variaveis
  cadastroForm !: FormGroup;
  cadastrado: any;

  //Construtor
  constructor(private cadastroProdutoService: CadastroProdutoService, private formBuilder: FormBuilder, private router: Router) { }

  //OnInit
  ngOnInit(): void {

    this.cadastroForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      unidade: ['', Validators.required],
      foto: ['', Validators.required],
      precoUnitario: ['', Validators.required],
      qtdEstoque: ['', Validators.required],
    });

  }

  get f() {
    return this.cadastroForm.controls;
  }

  //Cadastro de produto
  cadastrarProduto() {
    var produto = {
      "descricao": this.f['descricao'].value,
      "unidade": this.f['unidade'].value,
      "foto": this.f['foto'].value,
      "precoUnitario": this.f['precoUnitario'].value,
      "qtdEstoque": this.f['qtdEstoque'].value
    }

    this.cadastroProdutoService.cadastrarProduto(produto).subscribe({
      next: (data) => {
        this.cadastrado = data;
      },
      error: (err) => {
        console.log("Erro no cadastrarProduto: ", err)
      }
    });
  }

  novoCadastro() {
    console.log("Reload")
    window.location.reload();
  }

  paginaDeProdutos() {
    this.router.navigate(["/produtos"]);
  }
}
