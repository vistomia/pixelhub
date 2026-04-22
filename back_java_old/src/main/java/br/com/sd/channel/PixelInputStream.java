package br.com.sd.channel;

import br.com.sd.domain.pixel.Pixel;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class PixelInputStream extends InputStream {

    private InputStream in;

    public PixelInputStream(InputStream in) {
        this.in = in;
    }

    @Override
    public int read() throws IOException {
        return in.read();
    }

    public Pixel readPixel() throws IOException {

        int size = in.read();

        byte[] buffer = new byte[size];
        in.read(buffer);

        String data = new String(buffer, StandardCharsets.UTF_8);

        String[] parts = data.split(",");

        int x = Integer.parseInt(parts[0]);
        int y = Integer.parseInt(parts[1]);
        String color = parts[2];

        return new Pixel(x, y, color);
    }
}