package gft.desafio.desafioangularbackend.repositories;

import gft.desafio.desafioangularbackend.entities.ResumoProdutoCarrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumoProdutoCarrinhoRepository extends JpaRepository<ResumoProdutoCarrinho, Long> {
}
