package br.com.sd.infra;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

public class Server {

    private ServerSocket serverSocket;

    public ServerSocket getServerSocket() {
        return serverSocket;
    }

    private List<Socket> connections = new ArrayList<>();

    public Server(int port) throws IOException {
        this.serverSocket = new ServerSocket(port);
    }

    public void resolveConnection(Socket connection) {
        connections.add(connection);

        //mantem conexao e espera alteracoes, em caso de alteracao, manda pra todo mundo com sendModifysForClients
    }

    public void sendModifysForClients() {
        this.connections.forEach(c -> {
            //manda alteracoes para todo mundo
        });
    }
}
