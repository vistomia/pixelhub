package br.com.sd.domain.tools;

import br.com.sd.domain.board.Board;

public class Erase extends Tool implements ITool{

    private static final String color = "#FFF";

    @Override
    public void write(Board board, int x, int y) {
        board.setPixel(x, y, Erase.color);
    }
}
