package gft.desafio.desafioangularbackend.repositories;

import gft.desafio.desafioangularbackend.entities.Cartao;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartaoRepository extends JpaRepository<Cartao, Long> {

    Cartao findByUsuario(Usuario usuario);

}
