package gft.desafio.desafioangularbackend.services;

import gft.desafio.desafioangularbackend.entities.Compra;

import gft.desafio.desafioangularbackend.repositories.CompraRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompraService {

    private CompraRepository compraRepository;

    public CompraService(CompraRepository compraRepository) {
        this.compraRepository = compraRepository;
    }

    public Compra salvarCompra(Compra compra){
        return compraRepository.save(compra);
    }

    public Compra buscarCompra(Long id){
        Optional<Compra> byId = compraRepository.findById(id);
        return byId.orElseThrow(() -> new RuntimeException("Compra não encontrada"));
    }

    public Compra atualizarCompra(Compra compra, Long id){
        Compra original = buscarCompra(id);
        compra.setId(original.getId());
        return salvarCompra(compra);
    }

    public void excluirCompra(Long id){
        Compra compra = buscarCompra(id);
        compraRepository.delete(compra);
    }
}
