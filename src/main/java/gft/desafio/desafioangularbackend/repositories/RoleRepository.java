package gft.desafio.desafioangularbackend.repositories;

import gft.desafio.desafioangularbackend.entities.autenticacao.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
