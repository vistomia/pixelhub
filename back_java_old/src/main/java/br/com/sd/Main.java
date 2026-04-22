package br.com.sd;


import br.com.sd.infra.Server;

import java.io.IOException;
import java.net.Socket;


public class Main {

    public static void main(String[] args) throws IOException {
        Server server = new Server(8080);

        while(true){
            Socket connection = server.getServerSocket().accept();

            new Thread(() -> {
                server.resolveConnection(connection);
            }).start();
        }
    }
}