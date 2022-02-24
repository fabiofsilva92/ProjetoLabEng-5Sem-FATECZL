package gft.desafio.desafioangularbackend.repositories;

import gft.desafio.desafioangularbackend.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
