package br.com.sd.domain.tools;

import br.com.sd.domain.board.Board;

public class Pencil extends Tool implements ITool{

    private String color;

    public Pencil(int areaX, int areaY) {
        this.areaX = areaX;
        this.areaY = areaY;
    }

    @Override
    public void write(Board board, int x, int y) {
        board.setPixel(x, y, this.color);
    }
}
