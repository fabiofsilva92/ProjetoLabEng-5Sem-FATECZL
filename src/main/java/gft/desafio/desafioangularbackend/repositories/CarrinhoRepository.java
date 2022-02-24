package gft.desafio.desafioangularbackend.repositories;

import gft.desafio.desafioangularbackend.entities.Carrinho;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
}
