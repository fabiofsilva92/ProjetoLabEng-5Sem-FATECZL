package gft.desafio.desafioangularbackend.services;

import gft.desafio.desafioangularbackend.entities.ResumoProdutoCarrinho;
import gft.desafio.desafioangularbackend.repositories.ResumoProdutoCarrinhoRepository;
import org.springframework.stereotype.Service;

@Service
public class ResumoProdutoCarrinhoService {

    private final ResumoProdutoCarrinhoRepository resumoProdutoCarrinhoRepository;

    public ResumoProdutoCarrinhoService(ResumoProdutoCarrinhoRepository resumoProdutoCarrinhoRepository) {
        this.resumoProdutoCarrinhoRepository = resumoProdutoCarrinhoRepository;
    }

    public ResumoProdutoCarrinho saveResumo(ResumoProdutoCarrinho resumo){
        return resumoProdutoCarrinhoRepository.save(resumo);
    }
}
