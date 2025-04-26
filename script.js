body {
  margin: 0;
  padding: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

#puzzle-container {
  position: relative;
  width: 600px;
  height: 400px;
  background: #111;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
}

.piece {
  position: absolute;
  background-size: 600px 400px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Efeito de brilho quando completo */
@keyframes shine {
  0% { box-shadow: 0 0 20px rgba(255,255,255,0.4); }
  50% { box-shadow: 0 0 40px rgba(255,255,255,0.8); }
  100% { box-shadow: 0 0 20px rgba(255,255,255,0.4); }
}

#puzzle-container.completed {
  animation: shine 2s infinite;
}
