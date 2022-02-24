package gft.desafio.desafioangularbackend.services;

import gft.desafio.desafioangularbackend.entities.Venda;
import gft.desafio.desafioangularbackend.repositories.VendaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VendaService {

    private VendaRepository vendaRepository;

    public VendaService(VendaRepository vendaRepository) {
        this.vendaRepository = vendaRepository;
    }

    public Venda salvarVenda(Venda venda){
        return vendaRepository.save(venda);
    }

    public List<Venda> listarTodasVendas(){
        return vendaRepository.findAll();
    }

    public Venda buscarVenda(Long id){
        Optional<Venda> byId = vendaRepository.findById(id);
        return byId.orElseThrow(() -> new RuntimeException("Venda não encontrada"));
    }

    public Venda atualizarVenda(Venda venda, Long id){
        Venda original = buscarVenda(id);
        venda.setId(original.getId());
        return salvarVenda(venda);
    }

    public void excluirVenda(Long id){
        Venda venda = buscarVenda(id);
        vendaRepository.delete(venda);
    }

    public List<Venda> buscarVendasPorUsuario(Long id) {
        List<Venda> all = vendaRepository.findAll();

        List<Venda> toReturn = all.stream().filter(v -> v.getUsuario().getId() == id).collect(Collectors.toList());

        toReturn.forEach(v -> System.out.println(v));
        return toReturn;
    }
}
