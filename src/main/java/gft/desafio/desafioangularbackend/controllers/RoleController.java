package gft.desafio.desafioangularbackend.controllers;

import gft.desafio.desafioangularbackend.entities.autenticacao.Role;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/role")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RoleController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Role> getRole(@RequestBody String email){

        Usuario usuario = usuarioService.buscarPorEmail(email);
        System.out.println(usuario);
        System.out.println(usuario.getRole().getNome());

        return ResponseEntity.ok(usuario.getRole());
    }
}
