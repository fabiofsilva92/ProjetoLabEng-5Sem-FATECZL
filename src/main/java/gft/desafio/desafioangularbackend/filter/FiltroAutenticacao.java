package gft.desafio.desafioangularbackend.filter;

import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;
import gft.desafio.desafioangularbackend.entities.autenticacao.UsuarioCustomUserDetails;
import gft.desafio.desafioangularbackend.services.AutenticacaoService;
import gft.desafio.desafioangularbackend.services.UsuarioService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class FiltroAutenticacao extends OncePerRequestFilter {


    private AutenticacaoService autenticacaoService;

    private UsuarioService usuarioService;

    public FiltroAutenticacao(AutenticacaoService autenticacaoService, UsuarioService usuarioService) {
        this.autenticacaoService = autenticacaoService;
        this.usuarioService = usuarioService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String token = null;
        if(header != null && header.startsWith("Bearer ")){
            token = header.substring(7, header.length());
        }

        if(autenticacaoService.verificaToken(token)){
            String idUsuario = autenticacaoService.retornarIdUsuario(token);
            Usuario usuario = usuarioService.buscarUsuarioPorID(idUsuario);
            SecurityContextHolder
                    .getContext()
                    .setAuthentication(new UsernamePasswordAuthenticationToken(usuario, null, new UsuarioCustomUserDetails(usuario).getAuthorities()));
        }

        filterChain.doFilter(request, response);
    }
}
