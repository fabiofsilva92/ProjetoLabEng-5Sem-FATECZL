package gft.desafio.desafioangularbackend.controllers;

import gft.desafio.desafioangularbackend.dto.CarrinhoDTO;
import gft.desafio.desafioangularbackend.dto.mapper.CarrinhoMapper;
import gft.desafio.desafioangularbackend.entities.Carrinho;
import gft.desafio.desafioangularbackend.entities.Venda;
import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.services.CarrinhoService;
import gft.desafio.desafioangularbackend.services.UsuarioService;
import gft.desafio.desafioangularbackend.services.VendaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/carrinho")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CarrinhoController {

    private CarrinhoService carrinhoService;
    private VendaService vendaService;
    private UsuarioService usuarioService;

    public CarrinhoController(CarrinhoService carrinhoService, VendaService vendaService,UsuarioService usuarioService) {
        this.carrinhoService = carrinhoService;
        this.vendaService = vendaService;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<CarrinhoDTO>> getCarrinhos(){
        return ResponseEntity.ok(carrinhoService.listarTodosCarrinhos().stream().map(CarrinhoMapper::fromEntity).collect(Collectors.toList()));
    }

  /*  @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Carrinho>> getCarrinhosPorUsuario(@PathVariable Long idUsuario){
        Usuario usuario = new UsuarioService().buscarUsuarioPorID(idUsuario);
        return ResponseEntity.ok(carrinhoService.listarCarrinhosPorUsuario(usuario));
    }*/

    @PostMapping
    public ResponseEntity<CarrinhoDTO> saveCarrinho(@RequestBody Carrinho carrinho){


//        String email = carrinho.getUsuario().getEmail().split("\"")[1];

        Usuario usuario = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Date data = new Date();

//        carrinho.setUsuario(usuario);
        carrinho.setData(data);

/*        carrinho.getCompras().forEach(c -> {
            System.out.println("Quantidade antes: "+c.getProduto().getQtdEstoque());
            c.getProduto().setQtdEstoque(c.getProduto().getQtdEstoque()-c.getQuantidade());
        });*/

        System.out.println("Carrinho: "+ carrinho);

//        System.out.println("Email: " +email);

        Carrinho car = carrinhoService.salvarCarrinho(carrinho);
        Venda venda = new Venda(null, car, usuario);
        vendaService.salvarVenda(venda);

        return ResponseEntity.ok(CarrinhoMapper.fromEntity(car));
    }

    @PutMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Carrinho> alterarCarrinho(@RequestBody Carrinho carrinho, @PathVariable Long id){
        return ResponseEntity.ok(carrinhoService.atualizarCarrinho(carrinho, id));
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Carrinho> deletarCarrinho(@PathVariable Long id){
        try{
            carrinhoService.excluirCarrinho(id);
            return ResponseEntity.ok().build();
        }catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
