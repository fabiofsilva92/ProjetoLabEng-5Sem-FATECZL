package gft.desafio.desafioangularbackend.dto.mapper;

import gft.desafio.desafioangularbackend.dto.CarrinhoDTO;
import gft.desafio.desafioangularbackend.entities.Carrinho;

public class CarrinhoMapper {

    public static CarrinhoDTO fromEntity(Carrinho carrinho){
        return new CarrinhoDTO(carrinho.getId(), carrinho.getData(), carrinho.getCompras(), carrinho.getValorTotal());
    }

}
