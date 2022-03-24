package gft.desafio.desafioangularbackend.controllers;

import gft.desafio.desafioangularbackend.entities.Venda;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.services.CarrinhoService;
import gft.desafio.desafioangularbackend.services.UsuarioService;
import gft.desafio.desafioangularbackend.services.VendaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @GetMapping()
    public ResponseEntity<List<Venda>> getVendasDoUsuarioLogado(){

        Usuario usuario = usuarioService.retornaUsuarioRequisitante();

        List<Venda> vendas = vendaService.buscarVendasPorUsuario(usuario.getId());


        return ResponseEntity.ok(vendas);
    }

    @PostMapping()
    public ResponseEntity<Venda> saveVenda(@RequestBody Venda venda){

        System.out.println("Venda que chegou: "+venda);

        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        venda.setUsuario(usuario);


        vendaService.salvarVenda(venda);
        return ResponseEntity.ok(venda);
    }
}
