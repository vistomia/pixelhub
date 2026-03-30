package br.com.sd.domain.board;

import br.com.sd.domain.pixel.Pixel;

public class Board {

    private static final int height = 1000;
    private static final int width = 1000;
    private Pixel[][] pixels;

    public Board(int width, int height) {
        this.pixels = new Pixel[width][height];

        //create PNG image
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                pixels[i][j] = new Pixel("#FFF");
            }
        }
    }

    public void setPixel(int x, int y, String color) {
        if (isValid(x, y)) {
            pixels[x][y].setColor(color);
        }
    }

    public String getPixel(int x, int y) {
        return pixels[x][y].getColor();
    }

    public boolean isValid(int x, int y) {
        return x >= 0 && y >= 0 && x < width && y < height;
    }

    public void send() {
        //send board
    }
}
