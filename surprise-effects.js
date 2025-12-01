// Surprise effects for the birthday website

// Confetti effect
function triggerConfetti() {
    const confettiArea = document.getElementById('confetti-area');
    const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e67e22'];
    
    // Clear previous confetti
    confettiArea.innerHTML = '';
    
    // Adjust number of confetti based on screen size
    const isMobile = window.innerWidth < 768;
    const confettiCount = isMobile ? 80 : 150;
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const baseSize = isMobile ? 4 : 5;
        const size = Math.random() * baseSize + (isMobile ? 3 : 5);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 2;
        
        // Style the confetti
        confetti.style.position = 'absolute';
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = `${left}%`;
        confetti.style.top = '-20px';
        confetti.style.opacity = '0.9';
        confetti.style.zIndex = '1000';
        
        // Create animation
        confetti.style.animation = `fall ${animationDuration}s ease-in ${animationDelay}s forwards`;
        
        // Add to container
        confettiArea.appendChild(confetti);
        
        // Remove after animation completes
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, (animationDuration + animationDelay) * 1000);
    }
    
    // Add CSS for confetti animation if not already present
    if (!document.getElementById('confetti-animation')) {
        const style = document.createElement('style');
        style.id = 'confetti-animation';
        style.textContent = `
            @keyframes fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Balloons effect
function triggerBalloons() {
    const balloonsArea = document.getElementById('balloons-area');
    const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e67e22'];
    const messages = ['Happy Birthday!', 'Selamat Ulang Tahun!', 'Best Wishes!', 'Cheers!', 'HBD!'];
    
    // Clear previous balloons
    balloonsArea.innerHTML = '';
    
    // Adjust number of balloons based on screen size
    const isMobile = window.innerWidth < 768;
    const balloonCount = isMobile ? 10 : 20;
    
    // Create balloons
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Random properties
        const size = Math.random() * (isMobile ? 40 : 80) + (isMobile ? 30 : 40);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 8 + 6;
        const animationDelay = Math.random() * 3;
        const hasMessage = Math.random() > 0.7;
        
        // Style the balloon
        balloon.style.position = 'absolute';
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.2}px`;
        balloon.style.backgroundColor = color;
        balloon.style.borderRadius = '50%';
        balloon.style.left = `${left}%`;
        balloon.style.bottom = '-100px';
        balloon.style.opacity = '0.9';
        balloon.style.zIndex = '1000';
        balloon.style.boxShadow = 'inset -10px -10px 10px rgba(0,0,0,0.1)';
        
        // Add string
        const string = document.createElement('div');
        string.style.position = 'absolute';
        string.style.width = '2px';
        string.style.height = `${size * 0.8}px`;
        string.style.backgroundColor = '#ccc';
        string.style.bottom = `-${size * 0.8}px`;
        string.style.left = '50%';
        string.style.transform = 'translateX(-50%)';
        balloon.appendChild(string);
        
        // Add message occasionally
        if (hasMessage) {
            const message = document.createElement('div');
            message.style.position = 'absolute';
            message.style.top = '50%';
            message.style.left = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.color = 'white';
            message.style.fontSize = isMobile ? '10px' : '12px';
            message.style.fontWeight = 'bold';
            message.style.textAlign = 'center';
            message.textContent = messages[Math.floor(Math.random() * messages.length)];
            balloon.appendChild(message);
        }
        
        // Create animation
        balloon.style.animation = `floatUp ${animationDuration}s ease-in ${animationDelay}s forwards`;
        
        // Add to container
        balloonsArea.appendChild(balloon);
        
        // Remove after animation completes
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
        }, (animationDuration + animationDelay) * 1000);
    }
    
    // Add CSS for balloon animation if not already present
    if (!document.getElementById('balloon-animation')) {
        const style = document.createElement('style');
        style.id = 'balloon-animation';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(20deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fireworks effect
function triggerFireworks() {
    const fireworksArea = document.getElementById('fireworks-area');
    const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e67e22'];
    
    // Clear previous fireworks
    fireworksArea.innerHTML = '';
    
    // Adjust number of fireworks based on screen size
    const isMobile = window.innerWidth < 768;
    const fireworkCount = isMobile ? 5 : 10;
    
    // Create fireworks
    for (let i = 0; i < fireworkCount; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Random properties
        const left = Math.random() * 80 + 10;
        const top = Math.random() * 60 + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * (isMobile ? 20 : 30) + (isMobile ? 15 : 20);
        const particles = Math.floor(Math.random() * (isMobile ? 15 : 20)) + (isMobile ? 20 : 30);
        
        // Position the firework
        firework.style.position = 'absolute';
        firework.style.left = `${left}%`;
        firework.style.top = `${top}%`;
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;
        firework.style.zIndex = '1000';
        
        // Create particles
        for (let j = 0; j < particles; j++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            
            // Particle properties
            const angle = (j / particles) * Math.PI * 2;
            const distance = Math.random() * (isMobile ? 40 : 60) + (isMobile ? 15 : 20);
            const duration = Math.random() * 0.8 + 0.5;
            const delay = Math.random() * 0.2;
            const particleSize = Math.random() * (isMobile ? 4 : 6) + (isMobile ? 1 : 2);
            
            // Style particle
            particle.style.position = 'absolute';
            particle.style.width = `${particleSize}px`;
            particle.style.height = `${particleSize}px`;
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = 'translate(-50%, -50%)';
            
            // Animate particle
            particle.style.animation = `explode ${duration}s ease-out ${delay}s forwards`;
            
            // Set animation properties via CSS variables
            particle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
            
            firework.appendChild(particle);
        }
        
        // Add to container
        fireworksArea.appendChild(firework);
        
        // Remove after animation completes
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 2000);
    }
    
    // Add CSS for fireworks animation if not already present
    if (!document.getElementById('fireworks-animation')) {
        const style = document.createElement('style');
        style.id = 'fireworks-animation';
        style.textContent = `
            @keyframes explode {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Music controls
let musicPlaying = false;
const birthdayMusic = document.getElementById('birthday-music');

function playBirthdayMusic() {
    if (birthdayMusic) {
        birthdayMusic.play()
            .then(() => {
                musicPlaying = true;
                updateMusicButton();
            })
            .catch(error => {
                console.log("Autoplay prevented:", error);
                // Show play button instead
                document.getElementById('play-music').innerHTML = '<i class="fas fa-play"></i> Putar Musik (Klik untuk mulai)';
            });
    }
}

function stopBirthdayMusic() {
    if (birthdayMusic) {
        birthdayMusic.pause();
        birthdayMusic.currentTime = 0;
        musicPlaying = false;
        updateMusicButton();
    }
}

function toggleMusic() {
    if (musicPlaying) {
        stopBirthdayMusic();
    } else {
        playBirthdayMusic();
    }
}

function updateMusicButton() {
    const button = document.getElementById('play-music');
    if (musicPlaying) {
        button.innerHTML = '<i class="fas fa-pause"></i> Hentikan Musik';
        button.classList.add('playing');
    } else {
        button.innerHTML = '<i class="fas fa-music"></i> Putar Musik';
        button.classList.remove('playing');
    }
}

// Secret messages
function showSecretMessages() {
    const messagesContainer = document.getElementById('secret-messages');
    const name = document.getElementById('name').value || 'Teman';
    
    // Get motivational quote
    const day = parseInt(document.getElementById('birth-date').value) || 1;
    const month = parseInt(document.getElementById('birth-month').value) || 1;
    const year = parseInt(document.getElementById('birth-year').value) || 2000;
    const age = calculateBirthdayInfo(day, month, year).age;
    const quote = getMotivationalQuote(age);
    
    // Get zodiac sign
    const zodiacSign = calculateZodiac(day, month);
    
    // Get Chinese zodiac
    const chineseZodiac = calculateChineseZodiac(year);
    
    // Get birth year fact
    const yearFact = getBirthYearFact(year);
    
    // Create messages HTML
    const messagesHTML = `
        <div class="message-container">
            <h2><i class="fas fa-lock-open"></i> Pesan Rahasia untuk ${name}</h2>
            
            <div class="message">
                <p><strong>Zodiak Anda:</strong> ${zodiacSign}</p>
                <p>Orang dengan zodiak ${zodiacSign} dikenal dengan karakteristik yang unik dan menarik.</p>
            </div>
            
            <div class="message">
                <p><strong>Shio Tionghoa:</strong> ${chineseZodiac}</p>
                <p>Tahun ${year} adalah tahun ${chineseZodiac} dalam kalender Tionghoa.</p>
            </div>
            
            <div class="message">
                <p><strong>Fakta tahun ${year}:</strong></p>
                <p>${yearFact}</p>
            </div>
            
            <div class="message">
                <p><strong>Kutipan motivasi untuk usia ${age}:</strong></p>
                <p>"${quote}"</p>
            </div>
            
            <button id="close-messages" class="btn-primary close-messages">
                <i class="fas fa-times"></i> Tutup Pesan Rahasia
            </button>
        </div>
    `;
    
    messagesContainer.innerHTML = messagesHTML;
    messagesContainer.classList.remove('hidden');
    
    // Add close event listener
    document.getElementById('close-messages').addEventListener('click', function() {
        messagesContainer.classList.add('hidden');
    });
}

// Create initial particles in header
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Adjust particle count based on screen size
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * (isMobile ? 6 : 10) + (isMobile ? 1 : 2);
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Style particle
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        
        // Animate particle
        particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particle animation if not already present
    if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0.5;
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                    opacity: 0.8;
                }
                50% {
                    transform: translateY(-10px) translateX(-10px);
                    opacity: 0.6;
                }
                75% {
                    transform: translateY(10px) translateX(5px);
                    opacity: 0.9;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});
