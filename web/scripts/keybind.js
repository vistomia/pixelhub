document.addEventListener("keydown", (e) => {
    switch(e.key.toLowerCase()) {
        case 'w':
        case 'b':
            setPencil();
            break;
        case 'e':
            setEraser();
            break;
        case 'r':
        case 'g':
            setBucket();
            break;
        case 'i':
        case 'k':
            setDropper();
            break;
        case 'h':
        case ' ':
            setPan();
            break;
        case '+':
        case '=':
            zoomIn();
            break;
        case '-':
        case '_':
            zoomOut();
            break;
    }
})