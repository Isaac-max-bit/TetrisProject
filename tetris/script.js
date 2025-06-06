// Manejar la entrada del teclado
document.addEventListener('keydown', e => {
    // Solo permitir movimientos si el juego está en curso y hay una pieza activa
    if (!currentPiece || !dropInterval) return; 

    switch (e.key) {
        case 'ArrowLeft':
        case 'a':
            if (isValidMove(currentPiece, currentPieceX - 1, currentPieceY)) {
                currentPieceX--;
            }
            break;
        case 'ArrowRight':
        case 'd':
            if (isValidMove(currentPiece, currentPieceX + 1, currentPieceY)) {
                currentPieceX++;
            }
            break;
        case 'ArrowDown':
        case 's':
            dropPiece(); // Baja la pieza un espacio
            // Reinicia el temporizador para que no haya un doble movimiento
            clearInterval(dropInterval);
            dropInterval = setInterval(dropPiece, DROP_SPEED);
            break;
        case 'ArrowUp':
        case 'w':
            rotatePiece();
            break;
        case ' ': // Nueva tecla para Hard Drop (barra espaciadora)
            e.preventDefault(); // Previene el scroll de la página con la barra espaciadora
            hardDrop();
            break;
    }
    drawBoard(); // Redibujar después de cualquier movimiento del jugador
});

// --- Nueva función para Hard Drop ---
function hardDrop() {
    // Mover la pieza hacia abajo hasta que ya no sea un movimiento válido
    while (isValidMove(currentPiece, currentPieceX, currentPieceY + 1)) {
        currentPieceY++;
    }
    fixPiece(); // Una vez en el fondo, fijar la pieza al tablero
    // No necesitamos reiniciar el intervalo aquí, ya que fixPiece
    // genera una nueva pieza y el ciclo de caída continuará con ella.
    // Además, el `drawBoard()` se llamará al final del `keydown` handler.
}