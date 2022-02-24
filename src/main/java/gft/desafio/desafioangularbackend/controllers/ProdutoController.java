package gft.desafio.desafioangularbackend.controllers;

import gft.desafio.desafioangularbackend.entities.Produto;
import gft.desafio.desafioangularbackend.services.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/produtos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProdutoController {

    private ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public ResponseEntity<List<Produto>> getProdutos(){
        return ResponseEntity.ok(produtoService.listarTodosProdutos());
    }

    @GetMapping("{id}")
    public ResponseEntity<Produto> getProdutoByID(@PathVariable Long id){
        return ResponseEntity.ok(produtoService.buscarProduto(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Produto> saveProduto(@RequestBody Produto produto){
        return ResponseEntity.ok(produtoService.salvarProduto(produto));
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Produto> alterarProduto(@RequestBody Produto produto, @PathVariable Long id){
        Produto prod = produtoService.atualizarProduto(produto, id);
        return ResponseEntity.ok(prod);
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Produto> deletarProduto(@PathVariable Long id){
        try{
            produtoService.excluirProduto(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException ex){
            return ResponseEntity.notFound().build();
        }
    }
}
