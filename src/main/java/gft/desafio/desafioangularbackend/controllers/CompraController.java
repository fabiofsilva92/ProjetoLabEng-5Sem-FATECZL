package gft.desafio.desafioangularbackend.controllers;


import gft.desafio.desafioangularbackend.entities.Compra;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/compra")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CompraController {


    @PostMapping
    public ResponseEntity<Compra> saveCompra(@RequestBody Compra compra){
        System.out.println("OLHA A COMPRA QUE CHEGOU : " +compra);
        return ResponseEntity.ok(compra);
    }

    @PostMapping("/test")
    public ResponseEntity<List<Compra>> saveCompras(@RequestBody List<Compra> compras){
        compras.forEach(e -> System.out.println(e));
        return ResponseEntity.ok(compras);
    }

}
