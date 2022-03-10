package gft.desafio.desafioangularbackend.repositories;

import gft.desafio.desafioangularbackend.entities.Carrinho;
import gft.desafio.desafioangularbackend.entities.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
}
