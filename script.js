const btnYes = document.getElementById('yes');
const btnNo = document.getElementById('no');
const message = document.getElementById('message');
const clickSound = document.getElementById('clickSound');
const successSound = document.getElementById('successSound');
const heartsContainer = document.querySelector('.hearts-container');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const backgroundMusic = document.getElementById('backgroundMusic');

let fontSize = 2;
let currentMessage = 'No';

let messages = [
  'Estas segurx?',
  'Piensalo bien',
  'Piensalo muy bien',
  'Piensalo',
  'Mira el otro botón'
]

// Crear corazones flotantes
function createFloatingHearts() {
  setInterval(() => {
    // Crear 3 corazones en cada intervalo
    for(let i = 0; i < 3; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      
      // Posición aleatoria en el eje X
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
      heart.style.opacity = (Math.random() * 0.3 + 0.5).toString();
      heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      
      heartsContainer.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 6000);
    }
  }, 200); // Intervalo más corto para más corazones
}

// Función para el confeti
function throwConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    spread: 360,
    ticks: 100,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#ff0000', '#ff69b4', '#ff1493', '#ffffff']
  };

  confetti({
    ...defaults,
    particleCount: count/2
  });

  confetti({
    ...defaults,
    angle: 60,
    particleCount: count/4
  });

  confetti({
    ...defaults,
    angle: 120,
    particleCount: count/4
  });
}

// Función para mostrar el mensaje final
function typewriterEffect(text, element, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  const typing = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      element.classList.add('glow-effect');
    }
  }, speed);
}

function showFinalMessage() {
  document.querySelector('main > img').style.display = 'none';
  document.querySelector('main > h1').style.display = 'none';
  document.querySelector('.options').style.display = 'none';
  
  message.style.display = 'flex';
  message.classList.add('show');
  
  // Crear contenedor para el mensaje final
  const messageContent = `
    <div class="final-message-container">
      <div class="heart-icon">❤️</div>
      <h1></h1>
      <div class="love-message">
        <p>Gracias por hacer mis días más felices</p>
        <p>Eres lo mejor que me ha pasado</p>
        <p>Te quiero mucho 💖</p>
      </div>
      <div class="heart-icon">❤️</div>
    </div>
  `;
  
  message.innerHTML = messageContent;
  
  // Texto con efecto máquina de escribir y emojis
  const finalText = "Siempre supe que dirías que sí 💝";
  typewriterEffect(finalText, message.querySelector('h1'));
  
  successSound.play();
  throwConfetti();
}

// Función para crear estrellas brillantes
function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars-container';
  document.body.appendChild(starsContainer);

  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    starsContainer.appendChild(star);
  }
}

// Función para el efecto de explosión de corazones
function heartBurst(x, y) {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.className = 'burst-heart';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    const angle = (Math.random() * 360) * (Math.PI / 180);
    const velocity = 5 + Math.random() * 5;
    heart.style.setProperty('--angle', `${angle}rad`);
    heart.style.setProperty('--velocity', `${velocity}`);
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
  }
}

// Eventos
createFloatingHearts();

btnYes.addEventListener('click', () => {
  showFinalMessage();
  throwConfetti();
  
  // Efecto de explosión de fuegos artificiales
  const colors = ['#ff69b4', '#ff1493', '#ff6b6b', '#ffffff'];
  const fireworks = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight
      },
      colors: colors,
      disableForReducedMotion: true
    });
  }, 500);

  // Detener los fuegos artificiales después de 3 segundos
  setTimeout(() => clearInterval(fireworks), 3000);
});

btnNo.addEventListener('mouseover', (e) => {
  const x = Math.random() * (window.innerWidth - e.target.offsetWidth);
  const y = Math.random() * (window.innerHeight - e.target.offsetHeight);
  
  currentMessage = e.target.textContent;
  clickSound.play();
  
  e.target.style.position = 'absolute';
  e.target.style.left = x + 'px';
  e.target.style.top = y + 'px';
  
  e.target.textContent = currentMessage;
});

btnNo.addEventListener('click', () => {
  fontSize = fontSize + .5;
  btnYes.style.fontSize = `${fontSize}rem`;
  clickSound.play();

  const indexRandom = Math.floor(Math.random() * messages.length);
  currentMessage = messages[indexRandom];
  btnNo.textContent = currentMessage;
});

// Seguimiento del cursor con mini corazones
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.9) { // 10% de probabilidad de crear un corazón
    heartBurst(e.clientX, e.clientY);
  }
});

// Iniciar efectos
createStars();

function createEmojiRain() {
  const emojis = ['❤️', '💖', '💝', '💕', '💓', '💗', '💞'];
  setInterval(() => {
    const emoji = document.createElement('div');
    emoji.className = 'falling-emoji';
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(emoji);
    
    setTimeout(() => emoji.remove(), 6000);
  }, 300);
}

function createFloatingParticles() {
  const colors = ['#ff69b4', '#ff1493', '#ff6b6b', '#ffffff'];
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.animationDelay = -Math.random() * 20 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Evento para el botón de inicio
startButton.addEventListener('click', () => {
  backgroundMusic.play();
  
  // Agregar clase para la transición suave
  startScreen.classList.add('hide');
  
  // Esperar a que termine la transición antes de ocultar
  setTimeout(() => {
    startScreen.style.display = 'none';
    document.querySelector('main').style.display = 'flex';
  }, 800);
  
  // Iniciar todos los efectos
  createFloatingHearts();
  createStars();
  createEmojiRain();
  createFloatingParticles();
});

// Ocultar el contenido principal inicialmente
document.querySelector('main').style.display = 'none';