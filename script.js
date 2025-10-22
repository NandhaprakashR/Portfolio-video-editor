// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = document.getElementById('toggleIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
        darkModeToggle.classList.add('light-mode');
    }
    
    // Toggle theme on button click
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        
        if (body.classList.contains('light-theme')) {
            // Switch to light mode
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
            darkModeToggle.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
            darkModeToggle.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize skill bars animation
animateSkillBars();

// Parallax effect for geometric shapes
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Work card hover effects
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Client card hover effects
document.querySelectorAll('.client-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});


// Enhanced video controls functionality for all videos
document.addEventListener('DOMContentLoaded', function() {
    const allVideos = document.querySelectorAll('.work-video, .long-video');
    const allPlayPauseBtns = document.querySelectorAll('.play-pause-btn');
    const allMuteBtns = document.querySelectorAll('.mute-btn');
    
    // Initialize video controls for all videos
    allVideos.forEach((video, index) => {
        const playPauseBtn = allPlayPauseBtns[index];
        const muteBtn = allMuteBtns[index];
        
        // Force autoplay with multiple attempts
        function attemptAutoplay() {
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Video autoplay started');
                }).catch(error => {
                    console.log('Autoplay prevented, will retry on user interaction');
                    
                    const retryAutoplay = () => {
                        video.play().then(() => {
                            document.removeEventListener('click', retryAutoplay);
                            document.removeEventListener('touchstart', retryAutoplay);
                        }).catch(() => {
                            // Still failed, keep trying
                        });
                    };
                    
                    document.addEventListener('click', retryAutoplay);
                    document.addEventListener('touchstart', retryAutoplay);
                });
            }
        }
        
        // Update play/pause button icon based on video state
        function updatePlayPauseIcon() {
            if (video.paused) {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        }
        
        // Update mute button icon based on video state
        function updateMuteIcon() {
            if (video.muted) {
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        }
        
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            updatePlayPauseIcon();
        });
        
        // Mute/Unmute functionality
        muteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            video.muted = !video.muted;
            updateMuteIcon();
        });
        
        // Update icons when video state changes
        video.addEventListener('play', updatePlayPauseIcon);
        video.addEventListener('pause', updatePlayPauseIcon);
        video.addEventListener('volumechange', updateMuteIcon);
        
        // Ensure video is always playing when visible
        video.addEventListener('pause', function() {
            if (!video.userPaused) {
                setTimeout(() => {
                    video.play();
                }, 100);
            }
        });
        
        // Track if user manually paused
        playPauseBtn.addEventListener('click', function() {
            video.userPaused = video.paused;
        });
        
        // Initialize icons
        updatePlayPauseIcon();
        updateMuteIcon();
        
        // Start autoplay
        attemptAutoplay();
        
        // Retry autoplay when video becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (video.paused && !video.userPaused) {
                        video.play();
                    }
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video);
        
        // Additional autoplay attempts
        setTimeout(attemptAutoplay, 1000);
        setTimeout(attemptAutoplay, 3000);
    });
});

// Contact item click functionality
document.addEventListener('DOMContentLoaded', function() {
    const clickableContacts = document.querySelectorAll('.clickable-contact');
    
    clickableContacts.forEach(contact => {
        contact.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const value = this.getAttribute('data-value');
            
            if (type === 'phone') {
                // Format phone number for WhatsApp (remove spaces and special characters)
                const phoneNumber = value.replace(/[\s\-\(\)]/g, '');
                const whatsappUrl = `https://wa.me/${phoneNumber}`;
                window.open(whatsappUrl, '_blank');
            } else if (type === 'email') {
                // Open default email client
                const emailUrl = `mailto:${value}`;
                window.location.href = emailUrl;
            }
        });
        
        // Add visual feedback on click
        contact.addEventListener('mousedown', function() {
            this.style.transform = 'translateX(10px) scale(0.98)';
        });
        
        contact.addEventListener('mouseup', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        contact.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Button click animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Portfolio and Contact button functionality
document.addEventListener('DOMContentLoaded', function() {
    // See Portfolio button - scroll to top
    const seePortfolioBtn = document.querySelector('.footer-buttons .btn-primary');
    if (seePortfolioBtn && seePortfolioBtn.textContent.includes('See Portfolio')) {
        seePortfolioBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Contact Now button - open Instagram
    const contactNowBtn = document.querySelector('.footer-buttons .btn-outline');
    if (contactNowBtn && contactNowBtn.textContent.includes('Contact Now')) {
        contactNowBtn.addEventListener('click', function() {
            window.open('https://www.instagram.com/nandha.co?igsh=NHJ6ZTRqbDd3c2wx', '_blank');
        });
    }
    
    // Hire Me button - scroll to contact section
    const hireMeBtn = document.querySelector('.about-buttons .btn-primary');
    if (hireMeBtn && hireMeBtn.textContent.includes('Hire Me')) {
        hireMeBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Download CV button - placeholder for future CV download
    const downloadCVBtn = document.querySelector('.about-buttons .btn-outline');
    if (downloadCVBtn && downloadCVBtn.textContent.includes('Download CV')) {
        downloadCVBtn.addEventListener('click', function() {
            // You can replace this with actual CV download functionality
            alert('CV download feature will be available soon!');
        });
    }
});

// Add ripple effect CSS
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#works">Works</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
    `;
    
    document.body.appendChild(mobileMenuBtn);
    document.body.appendChild(mobileMenu);
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Initialize mobile menu for small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
lazyLoadImages();

// Form validation (if contact form is added)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add form validation styles
const formCSS = `
input.error, textarea.error {
    border-color: #ff4444 !important;
    box-shadow: 0 0 10px rgba(255, 68, 68, 0.3) !important;
}
`;

const formStyle = document.createElement('style');
formStyle.textContent = formCSS;
document.head.appendChild(formStyle);

// Preloader (optional)
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
}

// Initialize preloader
createPreloader();

// Add preloader styles
const preloaderCSS = `
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0D0D0D;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.preloader-content {
    text-align: center;
    color: #00FF88;
}

.preloader-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #1A1A1A;
    border-top: 3px solid #00FF88;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

const preloaderStyle = document.createElement('style');
preloaderStyle.textContent = preloaderCSS;
document.head.appendChild(preloaderStyle);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log('%cWelcome to Nandha Prakash R\'s Portfolio!', 'color: #00FF88; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #FFFFFF; font-size: 14px;');
