document.addEventListener("DOMContentLoaded", (event) => {
  const canvas = document.getElementById("gameBoard");
  const context = canvas.getContext("2d");

  // Variabili per la posizione del quadrato:
  let positionX = canvas.width / 2 - 25;
  let positionY = canvas.height - 50;
  const step = 10; // Passo di movimento
  let isJumping = false;
  let jumpSpeed = 0;
  const gravity = 0.5; // Forza di gravità

  function resizeCanvas() {
    // Dimensioni canvas:
    canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // Reimposta la posizione del quadrato al centro dopo il ridimensionamento:
    positionX = canvas.width / 2 - 25;
    positionY = canvas.height - 50;

    draw();
  }

  function draw() {
    // Pulisci il canvas:
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Disegna un quadrato rosso al centro del canvas:
    context.fillStyle = "red";
    context.fillRect(positionX, positionY, 50, 50);
  }

  function handleKeyPress(event) {
    switch (event.key) {
      case "w":
        positionY = Math.max(0, positionY - step);
        break;
      case "s":
        positionY = Math.min(canvas.height - 50, positionY + step);
        break;
      case "a":
        positionX = Math.max(0, positionX - step);
        break;
      case "d":
        positionX = Math.min(canvas.width - 50, positionX + step);
        break;
      case " ":
        if (!isJumping) {
          isJumping = true;
          jumpSpeed = -10; // Impulso iniziale verso l'alto
          requestAnimationFrame(jump);
        }
        break;
    }
    draw();
  }

  function jump() {
    if (isJumping) {
      positionY += jumpSpeed;
      jumpSpeed += gravity; // Applica la gravità

      // Controlla se il personaggio ha toccato terra
      if (positionY >= canvas.height - 50) {
        positionY = canvas.height - 50;
        isJumping = false;
        jumpSpeed = 0;
      }

      draw();
      requestAnimationFrame(jump);
    }
  }

  // Chiamata iniziale per impostare la dimensione del canvas
  resizeCanvas();

  // Event listener per ridimensionare il canvas quando la finestra viene ridimensionata:
  window.addEventListener("resize", resizeCanvas);
  // Event listener per rilevare i tasti premuti:
  window.addEventListener("keydown", handleKeyPress);
});
