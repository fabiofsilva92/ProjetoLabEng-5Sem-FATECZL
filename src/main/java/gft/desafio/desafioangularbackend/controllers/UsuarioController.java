package gft.desafio.desafioangularbackend.controllers;

import gft.desafio.desafioangularbackend.entities.autenticacao.Role;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.services.RoleService;
import gft.desafio.desafioangularbackend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/cadastro-usuario")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UsuarioController {

    UsuarioService usuarioService;

    @Autowired
    RoleService roleService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<Usuario> saveUsuario(@RequestBody Usuario usuario){
        usuario.setRole(roleService.buscarRolePorId(2l));

        usuarioService.buscarPorEmailInvertido(usuario.getEmail());
        usuarioService.buscarPorCPFInv(usuario.getCpf());

        return ResponseEntity.ok(usuarioService.salvarUsuario(usuario));
    }
}
