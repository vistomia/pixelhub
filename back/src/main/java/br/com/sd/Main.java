package br.com.sd;

import br.com.sd.channel.PixelInputStream;
import br.com.sd.domain.board.Board;
import br.com.sd.domain.pixel.Pixel;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {

    public static void main(String[] args) {

        Board board = new Board(1000, 1000);

        try {
            ServerSocket server = new ServerSocket(8080);

            while (true) {
                Socket client = server.accept();

                handleClient(client, board);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void handleClient(Socket client, Board board) {
        try {
            PixelInputStream inputStream =
                    new PixelInputStream(client.getInputStream());

            while (true) {

                Pixel p = inputStream.readPixel();

                board.setPixel(p.getX(), p.getY(), p.getColor());

                System.out.println("Pixel atualizado: (" +
                        p.getX() + "," + p.getY() + ") -> " + p.getColor());
            }

        } catch (IOException e) {
            System.out.println("Cliente desconectado.");
        }
    }
}