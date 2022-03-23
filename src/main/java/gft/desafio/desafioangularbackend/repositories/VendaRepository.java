package gft.desafio.desafioangularbackend.repositories;

import gft.desafio.desafioangularbackend.entities.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaRepository extends JpaRepository<Venda, String> {
}
