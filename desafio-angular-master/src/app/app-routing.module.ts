import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuardGuard } from './login-guard.guard';
import { LoginComponent } from './autenticacao/login/login.component';
import { LogoutComponent } from './autenticacao/logout/logout.component';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { CarrinhoComponent } from './carrinho/carrinho/carrinho.component';
import { CadastroProdutoComponent } from './produtos/cadastro/cadastro-produto/cadastro-produto.component';
import { CadastroUsuarioComponent } from './autenticacao/cadastro/cadastro-usuario/cadastro-usuario.component';
import { VendasComponent } from './vendas/vendas/vendas.component';
import { GerenciamentoUsuarioComponent } from './autenticacao/cadastro/gerenciamento-usuario/gerenciamento-usuario.component';


const routes: Routes = [
  {path: '', redirectTo: "/produtos", pathMatch: "full" },
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'produtos', component: ListaProdutosComponent, canActivate: [LoginGuardGuard]},
  {path: 'carrinho', component: CarrinhoComponent, canActivate: [LoginGuardGuard]},
  {path: 'cadastro-produto', component: CadastroProdutoComponent, canActivate: [LoginGuardGuard]},
  {path: 'cadastro-cliente', component: CadastroUsuarioComponent},
  {path: 'pedidos', component: VendasComponent},
  {path: 'alterar-usuario', component: GerenciamentoUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
