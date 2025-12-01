// Inisialisasi variabel global
let selectedTheme = 'default';
let isMusicPlaying = true;
let isSoundEnabled = true;
let balloons = [];
let sparkles = [];
let confettiParticles = [];

// Elemen DOM
const birthdayCard = document.querySelector('.birthday-card');
const cardInner = document.querySelector('.card-inner');
const nameInput = document.getElementById('name');
const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
const messageInput = document.getElementById('message');
const themeOptions = document.querySelectorAll('.theme-option');
const confettiCheckbox = document.getElementById('confetti');
const balloonsCheckbox = document.getElementById('balloons');
const sparklesCheckbox = document.getElementById('sparkles');
const musicCheckbox = document.getElementById('music');
const previewBtn = document.getElementById('previewBtn');
const generateBtn = document.getElementById('generateBtn');
const backToEditBtn = document.getElementById('backToEdit');
const musicToggle = document.getElementById('musicToggle');
const soundToggle = document.getElementById('soundToggle');
const birthdayMusic = document.getElementById('birthdayMusic');
const confettiCanvas = document.getElementById('confettiCanvas');
const sparkleCanvas = document.getElementById('sparkleCanvas');

// Konteks canvas
const confettiCtx = confettiCanvas.getContext('2d');
const sparkleCtx = sparkleCanvas.getContext('2d');

// Ukuran canvas
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;

// Inisialisasi aplikasi
function initApp() {
    // Isi dropdown hari (1-31)
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
    
    // Isi dropdown tahun (1900-tahun sekarang)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
    
    // Set tanggal default ke hari ini
    const today = new Date();
    daySelect.value = today.getDate();
    monthSelect.value = today.getMonth() + 1;
    yearSelect.value = today.getFullYear();
    
    // Event listener untuk tema
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedTheme = this.getAttribute('data-theme');
            applyTheme();
        });
    });
    
    // Event listener untuk tombol pratinjau
    previewBtn.addEventListener('click', previewCard);
    
    // Event listener untuk tombol buat ucapan
    generateBtn.addEventListener('click', generateCard);
    
    // Event listener untuk tombol kembali ke edit
    backToEditBtn.addEventListener('click', function() {
        birthdayCard.classList.remove('open');
    });
    
    // Event listener untuk musik
    musicToggle.addEventListener('click', toggleMusic);
    soundToggle.addEventListener('click', toggleSound);
    
    // Event listener untuk kartu
    birthdayCard.addEventListener('click', function() {
        if (!birthdayCard.classList.contains('open')) {
            birthdayCard.classList.add('open');
            startCelebration();
        }
    });
    
    // Event listener untuk resize window
    window.addEventListener('resize', function() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        sparkleCanvas.width = window.innerWidth;
        sparkleCanvas.height = window.innerHeight;
    });
    
    // Set tema default sebagai aktif
    document.querySelector('.theme-option[data-theme="default"]').classList.add('active');
    
    // Mulai musik
    birthdayMusic.play().catch(e => console.log("Autoplay diblokir, pengguna harus berinteraksi terlebih dahulu"));
    
    // Mulai animasi
    requestAnimationFrame(animate);
}

// Terapkan tema yang dipilih
function applyTheme() {
    const cardFront = document.querySelector('.card-front');
    
    switch(selectedTheme) {
        case 'galaxy':
            cardFront.style.background = 'linear-gradient(45deg, #0c0c2e, #3a0ca3, #4361ee)';
            break;
        case 'floral':
            cardFront.style.background = 'linear-gradient(45deg, #ff6b8b, #ff9e6d, #ffcc00)';
            break;
        case 'party':
            cardFront.style.background = 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)';
            break;
        default:
            cardFront.style.background = 'linear-gradient(45deg, #ff6b8b, #ff9e6d)';
    }
}

// Pratinjau kartu
function previewCard() {
    updateCardPreview();
    birthdayCard.classList.add('open');
    setTimeout(() => {
        birthdayCard.classList.remove('open');
    }, 3000);
}

// Buat kartu ucapan
function generateCard() {
    updateCardPreview();
    
    // Validasi input
    if (!nameInput.value.trim()) {
        alert('Silakan masukkan nama yang berulang tahun!');
        nameInput.focus();
        return;
    }
    
    if (!daySelect.value || !monthSelect.value || !yearSelect.value) {
        alert('Silakan pilih tanggal, bulan, dan tahun ulang tahun!');
        return;
    }
    
    // Buka kartu
    birthdayCard.classList.add('open');
    
    // Mulai perayaan jika suara diaktifkan
    if (isSoundEnabled) {
        startCelebration();
    }
}

// Update pratinjau kartu
function updateCardPreview() {
    // Update nama
    const displayName = document.getElementById('displayName');
    displayName.textContent = nameInput.value || 'Sahabat';
    
    // Update pesan
    const displayMessage = document.getElementById('displayMessage');
    displayMessage.textContent = messageInput.value || 'Semoga hari spesialmu dipenuhi kebahagiaan, cinta, dan banyak kejutan menyenangan!';
    
    // Update tanggal
    const day = daySelect.value;
    const month = monthSelect.options[monthSelect.selectedIndex].text;
    const year = yearSelect.value;
    
    const displayDate = document.getElementById('displayDate');
    displayDate.textContent = `${day} ${month} ${year}`;
    
    // Hitung usia
    const birthDate = new Date(year, monthSelect.value - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    
    // Periksa jika ulang tahun tahun ini sudah lewat
    if (today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const displayAge = document.getElementById('displayAge');
    displayAge.textContent = age;
}

// Mulai perayaan
function startCelebration() {
    // Mulai musik jika diaktifkan
    if (musicCheckbox.checked && isMusicPlaying && isSoundEnabled) {
        birthdayMusic.currentTime = 0;
        birthdayMusic.play().catch(e => console.log("Musik tidak dapat diputar: ", e));
    }
    
    // Buat konfeti jika diaktifkan
    if (confettiCheckbox.checked && isSoundEnabled) {
        createConfetti();
    }
    
    // Buat balon jika diaktifkan
    if (balloonsCheckbox.checked && isSoundEnabled) {
        createBalloons(15);
    }
    
    // Buat kilau jika diaktifkan
    if (sparklesCheckbox.checked && isSoundEnabled) {
        createSparkles(30);
    }
}

// Buat efek konfeti
function createConfetti() {
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 3 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            shape: Math.random() > 0.5 ? 'circle' : 'rect',
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
}

// Buat efek balon
function createBalloons(count) {
    const colors = ['#ff6b8b', '#ffcc00', '#3a86ff', '#8338ec', '#ff006e', '#00bb9d'];
    
    for (let i = 0; i < count; i++) {
        balloons.push({
            x: Math.random() * confettiCanvas.width,
            y: confettiCanvas.height + 50,
            radius: Math.random() * 20 + 15,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 2 + 1,
            swing: Math.random() * 0.05,
            swingOffset: Math.random() * Math.PI * 2
        });
    }
}

// Buat efek kilau
function createSparkles(count) {
    for (let i = 0; i < count; i++) {
        sparkles.push({
            x: Math.random() * sparkleCanvas.width,
            y: Math.random() * sparkleCanvas.height,
            size: Math.random() * 4 + 2,
            life: Math.random() * 100 + 50,
            maxLife: Math.random() * 100 + 50,
            speed: Math.random() * 0.05 + 0.02
        });
    }
}

// Animasi loop
function animate() {
    // Clear canvas
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
    
    // Update dan gambar konfeti
    confettiParticles.forEach((particle, index) => {
        particle.y += particle.speed;
        particle.x += Math.sin(particle.y * 0.01) * 0.5;
        particle.rotation += particle.rotationSpeed;
        
        // Gambar partikel
        confettiCtx.save();
        confettiCtx.translate(particle.x, particle.y);
        confettiCtx.rotate(particle.rotation * Math.PI / 180);
        confettiCtx.fillStyle = particle.color;
        
        if (particle.shape === 'circle') {
            confettiCtx.beginPath();
            confettiCtx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
            confettiCtx.fill();
        } else {
            confettiCtx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        }
        
        confettiCtx.restore();
        
        // Hapus partikel jika keluar dari layar
        if (particle.y > confettiCanvas.height) {
            confettiParticles.splice(index, 1);
        }
    });
    
    // Update dan gambar balon
    balloons.forEach((balloon, index) => {
        balloon.y -= balloon.speed;
        balloon.x += Math.sin(balloon.y * balloon.swing + balloon.swingOffset) * 2;
        
        // Gambar balon
        confettiCtx.beginPath();
        confettiCtx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
        confettiCtx.fillStyle = balloon.color;
        confettiCtx.fill();
        
        // Gambar tali balon
        confettiCtx.beginPath();
        confettiCtx.moveTo(balloon.x, balloon.y + balloon.radius);
        confettiCtx.lineTo(balloon.x, balloon.y + balloon.radius + 30);
        confettiCtx.strokeStyle = '#fff';
        confettiCtx.lineWidth = 1;
        confettiCtx.stroke();
        
        // Hapus balon jika keluar dari layar
        if (balloon.y < -50) {
            balloons.splice(index, 1);
        }
    });
    
    // Update dan gambar kilau
    sparkles.forEach((sparkle, index) => {
        sparkle.life -= sparkle.speed * 10;
        
        // Gambar kilau
        const opacity = (sparkle.life / sparkle.maxLife) * 0.8;
        sparkleCtx.beginPath();
        sparkleCtx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
        sparkleCtx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        sparkleCtx.fill();
        
        // Hapus kilau jika hidupnya habis
        if (sparkle.life <= 0) {
            sparkles.splice(index, 1);
            
            // Buat kilau baru secara acak
            if (Math.random() < 0.3 && sparkles.length < 50) {
                createSparkles(1);
            }
        }
    });
    
    // Tambah kilau baru secara acak
    if (Math.random() < 0.1 && sparkles.length < 30) {
        createSparkles(1);
    }
    
    requestAnimationFrame(animate);
}

// Toggle musik
function toggleMusic() {
    isMusicPlaying = !isMusicPlaying;
    const icon = musicToggle.querySelector('i');
    
    if (isMusicPlaying) {
        icon.className = 'fas fa-music';
        if (isSoundEnabled) {
            birthdayMusic.play().catch(e => console.log("Musik tidak dapat diputar: ", e));
        }
    } else {
        icon.className = 'fas fa-music-slash';
        birthdayMusic.pause();
    }
}

// Toggle suara
function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    const icon = soundToggle.querySelector('i');
    
    if (isSoundEnabled) {
        icon.className = 'fas fa-volume-up';
        if (isMusicPlaying) {
            birthdayMusic.play().catch(e => console.log("Musik tidak dapat diputar: ", e));
        }
    } else {
        icon.className = 'fas fa-volume-mute';
        birthdayMusic.pause();
        
        // Hapus semua efek
        confettiParticles = [];
        balloons = [];
        sparkles = [];
    }
}

// Inisialisasi saat halaman dimuat
window.addEventListener('DOMContentLoaded', initApp);
