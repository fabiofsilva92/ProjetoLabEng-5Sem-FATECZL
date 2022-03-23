package gft.desafio.desafioangularbackend.controllers;

import gft.desafio.desafioangularbackend.dto.RegistroUsuarioDTO;
import gft.desafio.desafioangularbackend.entities.Endereco;
import gft.desafio.desafioangularbackend.entities.autenticacao.Role;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.services.RoleService;
import gft.desafio.desafioangularbackend.services.UsuarioService;
import org.flywaydb.core.api.android.ContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    /*@GetMapping
    public ResponseEntity<Usuario> buscarUsuario(
            @RequestParam String email){

        Usuario usuario = (Usuario) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        if(new BCryptPasswordEncoder().matches(usuario.getEmail(), email)){
            System.out.println("DEU CERTO");
            return ResponseEntity.ok(new Usuario(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getCpf(), "", usuario.getRole()));
        }
         return ResponseEntity.badRequest().build();
    }*/

    @GetMapping
    public ResponseEntity<Usuario> retornarUsuario(){
        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(usuario);
    }

    @PostMapping
    public ResponseEntity<Usuario> saveUsuario(@RequestBody Usuario usuario){
        usuario.setRole(roleService.buscarRolePorId(2l));

        usuarioService.buscarPorEmailInvertido(usuario.getEmail());
        usuarioService.buscarPorCPFInv(usuario.getCpf());

        return ResponseEntity.ok(usuarioService.salvarUsuario(usuario));
    }

    @PutMapping("{id}") //TODO arrumar update de usuario, esta recebendo endereço nulo e role nula
    public ResponseEntity<Usuario> updateUsuario(@RequestBody RegistroUsuarioDTO usuario, @PathVariable Long id){

        System.out.println("Usuario que chegou: "+usuario);

        Role role = roleService.buscarRolePorId(usuario.getRoleID());

        Usuario usuarioUpdate = new Usuario(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                usuario.getCpf(), usuario.getSenha(),
                new Endereco(usuario.getCep(), usuario.getRua(), usuario.getNumero(), usuario.getBairro(), usuario.getCidade()),
                role, usuario.getIs_Active());

//        return ResponseEntity.ok(usuarioUpdate);
        return ResponseEntity.ok(usuarioService.atualizarUsuario(usuarioUpdate, usuario.getId()));
    }
}
