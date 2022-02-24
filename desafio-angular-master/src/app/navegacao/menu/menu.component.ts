import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/services/compra.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { LoginServiceService } from '../../autenticacao/login/service/login-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //Declaração de variaveis
  public isLogged: any;

  public logged: any;

  public role: any;

  constructor(private loginService: LoginServiceService, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem("isLogged");
    this.logged = localStorage.getItem("usuario")?.split("\"", 3)[1];

    if (localStorage.getItem('role') != null) {
      this.role = JSON.parse(JSON.stringify(localStorage.getItem("role")));

      var roles = this.role.split("\"")
      this.role = roles[5];
    }

  }

  logout() {
    this.loginService.logout();
    this.produtoService.setRequestRealizada(false);
    this.ngOnInit();
  }

}
