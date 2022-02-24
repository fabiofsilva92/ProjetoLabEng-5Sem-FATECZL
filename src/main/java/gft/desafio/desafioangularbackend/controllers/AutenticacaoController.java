package gft.desafio.desafioangularbackend.controllers;

import gft.desafio.desafioangularbackend.dto.AutenticacaoDTO;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.services.AutenticacaoService;
import gft.desafio.desafioangularbackend.dto.TokenDTO;
import gft.desafio.desafioangularbackend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping("v1/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AutenticacaoController {

    private AutenticacaoService autenticacaoService;


    public AutenticacaoController(AutenticacaoService autenticacaoService) {
        this.autenticacaoService = autenticacaoService;
    }

    @PostMapping
    public ResponseEntity<TokenDTO> autenticar(@RequestBody AutenticacaoDTO autenticacaoDTO){

        try{
            return ResponseEntity.ok(autenticacaoService.autenticar(autenticacaoDTO));
        }catch (AuthenticationException ae){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


}
