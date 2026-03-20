# PixelHub

32 número da lista

Victor Farias e Emanuel Araújo

## Aplicação

Mural de Pixel Art Colaborativo.


### Superclasse

Ferramenta (representa uma ferramenta que o usuário pode selecionar para interagir com o mural)

### Subclasses

De Ferramenta: Pincel, Borracha, BaldeDeTinta

---
Agregação -> Mural, que conterá uma matriz de Pixels
Interface -> Desenha que define uma operação como desenhar.

## TODO

[ x ] Pencil
[ x ] Eraser
[ o ] Bucket
[  ] Dropper
[ X ] Pan
[ ] Cursors
[ ] Pallete

## Rotas

proibir pintar em uma distância longa
definir número máximo de pixels que podem ser pintados

usar websocket para enviar vetor

desenhar
["ação", cor, x, y]

cor em hexadecimal
x inteiro
y inteiro
