package gft.desafio.desafioangularbackend.controllers;


import gft.desafio.desafioangularbackend.entities.*;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.services.CarrinhoService;
import gft.desafio.desafioangularbackend.services.CompraService;
import gft.desafio.desafioangularbackend.services.ResumoProdutoCarrinhoService;
import gft.desafio.desafioangularbackend.services.VendaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("v1/compra")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CompraController {

    private final CarrinhoService carrinhoService;

    private final VendaService vendaService;

    private final CompraService compraService;

    private final ResumoProdutoCarrinhoService resumoProdutoCarrinhoService;

    public CompraController(CarrinhoService carrinhoService, VendaService vendaService, CompraService compraService, ResumoProdutoCarrinhoService resumoProdutoCarrinhoService) {
        this.carrinhoService = carrinhoService;
        this.vendaService = vendaService;
        this.compraService = compraService;
        this.resumoProdutoCarrinhoService = resumoProdutoCarrinhoService;
    }

    //    @PostMapping
//    public ResponseEntity<Carrinho> saveCompra(@RequestBody Carrinho compra){
//        System.out.println("OLHA A COMPRA QUE CHEGOU : " +compra);
//        return ResponseEntity.ok(compra);
//    }

    @PostMapping
    public ResponseEntity<Compra> saveCompras(@RequestBody Carrinho carrinho){

        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Date data = new Date();

        System.out.println("RESUMAO : " + carrinho.getResumoProdutos());
        System.out.println("Carrinho que chegou: " +carrinho);

        carrinho.setData(data);

        Double valorTotal = 0d;

        List<Produto> produtos = new ArrayList<>();


        for (ResumoProdutoCarrinho r : carrinho.getResumoProdutos()){
            r.getProduto().setQtdEstoque(r.getProduto().getQtdEstoque() - r.getQuantidade());
//            valorTotal = valorTotal + (r.getQuantidade() * r.getProduto().getPrecoUnitario());
            System.out.println("Produto estoque atualizado: " + r.getProduto());
            //TODO Atualizar produto
            produtos.add(r.getProduto());
            resumoProdutoCarrinhoService.saveResumo(r);
        }



        System.out.println("Valor total do carrinho: " + carrinho.getValorTotal());

        carrinho.setProdutos(produtos);


        Carrinho car = carrinhoService.salvarCarrinho(carrinho);

        Compra compra = compraService.salvarCompra(new Compra(null, car, car.getValorTotal()));


        Venda venda = new Venda(null, compra, usuario);
//
        vendaService.salvarVenda(venda);

        return ResponseEntity.ok(compra);
    }

}
