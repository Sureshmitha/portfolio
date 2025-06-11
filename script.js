// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all interactive features
    initializeNavigation();
    initializeSkillBars();
    initializeContactForm();
    initializeScrollAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    const nav = document.querySelector('.nav-container');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Navigation background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.1)';
        }
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
            submitBtn.disabled = true;
            lucide.createIcons();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                showNotification('Message sent successfully! Thank you for reaching out. I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Failed to send message. Please try again or contact me directly via email.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                lucide.createIcons();
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 9999;
        max-width: 400px;
        padding: 1rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #10b981, #059669);' : 'background: linear-gradient(135deg, #ef4444, #dc2626);'}
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .about-grid > *, .skill-category, .project-card, .experience-item, .contact-grid > *');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i data-lucide="chevron-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: linear-gradient(135deg, var(--electric-blue), var(--cyan-accent));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
        z-index: 1000;
    `;
    
    scrollButton.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(20px)';
        }
    });
    
    lucide.createIcons();
});

// Download resume functionality
function downloadResume(event) {
    event.preventDefault();
    
    const link = event.currentTarget;
    const url = link.href;
    const fileName = link.getAttribute('download');
    
    // Show loading state
    const originalContent = link.innerHTML;
    link.innerHTML = '<i data-lucide="loader-2"></i> Downloading...';
    lucide.createIcons();
    
    // Fetch the PDF file
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            // Create a temporary link to trigger download
            const tempLink = document.createElement('a');
            const objectUrl = window.URL.createObjectURL(blob);
            
            tempLink.href = objectUrl;
            tempLink.download = fileName;
            document.body.appendChild(tempLink);
            tempLink.click();
            
            // Cleanup
            window.URL.revokeObjectURL(objectUrl);
            document.body.removeChild(tempLink);
            
            // Show success message
            showNotification('Resume downloaded successfully!', 'success');
        })
        .catch(error => {
            console.error('Download failed:', error);
            showNotification('Failed to download resume. Please try again.', 'error');
        })
        .finally(() => {
            // Reset button state
            link.innerHTML = originalContent;
            lucide.createIcons();
        });
}

// Initialize download functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add other initialization code here if needed
});

// Add hover effects for project cards and other interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const additionalCards = document.querySelectorAll('.additional-card');
    const certCards = document.querySelectorAll('.cert-card');
    
    // Add hover sound effect (optional)
    function addHoverEffect(elements) {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    addHoverEffect(projectCards);
    addHoverEffect(additionalCards);
    addHoverEffect(certCards);
});

// Typing animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    const subtitleElements = document.querySelectorAll('.hero-subtitle span');
    
    subtitleElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.2}s`;
    });
    
    // Add the keyframe animation to the document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Handle image loading
document.addEventListener('DOMContentLoaded', function() {
    // Get all images
    const images = document.querySelectorAll('img');
    
    // Handle each image
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Handle successful load
        img.onload = function() {
            img.classList.remove('loading');
            img.classList.add('loaded');
        };
        
        // Handle load errors
        img.onerror = function() {
            console.error('Error loading image:', img.src);
            img.classList.remove('loading');
            img.classList.add('error');
        };
        
        // Force reload the image
        const currentSrc = img.src;
        img.src = '';
        img.src = currentSrc;
    });
});

// Preload images
window.addEventListener('load', function() {
    const images = [
        'image1.jpg',
        'trading.png',
        'cricket_image.png',
        'image.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.getElementsByTagName('img');
    for(let img of images) {
        img.onerror = function() {
            console.error('Error loading image:', img.src);
            // Optionally set a fallback image
            // img.src = 'fallback.png';
        };
    }
});