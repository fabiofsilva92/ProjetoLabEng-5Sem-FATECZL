package gft.desafio.desafioangularbackend.controllers;

import gft.desafio.desafioangularbackend.entities.Cartao;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.services.CartaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/cartao")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartaoController {

    @Autowired
    private CartaoService cartaoService;

    @PostMapping
    public ResponseEntity<Cartao> saveCartao(@RequestBody Cartao cartao){
        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        cartao.setUsuario(usuario);
        cartao.setNomeTitular(usuario.getNome());
        cartao.setCpfTitular(usuario.getCpf());
        cartaoService.salvarCartao(cartao);
        return ResponseEntity.ok(cartao);
    }

    @GetMapping
    public ResponseEntity<Cartao> getCartaoDoUsuario(){
        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Cartao cartao = cartaoService.buscarCartaoPorUsuario(usuario);

        if (cartao == null){
            cartao.setUsuario(usuario);
        }

        return ResponseEntity.ok(cartao);

    }

}
