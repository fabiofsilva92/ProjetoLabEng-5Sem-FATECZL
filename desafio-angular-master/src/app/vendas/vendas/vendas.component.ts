import { Component, OnInit } from '@angular/core';
import { VendasService } from 'src/app/services/vendas.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  vendas : any;

  constructor(private vendaService: VendasService) { }

  ngOnInit(): void {

    this.vendaService.buscarVendasUsuario().subscribe({
      next: (data) => {
        if(data){
          this.vendas = data
          console.log(data);
        }
      },
      error: (err) => {
        if(err){
            console.log("Erro buscando vendas do usuario")
        }
      }
    });

  }

}
