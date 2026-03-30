package br.com.sd.channel;


import br.com.sd.domain.pixel.Pixel;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class PixelOutputStream extends OutputStream {

    private OutputStream out;
    private Pixel[] pixels;
    private int count;

    public PixelOutputStream(Pixel[] pixels, int count, OutputStream out) {
        this.pixels = pixels;
        this.count = count;
        this.out = out;
    }

    @Override
    public void write(int b) throws IOException {
        out.write(b);
    }

    public void writePixels() throws IOException {

        for (int i = 0; i < count; i++) {
            Pixel p = pixels[i];

            String data = p.getX() + "," + p.getY() + "," + p.getColor() + "\n";

            byte[] bytes = data.getBytes(StandardCharsets.UTF_8);

            out.write(bytes.length);

            out.write(bytes);
        }

        out.flush();
    }
}