function showLove() {
    const loveMessage = document.createElement('div');
    loveMessage.className = 'love-message';
    loveMessage.innerHTML = `
        <h2>💖 在一起吧！</h2>
        <p>我好开心！从今天起，<br>我们就是世界上最幸福的人！</p>
        <p style="margin-top: 20px; font-size: 1.5em;">❤️ 520 ❤️</p>
    `;
    document.body.appendChild(loveMessage);
    
    createConfetti();
    
    setTimeout(() => {
        loveMessage.style.animation = 'pop-in 0.5s ease-out reverse';
        setTimeout(() => {
            loveMessage.remove();
        }, 500);
    }, 5000);
}

function playGame() {
    const btnNo = document.querySelector('.btn-no');
    const btnYes = document.querySelector('.btn-yes');
    
    let attempts = 0;
    const maxAttempts = 3;
    
    btnNo.addEventListener('mouseenter', function() {
        if (attempts < maxAttempts) {
            const container = document.querySelector('.container');
            const rect = container.getBoundingClientRect();
            
            const newX = Math.random() * (rect.width - btnNo.offsetWidth);
            const newY = Math.random() * (rect.height - btnNo.offsetHeight);
            
            btnNo.style.position = 'absolute';
            btnNo.style.left = `${newX}px`;
            btnNo.style.top = `${newY}px`;
            
            attempts++;
            
            if (attempts === maxAttempts) {
                btnNo.textContent = '好吧，我也喜欢你 💖';
                btnNo.classList.remove('btn-no');
                btnNo.classList.add('btn-yes');
                btnNo.removeEventListener('mouseenter', arguments.callee);
            }
        }
    });
}

function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffd700', '#ffc0cb'];
    const confettiContainer = document.getElementById('confetti');
    
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width = `${5 + Math.random() * 10}px`;
        piece.style.height = piece.style.width;
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        piece.style.animationDelay = `${Math.random() * 2}s`;
        piece.style.animationDuration = `${2 + Math.random() * 2}s`;
        
        confettiContainer.appendChild(piece);
    }
    
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 4000);
}

function floatingHearts() {
    const container = document.querySelector('.container');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = '100%';
        heart.style.fontSize = `${16 + Math.random() * 16}px`;
        heart.style.opacity = 0.7;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = 100;
        
        container.appendChild(heart);
        
        let top = 100;
        const floatInterval = setInterval(() => {
            top -= 0.5;
            heart.style.top = `${top}%`;
            
            if (top < -10) {
                clearInterval(floatInterval);
                heart.remove();
            }
        }, 20);
    }, 800);
}

floatingHearts();