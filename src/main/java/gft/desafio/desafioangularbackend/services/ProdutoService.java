package gft.desafio.desafioangularbackend.services;

import gft.desafio.desafioangularbackend.entities.Produto;
import gft.desafio.desafioangularbackend.repositories.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    private ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }


    public Produto salvarProduto(Produto produto){
        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodosProdutos(){
        return produtoRepository.findAll();
    }

    public Produto buscarProduto(Long id){
        Optional<Produto> byId = produtoRepository.findById(id);
        return byId.orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public Produto atualizarProduto(Produto produto, Long id){
        Produto original = buscarProduto(id);
        produto.setId(original.getId());
        return salvarProduto(produto);
    }

    public void excluirProduto(Long id){
        Produto produto = buscarProduto(id);
        produtoRepository.delete(produto);
    }
}
