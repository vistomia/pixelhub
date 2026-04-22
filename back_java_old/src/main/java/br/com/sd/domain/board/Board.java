package br.com.sd.domain.board;

import br.com.sd.domain.pixel.Pixel;

public class Board {

    private int height;
    private int width;
    private Pixel[][] pixels;

    public Board(int width, int height) {
        this.width = width;
        this.height = height;
        this.pixels = new Pixel[width][height];

        // generate image
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < height; j++) {
                pixels[i][j] = new Pixel(i, j, "#FFF");
            }
        }
    }

    public void setPixel(int x, int y, String color) {
        if (isValid(x, y)) {
            pixels[x][y].setColor(color);
        }
    }

    public Pixel getPixel(int x, int y) {
        return pixels[x][y];
    }

    public boolean isValid(int x, int y) {
        return x >= 0 && y >= 0 && x < width && y < height;
    }

    public Pixel[][] getPixels() {
        return pixels;
    }
}