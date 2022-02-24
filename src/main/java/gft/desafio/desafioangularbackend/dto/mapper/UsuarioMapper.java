package gft.desafio.desafioangularbackend.dto.mapper;

import gft.desafio.desafioangularbackend.dto.UsuarioDTO;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;

public class UsuarioMapper {

    public static UsuarioDTO fromEntity(Usuario usuario){
        return new UsuarioDTO(usuario.getNome(), usuario.getEmail());
    }

}
