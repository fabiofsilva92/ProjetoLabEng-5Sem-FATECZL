package gft.desafio.desafioangularbackend.services;

import gft.desafio.desafioangularbackend.entities.autenticacao.Role;
import gft.desafio.desafioangularbackend.repositories.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    private RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role buscarRolePorId(Long id){
        Optional<Role> byId = roleRepository.findById(id);
        return byId.orElseThrow(() -> new RuntimeException("Role não encontrada"));
    };
}
