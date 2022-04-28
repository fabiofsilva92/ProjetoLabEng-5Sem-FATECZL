import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'; /** Realizar requisições Ajax */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './autenticacao/login/login.component';
import { LogoutComponent } from './autenticacao/logout/logout.component';
import { AuthInterceptorProvider } from './auth.interceptor';
import { MenuComponent } from './navegacao/menu/menu.component';
import { FooterComponent } from './navegacao/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { ErrorInterceptorProvider } from './error.interceptor';
import { CarrinhoComponent } from './carrinho/carrinho/carrinho.component';
import { CadastroProdutoComponent } from './produtos/cadastro/cadastro-produto/cadastro-produto.component';

import { NgxMaskModule } from 'ngx-mask';
import { CadastroUsuarioComponent } from './autenticacao/cadastro/cadastro-usuario/cadastro-usuario.component';
import { VendasComponent } from './vendas/vendas/vendas.component';
import { GerenciamentoUsuarioComponent } from './autenticacao/cadastro/gerenciamento-usuario/gerenciamento-usuario.component';
import { RecuperaSenhaComponent } from './autenticacao/cadastro/recupera-senha/recupera-senha.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    ListaProdutosComponent,
    CarrinhoComponent,
    CadastroProdutoComponent,
    CadastroUsuarioComponent,
    VendasComponent,
    GerenciamentoUsuarioComponent,
    RecuperaSenhaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [AuthInterceptorProvider, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
