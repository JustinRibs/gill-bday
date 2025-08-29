// Mobile-Optimized Birthday Countdown
class BirthdayCountdown {
    constructor() {
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.messageElement = document.getElementById('message');
        
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
        this.addMobileInteractions();
    }
    
    getNextBirthday() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        // Create birthday date for current year (May 8th)
        let birthday = new Date(currentYear, 4, 8); // Month is 0-indexed, so 4 = May
        
        // If birthday has passed this year, set it to next year
        if (now > birthday) {
            birthday = new Date(currentYear + 1, 4, 8);
        }
        
        return birthday;
    }
    
    updateCountdown() {
        const now = new Date();
        const birthday = this.getNextBirthday();
        
        // Calculate time difference
        const timeDifference = birthday - now;
        
        if (timeDifference <= 0) {
            // It's her birthday!
            this.displayBirthdayMessage();
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Update display with mobile-optimized animations
        this.updateElementWithMobileAnimation(this.daysElement, days);
        this.updateElementWithMobileAnimation(this.hoursElement, hours);
        this.updateElementWithMobileAnimation(this.minutesElement, minutes);
        this.updateElementWithMobileAnimation(this.secondsElement, seconds);
        
        // Update message based on how close the birthday is
        this.updateMessage(days);
    }
    
    updateElementWithMobileAnimation(element, value) {
        const newValue = value.toString().padStart(2, '0');
        if (element.textContent !== newValue) {
            // Mobile-friendly animation
            element.style.transform = 'scale(1.1)';
            element.style.color = '#ff9ff3';
            element.style.textShadow = '0 0 10px rgba(255, 159, 243, 0.5)';
            element.textContent = newValue;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = 'white';
                element.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }, 200);
        }
    }
    
    updateMessage(days) {
        let message = '';
        
        if (days === 0) {
            message = "It's almost here, Gill! Get ready for an amazing birthday! 🎉";
        } else if (days === 1) {
            message = "Tomorrow is your big day, Gill! The excitement is building! 🎈";
        } else if (days <= 7) {
            message = "Just a few days left, Gill! The countdown is almost over! ⏰";
        } else if (days <= 30) {
            message = "Less than a month to go, Gill! The anticipation is growing! 🌟";
        } else if (days <= 90) {
            message = "Getting closer, Gill! The birthday magic is in the air! ✨";
        } else {
            message = "Get ready for an amazing birthday celebration, Gill! 🎊";
        }
        
        this.messageElement.querySelector('.message-text').textContent = message;
    }
    
    displayBirthdayMessage() {
        this.daysElement.textContent = '00';
        this.hoursElement.textContent = '00';
        this.minutesElement.textContent = '00';
        this.secondsElement.textContent = '00';
        
        this.messageElement.querySelector('.message-text').innerHTML = `
            <span style="font-size: 1.3rem; font-weight: 700; display: block; margin-bottom: 0.5rem;">🎉 HAPPY BIRTHDAY, GILL! 🎉</span>
            <span>Today is your special day! Enjoy every moment! 🎂🎈</span>
        `;
        
        // Add mobile-optimized celebration effects
        this.addMobileCelebrationEffects();
    }
    
    addMobileCelebrationEffects() {
        // Mobile-friendly confetti
        this.createMobileConfetti();
        
        // Add rainbow background animation
        document.body.style.background = 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'rainbowShift 3s ease infinite';
        
        // Add heart burst effect
        this.createHeartBurst();
        
        // Add celebration sound (optional)
        this.playMobileCelebrationSound();
    }
    
    createMobileConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ff9ff3', '#45b7d1', '#feca57', '#96ceb4'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                confetti.style.position = 'fixed';
                confetti.style.width = Math.random() * 8 + 4 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.backgroundColor = color;
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-20px';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.animation = `mobileConfettiFall ${Math.random() * 2 + 2}s linear forwards`;
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 4000);
            }, i * 80);
        }
    }
    
    createHeartBurst() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'fixed';
                heart.style.fontSize = '1.5rem';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = Math.random() * 100 + 'vh';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9998';
                heart.style.animation = 'heartBurst 1.5s ease-out forwards';
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 1500);
            }, i * 150);
        }
    }
    
    playMobileCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a simple mobile-friendly melody
            const frequencies = [523, 659, 784, 1047, 1319]; // C, E, G, C, E (higher)
            
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.4);
                }, index * 300);
            });
        } catch (error) {
            // Silently fail if audio is not supported
        }
    }
    
    addMobileInteractions() {
        // Add touch-friendly interactions to countdown cards
        const countdownCards = document.querySelectorAll('.countdown-card');
        countdownCards.forEach(card => {
            // Touch start effect
            card.addEventListener('touchstart', (e) => {
                e.preventDefault();
                card.style.transform = 'scale(0.95)';
                card.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            });
            
            // Touch end effect
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.backgroundColor = '';
                }, 150);
            });
            
            // Click effect for desktop
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
        
        // Add touch interaction to profile image
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            profileImage.addEventListener('touchstart', (e) => {
                e.preventDefault();
                profileImage.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            profileImage.addEventListener('touchend', () => {
                setTimeout(() => {
                    profileImage.style.transform = 'scale(1.05)';
                }, 200);
            });
            
            // Desktop hover effects
            profileImage.addEventListener('mouseenter', () => {
                profileImage.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            profileImage.addEventListener('mouseleave', () => {
                profileImage.style.transform = 'scale(1.05)';
            });
        }
        
        // Add haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            countdownCards.forEach(card => {
                card.addEventListener('touchstart', () => {
                    navigator.vibrate(50);
                });
            });
        }
    }
}

// Add mobile-optimized animations to CSS
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @keyframes mobileConfettiFall {
        0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes heartBurst {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes rainbowShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    /* Mobile-specific optimizations */
    @media (max-width: 768px) {
        .countdown-card {
            -webkit-tap-highlight-color: transparent;
            user-select: none;
            -webkit-user-select: none;
        }
        
        .profile-image {
            -webkit-tap-highlight-color: transparent;
        }
    }
    
    /* Prevent text selection on mobile */
    .countdown-value,
    .countdown-label,
    .message-text {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;
document.head.appendChild(mobileStyles);

// Initialize countdown when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayCountdown();
    
    // Handle image loading
    const photo = document.querySelector('.profile-image');
    if (photo) {
        photo.addEventListener('error', () => {
            const profileImageContainer = document.querySelector('.profile-image-container');
            if (profileImageContainer) {
                profileImageContainer.innerHTML = '<div class="photo-placeholder">🎂</div>';
            }
        });
    }
    
    // Add mobile-specific optimizations
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevent zoom on double tap for mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add viewport meta tag for better mobile experience
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewport);
    }
});
