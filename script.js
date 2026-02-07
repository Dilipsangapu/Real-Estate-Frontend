// Mobile Menu Toggle
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navButtons.classList.toggle('active');
    });
}

// Smooth Scrolling
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

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Property View Details Buttons
const viewButtons = document.querySelectorAll('.btn-view');
viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Property details page would open here. This would typically navigate to a detailed property page.');
    });
});

// Search Button
const searchButton = document.querySelector('.btn-search');
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const location = document.querySelector('.search-bar input').value;
        alert(`Searching for properties in: ${location || 'all locations'}`);
    });
}

// CTA Buttons
const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Explore Listings Button
const exploreButton = document.querySelector('.btn-explore');
if (exploreButton) {
    exploreButton.addEventListener('click', () => {
        const propertiesSection = document.querySelector('#properties');
        if (propertiesSection) {
            propertiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Category Cards Click
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.querySelector('h3').textContent;
        alert(`Browsing ${category} properties...`);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
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

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.property-card, .benefit-card, .category-card, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// WhatsApp button functionality
const whatsappItems = document.querySelectorAll('.contact-item .fa-whatsapp');
whatsappItems.forEach(item => {
    item.closest('.contact-item').style.cursor = 'pointer';
    item.closest('.contact-item').addEventListener('click', () => {
        window.open('https://wa.me/15559876543', '_blank');
    });
});

console.log('DreamHome Real Estate Website Loaded Successfully!');