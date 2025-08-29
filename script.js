// Modern Birthday Countdown functionality
class BirthdayCountdown {
    constructor() {
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.messageElement = document.getElementById('message');
        
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
        this.addInteractiveEffects();
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
        
        // Update display with smooth transitions
        this.updateElementWithAnimation(this.daysElement, days);
        this.updateElementWithAnimation(this.hoursElement, hours);
        this.updateElementWithAnimation(this.minutesElement, minutes);
        this.updateElementWithAnimation(this.secondsElement, seconds);
        
        // Update message based on how close the birthday is
        this.updateMessage(days);
    }
    
    updateElementWithAnimation(element, value) {
        const newValue = value.toString().padStart(2, '0');
        if (element.textContent !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.style.color = '#ff9ff3';
            element.textContent = newValue;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = 'white';
            }, 150);
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
        
        this.messageElement.querySelector('.message-content p').textContent = message;
    }
    
    displayBirthdayMessage() {
        this.daysElement.textContent = '00';
        this.hoursElement.textContent = '00';
        this.minutesElement.textContent = '00';
        this.secondsElement.textContent = '00';
        
        this.messageElement.querySelector('.message-content').innerHTML = `
            <p style="font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem;">🎉 HAPPY BIRTHDAY, GILL! 🎉</p>
            <p>Today is your special day! Enjoy every moment! 🎂🎈</p>
        `;
        
        // Add extra celebration effects
        this.addCelebrationEffects();
    }
    
    addCelebrationEffects() {
        // Enhanced confetti effect
        this.createModernConfetti();
        
        // Add rainbow background animation
        document.body.style.background = 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'rainbowShift 2s ease infinite';
        
        // Add sparkle burst effect
        this.createSparkleBurst();
        
        // Add celebration sound (optional)
        this.playCelebrationSound();
    }
    
    createModernConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ff9ff3', '#45b7d1', '#feca57', '#96ceb4'];
        const shapes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const color = colors[Math.floor(Math.random() * colors.length)];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                confetti.style.position = 'fixed';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.backgroundColor = color;
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-20px';
                confetti.style.borderRadius = shape === 'circle' ? '50%' : '0';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.animation = `modernConfettiFall ${Math.random() * 3 + 2}s linear forwards`;
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                if (shape === 'triangle') {
                    confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                }
                
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 50);
        }
    }
    
    createSparkleBurst() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'fixed';
                sparkle.style.fontSize = '2rem';
                sparkle.style.left = Math.random() * 100 + 'vw';
                sparkle.style.top = Math.random() * 100 + 'vh';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '9998';
                sparkle.style.animation = 'sparkleBurst 1s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1000);
            }, i * 100);
        }
    }
    
    playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a simple celebration melody
            const frequencies = [523, 659, 784, 1047]; // C, E, G, C (higher)
            
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.3);
                }, index * 200);
            });
        } catch (error) {
            // Silently fail if audio is not supported
        }
    }
    
    addInteractiveEffects() {
        // Add click effects to countdown items
        const countdownItems = document.querySelectorAll('.countdown-item');
        countdownItems.forEach(item => {
            item.addEventListener('click', () => {
                item.style.transform = 'scale(0.95) translateY(-10px)';
                setTimeout(() => {
                    item.style.transform = 'translateY(-10px)';
                }, 150);
            });
        });
        
        // Add hover effects to profile image
        const profileImage = document.querySelector('.birthday-photo');
        if (profileImage) {
            profileImage.addEventListener('mouseenter', () => {
                profileImage.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            profileImage.addEventListener('mouseleave', () => {
                profileImage.style.transform = 'scale(1.05)';
            });
        }
    }
}

// Add modern animations to CSS
const modernStyles = document.createElement('style');
modernStyles.textContent = `
    @keyframes modernConfettiFall {
        0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkleBurst {
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
`;
document.head.appendChild(modernStyles);

// Initialize countdown when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayCountdown();
    
    // Handle image loading
    const photo = document.querySelector('.birthday-photo');
    if (photo) {
        photo.addEventListener('error', () => {
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                profileImage.innerHTML = '<div class="photo-placeholder">🎂</div>';
            }
        });
    }
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
