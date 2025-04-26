const domain = new URLSearchParams(window.location.search).get('domain') || 'http://localhost:3900';
const imageURL = new URLSearchParams(window.location.search).get('img') || './img/puzzle.jpg'; // Default se não passares o parâmetro
const rows = 4;
const cols = 6;
let revealedPieces = 0;
let totalPieces = rows * cols;

const puzzleContainer = document.getElementById('puzzle-container');

// Cria as peças
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.style.width = `${100 / cols}%`;
    piece.style.height = `${100 / rows}%`;
    piece.style.left = `${(100 / cols) * c}%`;
    piece.style.top = `${(100 / rows) * r}%`;
    piece.style.backgroundImage = `url('${imageURL}')`;
    piece.style.backgroundPosition = `-${(600 / cols) * c}px -${(400 / rows) * r}px`;
    puzzleContainer.appendChild(piece);
  }
}

const pieces = document.querySelectorAll('.piece');

// Função para revelar peças aleatoriamente
function revealPiece() {
  const hiddenPieces = Array.from(pieces).filter(p => p.style.opacity == 0);

  if (hiddenPieces.length > 0) {
    const randomPiece = hiddenPieces[Math.floor(Math.random() * hiddenPieces.length)];
    randomPiece.style.opacity = 1;
  }
}

// Busca os dados do servidor
function fetchData() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      if (data && data.wordcloud) {
        const chatHistory = data.wordcloud.toLowerCase().split(',').filter(w => w.trim() !== "");
        const commentsCount = chatHistory.length;

        while (revealedPieces < commentsCount && revealedPieces < totalPieces) {
          revealPiece();
          revealedPieces++;
        }

        if (revealedPieces >= totalPieces && !puzzleContainer.classList.contains('completed')) {
          triggerCelebration();
        }
      }
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}

// Função de celebração (confetti e brilho)
function triggerCelebration() {
  puzzleContainer.classList.add('completed');

  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#00f2fe', '#4facfe', '#ffffff']
  });

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.3 },
      colors: ['#00f2fe', '#4facfe', '#ffffff']
    });
  }, 1000);
}

// Atualiza o puzzle a cada segundo
setInterval(fetchData, 1000);

// Primeira busca
fetchData();
