import { Component, OnInit } from '@angular/core';
import { GerenciamentoUsuarioService } from 'src/app/services/gerenciamento-usuario.service';

@Component({
  selector: 'app-gerenciamento-usuario',
  templateUrl: './gerenciamento-usuario.component.html',
  styleUrls: ['./gerenciamento-usuario.component.css']
})
export class GerenciamentoUsuarioComponent implements OnInit {

  public role: any;
  
  public usuario : any;

  constructor( private gerenciamentoUserService: GerenciamentoUsuarioService) { }

  ngOnInit(): void {

    this.gerenciamentoUserService.retornarUsuario().subscribe({
      next: (data) =>  {
        if(data){
          this.usuario = data;
          console.log("OLHA O USUARIO DA CHAMADA " +JSON.stringify(this.usuario));
        }
      },
      error: (err) => {
        console.log("Erro na busca do usuario");
      }
    })

  }

}
