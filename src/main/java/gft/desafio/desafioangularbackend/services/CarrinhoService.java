package gft.desafio.desafioangularbackend.services;

import gft.desafio.desafioangularbackend.entities.Carrinho;
import gft.desafio.desafioangularbackend.entities.Compra;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.repositories.CarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarrinhoService {

    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private CompraService compraService;

    @Autowired
    private ProdutoService produtoService;

    private Double valorTotal;

    public CarrinhoService(CarrinhoRepository carrinhoRepository, CompraService compraService) {
        this.carrinhoRepository = carrinhoRepository;
        this.compraService = compraService;
    }

    public List<Carrinho> listarTodosCarrinhos(){
        return carrinhoRepository.findAll();
    }

    public Carrinho salvarCarrinho(Carrinho carrinho){

        valorTotal = 0d;

        List<Compra> listaDeComprasSalvas = new ArrayList<>();

//        carrinho.setUsuario((Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        /*carrinho.getProdutos().forEach(compra -> {
            //Retirar o set produto apos validação via ts.
            compra.setProduto(produtoService.buscarProduto(compra.getProduto().getId()));
            compra.setValorTotal(compra.getProduto().getPrecoUnitario()*compra.getQuantidade());
            compra.getProduto().setQtdEstoque(compra.getProduto().getQtdEstoque() - compra.getQuantidade());
            Compra c = compraService.salvarCompra(compra);
            listaDeComprasSalvas.add(c);
            valorTotal += c.getValorTotal();
        });

        carrinho.setCompras(listaDeComprasSalvas);*/
        carrinho.setValorTotal(valorTotal);

        return carrinhoRepository.save(carrinho);
    }

    public Carrinho buscarCarrinho(Long id){
        Optional<Carrinho> byId = carrinhoRepository.findById(id);
        return byId.orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
    }

  /*  public List<Carrinho> buscarCarrinhoPorUsuario(Long id){
        List<Carrinho> all = carrinhoRepository.findAll();

        List<Carrinho> toReturn = all.stream().filter(o -> o.getUsuario().getId() == id).collect(Collectors.toList());

        toReturn.stream().forEach( e -> System.out.println(e));
        return toReturn;
    }*/

    public Carrinho atualizarCarrinho(Carrinho carrinho, Long id){
        Carrinho original = buscarCarrinho(id);
        carrinho.setId(original.getId());
        return salvarCarrinho(carrinho);
    }

    public void excluirCarrinho(Long id){
        Carrinho carrinho = buscarCarrinho(id);
        carrinhoRepository.delete(carrinho);
    }

}
