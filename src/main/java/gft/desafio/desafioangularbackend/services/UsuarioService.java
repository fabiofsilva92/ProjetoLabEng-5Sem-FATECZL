package gft.desafio.desafioangularbackend.services;

import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.entities.autenticacao.UsuarioCustomUserDetails;
import gft.desafio.desafioangularbackend.exceptions.UsuarioNaoEncontradoException;
import gft.desafio.desafioangularbackend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario buscarPorEmail(String email){
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if(usuario.isEmpty()){
            throw new UsuarioNaoEncontradoException("Usuário não encontrado!!");
        }

        return usuario.get();
    }

    public Usuario buscarPorEmailInvertido(String email){
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if(usuario.isEmpty()){
            return null;
        }

        throw new UsuarioNaoEncontradoException("Usuário já existente com esse email!!");
    }

    public Usuario retornaUsuarioRequisitante(){
        Usuario usuario = (Usuario) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        return usuario;
    }

    public Usuario buscarPorCPFInv(String cpf){
        Optional<Usuario> byCpf = usuarioRepository.findByCpf(cpf);

        if(byCpf.isEmpty()){
            return null;
        }
        throw new UsuarioNaoEncontradoException("Usuário já existente com esse CPF!!");
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return new UsuarioCustomUserDetails(buscarPorEmail(login));
    }

    public Usuario buscarUsuarioPorID(String idUsuario) {
        Optional<Usuario> byId = usuarioRepository.findById(idUsuario);
        if(byId.isEmpty()) throw new RuntimeException("Usuário não encontrado no findbyid");

        return byId.get();
    }

/*CRUD*/

    public Usuario salvarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizarUsuario(Usuario usuario, String id){
        Usuario original = buscarUsuarioPorID(id);
        usuario.setId(original.getId());

        return salvarUsuario(usuario);
    }

    public void excluirUsuario(String id){
        Usuario usuario = buscarUsuarioPorID(id);
        usuarioRepository.delete(usuario);
    }
}
