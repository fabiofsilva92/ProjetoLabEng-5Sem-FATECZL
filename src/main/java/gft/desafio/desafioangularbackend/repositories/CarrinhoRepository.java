package gft.desafio.desafioangularbackend.repositories;

import gft.desafio.desafioangularbackend.entities.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
}
