package gft.desafio.desafioangularbackend.config;

import gft.desafio.desafioangularbackend.entities.autenticacao.Usuario;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.text.SimpleDateFormat;
import java.util.Properties;

public class JavaMailSender {

    public void enviarEmail(Usuario user) {

        String to = "startergft.fbo@gmail.com";
        String from = "startergft.fbo@gmail.com";
        String host = "smtp.gmail.com";

        Properties props = System.getProperties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "465");
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.smtp.auth", "true");

        String meuEmail = "startergft.fbo@gmail.com";
        String minhaSenha = "@startergft123";


        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication(){
                return new PasswordAuthentication(meuEmail,minhaSenha);
            }
        });

        // Ativa Debug para sessão
        session.setDebug(true);

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("TechOne - Recuperação de senha solicitada para o e-mail "+user.getEmail());//Assunto
            message.setText("Entre no link abaixo para resetar sua senha: \n http://localhost:4200/recupera-senha?id="+user.getId());

            System.out.println("ENVIANDOOOOOOOOO");
            Transport.send(message);

            System.out.println("Feito!!!");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
