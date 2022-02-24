package gft.desafio.desafioangularbackend.controllers;

import gft.desafio.desafioangularbackend.entities.Venda;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.services.CarrinhoService;
import gft.desafio.desafioangularbackend.services.UsuarioService;
import gft.desafio.desafioangularbackend.services.VendaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("v1/venda")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class VendaController {

    private VendaService vendaService;
    private UsuarioService usuarioService;
    private CarrinhoService carrinhoService;

    public VendaController(VendaService vendaService, UsuarioService usuarioService, CarrinhoService carrinhoService) {
        this.vendaService = vendaService;
        this.usuarioService = usuarioService;
        this.carrinhoService = carrinhoService;
    }

    @GetMapping("{email}")
    public ResponseEntity<List<Venda>> getVendas(@PathVariable String email){

        Usuario usuario = usuarioService.buscarPorEmail(email);

        List<Venda> vendas = vendaService.buscarVendasPorUsuario(usuario.getId());


        return ResponseEntity.ok(vendas);
    }
}
