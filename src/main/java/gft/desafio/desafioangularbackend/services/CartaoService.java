package gft.desafio.desafioangularbackend.services;

import gft.desafio.desafioangularbackend.entities.Cartao;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.repositories.CartaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartaoService {

    @Autowired
    private CartaoRepository cartaoRepository;

    public Cartao salvarCartao(Cartao cartao){
        return cartaoRepository.save(cartao);
    }

    public Cartao buscarCartao(Long id){
        Optional<Cartao> byId = cartaoRepository.findById(id);

        return byId.orElseThrow(() -> new RuntimeException("Cartão não localizado"));
    }

    public void excluirCartao(Long id){
        Cartao cartao = buscarCartao(id);
        cartaoRepository.delete(cartao);
    }

    public Cartao buscarCartaoPorUsuario(Usuario usuario){
        return cartaoRepository.findByUsuario(usuario);
    }

}
