/**
 * Le Marquise - Facility Management
 * Main JavaScript File
 */

// ========================================
// Mobile Menu Toggle
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ========================================
// Navbar Scroll Effect
// ========================================

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ========================================
// Intersection Observer for Reveal Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with the 'reveal' class
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });
});

// ========================================
// Contact Form Validation and Submission
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Clear previous errors
            clearErrors();

            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            // Validate First Name
            if (firstName === '') {
                showError('firstNameError', 'First name is required');
                isValid = false;
            }

            // Validate Last Name
            if (lastName === '') {
                showError('lastNameError', 'Last name is required');
                isValid = false;
            }

            // Validate Email
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate Service Selection
            if (service === '') {
                showError('serviceError', 'Please select a service');
                isValid = false;
            }

            // Validate Message
            if (message === '') {
                showError('messageError', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                isValid = false;
            }

            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would send the data to a server here
                console.log('Form submitted:', {
                    firstName,
                    lastName,
                    email,
                    phone,
                    service,
                    message
                });

                // Show success message
                const successMessage = document.getElementById('formSuccess');
                if (successMessage) {
                    successMessage.classList.add('visible');
                }

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.remove('visible');
                }, 5000);
            }
        });

        // Real-time validation on blur
        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            // Remove error styling on input
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement) {
                    errorElement.classList.remove('visible');
                }
            });
        });
    }
});

// Helper function to show errors
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('visible');

        // Add error class to input
        const inputId = elementId.replace('Error', '');
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
}

// Helper function to clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.classList.remove('visible');
    });

    const inputElements = document.querySelectorAll('.form-input');
    inputElements.forEach(element => {
        element.classList.remove('error');
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    let isValid = true;

    switch(fieldId) {
        case 'firstName':
            if (value === '') {
                showError('firstNameError', 'First name is required');
                isValid = false;
            }
            break;

        case 'lastName':
            if (value === '') {
                showError('lastNameError', 'Last name is required');
                isValid = false;
            }
            break;

        case 'email':
            if (value === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(value)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            break;

        case 'service':
            if (value === '') {
                showError('serviceError', 'Please select a service');
                isValid = false;
            }
            break;

        case 'message':
            if (value === '') {
                showError('messageError', 'Message is required');
                isValid = false;
            } else if (value.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            break;
    }

    return isValid;
}

// ========================================
// Smooth Scrolling for Anchor Links
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            // Only handle if it's a valid anchor (not just "#")
            if (href !== '#' && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    event.preventDefault();

                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ========================================
// Active Nav Link Based on Scroll Position
// ========================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Performance: Lazy Loading for Images
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ========================================
// Accessibility: Focus Management
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add skip to main content link functionality
    const skipLink = document.querySelector('a[href="#main-content"]');
    if (skipLink) {
        skipLink.addEventListener('click', function(event) {
            event.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.tabIndex = -1;
                mainContent.focus();
            }
        });
    }

    // Trap focus in mobile menu when open
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.focus();
            }
        });
    }
});
