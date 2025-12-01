// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeForm();
    initializeEventListeners();
    populateDateOptions();
    
    // Setup responsive behavior
    setupResponsiveBehavior();
    
    // Check if there's saved data in localStorage
    loadSavedBirthdayData();
});

// Initialize form elements
function initializeForm() {
    // Set current year and populate year options
    const currentYear = new Date().getFullYear();
    const yearSelect = document.getElementById('birth-year');
    
    // Clear existing options except the first one
    while (yearSelect.options.length > 1) {
        yearSelect.remove(1);
    }
    
    // Add years from 1900 to current year
    for (let year = currentYear; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    
    // Populate day options
    populateDayOptions();
    
    // Set default date to today
    const today = new Date();
    document.getElementById('birth-date').value = today.getDate();
    document.getElementById('birth-month').value = today.getMonth() + 1;
    document.getElementById('birth-year').value = today.getFullYear();
}

// Populate day options based on selected month and year
function populateDateOptions() {
    const monthSelect = document.getElementById('birth-month');
    const yearSelect = document.getElementById('birth-year');
    const daySelect = document.getElementById('birth-date');
    
    monthSelect.addEventListener('change', updateDayOptions);
    yearSelect.addEventListener('change', updateDayOptions);
    
    // Initial population
    updateDayOptions();
}

function updateDayOptions() {
    const month = parseInt(document.getElementById('birth-month').value);
    const year = parseInt(document.getElementById('birth-year').value);
    const daySelect = document.getElementById('birth-date');
    
    if (!month || !year) return;
    
    // Get number of days in the selected month
    const daysInMonth = new Date(year, month, 0).getDate();
    const currentDay = parseInt(daySelect.value) || 1;
    
    // Clear existing options except the first one
    while (daySelect.options.length > 1) {
        daySelect.remove(1);
    }
    
    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }
    
    // Restore selected day if valid
    if (currentDay <= daysInMonth) {
        daySelect.value = currentDay;
    } else {
        daySelect.value = daysInMonth;
    }
}

function populateDayOptions() {
    const daySelect = document.getElementById('birth-date');
    
    // Clear existing options except the first one
    while (daySelect.options.length > 1) {
        daySelect.remove(1);
    }
    
    // Add days 1-31 by default
    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }
}

// Initialize event listeners
function initializeEventListeners() {
    const form = document.getElementById('birthday-form');
    const resetBtn = document.getElementById('reset-btn');
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateBirthdayCard();
    });
    
    // Reset button
    resetBtn.addEventListener('click', function() {
        resetForm();
    });
    
    // Surprise control buttons
    document.getElementById('trigger-confetti').addEventListener('click', function() {
        triggerConfetti();
    });
    
    document.getElementById('trigger-balloons').addEventListener('click', function() {
        triggerBalloons();
    });
    
    document.getElementById('trigger-fireworks').addEventListener('click', function() {
        triggerFireworks();
    });
    
    document.getElementById('play-music').addEventListener('click', function() {
        toggleMusic();
    });
    
    document.getElementById('show-messages').addEventListener('click', function() {
        showSecretMessages();
    });
    
    // Theme changer
    document.getElementById('theme').addEventListener('change', function() {
        applyTheme(this.value);
    });
}

// Generate the birthday card
function generateBirthdayCard() {
    // Get form values
    const name = document.getElementById('name').value;
    const day = parseInt(document.getElementById('birth-date').value);
    const month = parseInt(document.getElementById('birth-month').value);
    const year = parseInt(document.getElementById('birth-year').value);
    const customMessage = document.getElementById('custom-message').value;
    
    // Validate inputs
    if (!name || !day || !month || !year) {
        alert('Harap isi semua data yang diperlukan!');
        return;
    }
    
    // Calculate age and birthday info
    const birthdayData = calculateBirthdayInfo(day, month, year);
    
    // Get selected surprises
    const selectedSurprises = getSelectedSurprises();
    
    // Save to localStorage
    saveBirthdayData(name, day, month, year, customMessage, selectedSurprises);
    
    // Apply selected theme
    const theme = document.getElementById('theme').value;
    applyTheme(theme);
    
    // Generate card HTML
    const cardHTML = `
        <div class="card-header">
            <h2>Selamat Ulang Tahun!</h2>
            <div class="birthday-person">${name}</div>
            <div class="age-display">${birthdayData.age} Tahun</div>
            <p>Lahir: ${birthdayData.birthDateString}</p>
            <p>Hari lahir: ${birthdayData.birthDayOfWeek}</p>
        </div>
        
        <div class="card-content">
            <p>Hari ini adalah hari yang sangat spesial!</p>
            <p>${birthdayData.daysUntilNextBirthday === 0 
                ? '🎉 Hari ini adalah hari ulang tahunmu! 🎉' 
                : `Ulang tahunmu berikutnya dalam ${birthdayData.daysUntilNextBirthday} hari`}</p>
            
            ${customMessage ? `<div class="custom-message"><p>"${customMessage}"</p></div>` : ''}
            
            <div class="birthday-wish">
                <p>Semoga di usia ${birthdayData.age} tahun ini, kamu diberikan kesehatan, kebahagiaan, dan kesuksesan yang melimpah.</p>
                <p>Teruslah bermimpi dan raih semua cita-citamu!</p>
            </div>
        </div>
        
        <div class="card-footer">
            <p>Dikirim dengan penuh kasih sayang pada ${new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}</p>
        </div>
    `;
    
    // Display the card
    const cardElement = document.getElementById('birthday-card');
    cardElement.innerHTML = cardHTML;
    cardElement.classList.remove('hidden');
    
    // Show surprise controls
    document.getElementById('surprise-controls').classList.remove('hidden');
    
    // Scroll to the card
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Trigger automatic surprises if selected
    triggerAutomaticSurprises(selectedSurprises);
}

// Get selected surprises from checkboxes
function getSelectedSurprises() {
    const checkboxes = document.querySelectorAll('input[name="surprise"]:checked');
    const surprises = [];
    
    checkboxes.forEach(checkbox => {
        surprises.push(checkbox.value);
    });
    
    return surprises;
}

// Trigger automatic surprises based on selection
function triggerAutomaticSurprises(surprises) {
    // Small delay for better user experience
    setTimeout(() => {
        surprises.forEach(surprise => {
            switch(surprise) {
                case 'confetti':
                    triggerConfetti();
                    break;
                case 'balloons':
                    triggerBalloons();
                    break;
                case 'fireworks':
                    triggerFireworks();
                    break;
                case 'music':
                    playBirthdayMusic();
                    break;
                case 'messages':
                    // Messages will be shown when user clicks the button
                    break;
            }
        });
    }, 500);
}

// Apply selected theme
function applyTheme(theme) {
    const root = document.documentElement;
    
    // Reset to default first
    root.style.setProperty('--primary-color', '#e74c3c');
    root.style.setProperty('--secondary-color', '#f1c40f');
    root.style.setProperty('--accent-color', '#9b59b6');
    
    // Reset rainbow background
    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    document.body.style.backgroundSize = 'auto';
    document.body.style.animation = 'none';
    
    switch(theme) {
        case 'blue':
            root.style.setProperty('--primary-color', '#3498db');
            root.style.setProperty('--secondary-color', '#bdc3c7');
            root.style.setProperty('--accent-color', '#2980b9');
            break;
        case 'purple':
            root.style.setProperty('--primary-color', '#9b59b6');
            root.style.setProperty('--secondary-color', '#e84393');
            root.style.setProperty('--accent-color', '#8e44ad');
            break;
        case 'green':
            root.style.setProperty('--primary-color', '#2ecc71');
            root.style.setProperty('--secondary-color', '#f1c40f');
            root.style.setProperty('--accent-color', '#27ae60');
            break;
        case 'rainbow':
            // Rainbow theme will apply animated background
            document.body.style.background = 'linear-gradient(270deg, #ff9a9e, #fad0c4, #fad0c4, #a1c4fd, #c2e9fb)';
            document.body.style.backgroundSize = '400% 400%';
            document.body.style.animation = 'gradientShift 15s ease infinite';
            break;
    }
}

// Reset form and hide card
function resetForm() {
    document.getElementById('birthday-card').classList.add('hidden');
    document.getElementById('surprise-controls').classList.add('hidden');
    document.getElementById('secret-messages').classList.add('hidden');
    
    // Stop music if playing
    stopBirthdayMusic();
    
    // Scroll back to form
    document.querySelector('.input-section').scrollIntoView({ behavior: 'smooth' });
}

// Save data to localStorage
function saveBirthdayData(name, day, month, year, message, surprises) {
    const birthdayData = {
        name,
        day,
        month,
        year,
        message,
        surprises,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('birthdayCardData', JSON.stringify(birthdayData));
}

// Load saved data from localStorage
function loadSavedBirthdayData() {
    const savedData = localStorage.getItem('birthdayCardData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Check if data is less than 7 days old
        const savedAt = new Date(data.savedAt);
        const now = new Date();
        const daysDiff = (now - savedAt) / (1000 * 60 * 60 * 24);
        
        if (daysDiff < 7) {
            // Prefill form with saved data
            document.getElementById('name').value = data.name || '';
            document.getElementById('birth-date').value = data.day || '';
            document.getElementById('birth-month').value = data.month || '';
            document.getElementById('birth-year').value = data.year || '';
            document.getElementById('custom-message').value = data.message || '';
            
            // Check surprise checkboxes
            if (data.surprises && data.surprises.length > 0) {
                const checkboxes = document.querySelectorAll('input[name="surprise"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = data.surprises.includes(checkbox.value);
                });
            }
            
            // Show a notification
            showNotification('Data ulang tahun sebelumnya ditemukan. Isian form telah diisi otomatis.');
        }
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification animate__animated animate__fadeInDown';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.left = '20px';
    notification.style.maxWidth = '500px';
    notification.style.margin = '0 auto';
    notification.style.backgroundColor = '#2ecc71';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.justifyContent = 'space-between';
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.classList.add('animate__fadeOutUp');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('animate__fadeOutUp');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

// Handle responsive behavior
function setupResponsiveBehavior() {
    // Check screen size on load
    checkScreenSize();
    
    // Re-check on resize
    window.addEventListener('resize', debounce(checkScreenSize, 250));
    
    // Adjust particle count based on screen size
    adjustEffectsForScreenSize();
}

function checkScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Add/remove classes based on screen size
    if (width < 768) {
        document.body.classList.add('mobile-view');
        document.body.classList.remove('tablet-view', 'desktop-view');
    } else if (width < 1024) {
        document.body.classList.add('tablet-view');
        document.body.classList.remove('mobile-view', 'desktop-view');
    } else {
        document.body.classList.add('desktop-view');
        document.body.classList.remove('mobile-view', 'tablet-view');
    }
    
    // Adjust layout for landscape/portrait
    if (width > height) {
        document.body.classList.add('landscape');
        document.body.classList.remove('portrait');
    } else {
        document.body.classList.add('portrait');
        document.body.classList.remove('landscape');
    }
}

// Debounce function untuk optimasi resize event
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function adjustEffectsForScreenSize() {
    const width = window.innerWidth;
    
    // Kurangi jumlah efek untuk perangkat mobile
    if (width < 768) {
        // Update config untuk mobile
        window.MOBILE_MODE = true;
    } else {
        window.MOBILE_MODE = false;
    }
}
