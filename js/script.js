/**
 * La Marquise - Facility Management
 * Main JavaScript File
 */

// ========================================
// Hero Slideshow
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('heroSection');

    if (heroSection) {
        const slides = heroSection.querySelectorAll('.hero-slide');
        let currentSlide = 0;

        function nextSlide() {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');

            // Move to next slide (loop back to 0 if at end)
            currentSlide = (currentSlide + 1) % slides.length;

            // Add active class to new current slide
            slides[currentSlide].classList.add('active');
        }

        // Change slide every 4 seconds
        setInterval(nextSlide, 4000);
    }
});

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

    // ========================================
    // Services Dropdown Toggle
    // ========================================

    const servicesToggle = document.querySelector('.services-toggle');
    const navItemDropdown = document.querySelector('.nav-item-dropdown');

    if (servicesToggle && navItemDropdown) {
        // Show dropdown on hover only, allow click to navigate
        navItemDropdown.addEventListener('mouseenter', function() {
            navItemDropdown.classList.add('active');
        });

        navItemDropdown.addEventListener('mouseleave', function() {
            navItemDropdown.classList.remove('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!navItemDropdown.contains(event.target)) {
                navItemDropdown.classList.remove('active');
            }
        });

        // Close dropdown when a service is selected
        const dropdownLinks = navItemDropdown.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                navItemDropdown.classList.remove('active');
            });
        });
    }

    // ========================================
    // Footer Services Link Handler
    // ========================================

    // Footer services links now navigate to services.html
    // No special handling needed - let them work normally

    // Check if page loaded with #services hash
    if (window.location.hash === '#services') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            if (navItemDropdown) {
                navItemDropdown.classList.add('active');
            }
        }, 300);
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

// ========================================
// Carousel System - Reusable Module
// ========================================
/**
 * makeCarousel - Creates a single-item carousel with left/right navigation
 * @param {HTMLElement} rootEl - The carousel container element
 * @param {Array} items - Array of data items to display
 * @param {Function} renderSlide - Function that renders each slide's HTML
 *
 * Usage:
 * makeCarousel(
 *   document.getElementById('myCarousel'),
 *   [{name: 'Item 1'}, {name: 'Item 2'}],
 *   (item) => `<div>${item.name}</div>`
 * );
 */
function makeCarousel(rootEl, items, renderSlide) {
    console.log('makeCarousel called with:', { rootEl, itemCount: items?.length });

    if (!rootEl || !items || items.length === 0) {
        console.error('Invalid carousel parameters', { rootEl, items });
        return;
    }

    const track = rootEl.querySelector('.track');
    const prevBtn = rootEl.querySelector('.arrow.prev');
    const nextBtn = rootEl.querySelector('.arrow.next');

    console.log('Carousel elements found:', { track, prevBtn, nextBtn });

    if (!track) {
        console.error('Track element not found in', rootEl);
        return;
    }

    let currentIndex = 0;

    // Initialize: render all slides
    function init() {
        console.log('Initializing carousel with', items.length, 'items');
        track.innerHTML = '';
        items.forEach((item, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide';
            const html = renderSlide(item);
            console.log(`Slide ${index} HTML:`, html);
            slideDiv.innerHTML = html;
            track.appendChild(slideDiv);
        });
        console.log('Slides created, calling render()');
        render();
    }

    // Render current state
    function render() {
        const slides = track.querySelectorAll('.slide');
        const total = slides.length;

        console.log(`Rendering: ${total} slides, currentIndex=${currentIndex}`);

        slides.forEach((slide, i) => {
            // Calculate relative position
            const prevIndex = (currentIndex - 1 + total) % total;

            if (i === currentIndex) {
                // Active slide: center, fully visible
                slide.style.transform = 'translateX(0%)';
                slide.style.opacity = '1';
                slide.style.zIndex = '2';
                console.log(`Slide ${i}: ACTIVE (center, opacity 1)`);
            } else if (i === prevIndex) {
                // Previous slide: to the left, faded
                slide.style.transform = 'translateX(-100%)';
                slide.style.opacity = '0.35';
                slide.style.zIndex = '1';
                console.log(`Slide ${i}: PREVIOUS (left, opacity 0.35)`);
            } else {
                // All others: off to the right, hidden
                slide.style.transform = 'translateX(100%)';
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
                console.log(`Slide ${i}: HIDDEN (right, opacity 0)`);
            }
        });
    }

    // Navigate to next item
    function next() {
        currentIndex = (currentIndex + 1) % items.length;
        render();
    }

    // Navigate to previous item
    function prev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        render();
    }

    // Attach event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prev();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            next();
        });
    }

    // Keyboard navigation
    rootEl.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            next();
        }
    });

    // Make carousel focusable for keyboard nav
    rootEl.setAttribute('tabindex', '0');

    init();

    return { next, prev, goto: (index) => { currentIndex = index; render(); } };
}

// ========================================
// Initialize Carousels on Page Load
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CAROUSEL DOMContentLoaded FIRED!');
    console.log('Current URL:', window.location.href);
    console.log('DOM ready state:', document.readyState);

    // Data: Why La Marquise points
    const whyPoints = [
        { number: '01', title: 'Excellence & Pride', text: 'We take pride in delivering exceptional service that reflects the prestige of your facility.' },
        { number: '02', title: 'Trust & Reliability', text: 'Consistent, dependable service backed by rigorous quality control and professional expertise.' },
        { number: '03', title: 'Safety & Assurance', text: 'Certified processes and trained personnel ensuring the highest safety and security standards.' },
        { number: '04', title: 'Peace of Mind', text: 'Dedicated account management and 24/7 support for complete confidence in your facility operations.' }
    ];

    // Data: Companies
    const companies = [
        { name: 'La Marquise Facilities Management', img: 'images/LM Facilities.png' },
        { name: 'La Marquise Properties Management', img: 'images/LM Properties.png' },
        { name: 'Al Dahan Al Masi General Maintenance', img: 'images/Dahan_no_bg.png' },
        { name: 'Haven House General Contracting', img: 'images/HH Vertical_no_bg.png' },
        { name: 'Off White Interior Design', img: 'images/Off White.jpeg' },
        { name: 'ZEE Production House Real Estate Consultancy', img: 'images/ZEE_no_bg.png' }
    ];

    // Data: Services
    const services = [
        { title: 'Facilities Management', description: 'Comprehensive facility operations and maintenance for residential, commercial, and industrial properties.', link: 'service-facilities.html' },
        { title: 'Properties Management', description: 'Expert property portfolio management, leasing, and tenant relations services.', link: 'service-properties.html' },
        { title: 'Corporate Management', description: 'Strategic supervision and coordination of group operations across all subsidiaries.', link: 'service-corporate.html' },
        { title: 'Real Estate Consultancy', description: 'Feasibility studies, investment advisory, and development strategies aligned with market trends.', link: 'service-consultancy.html' },
        { title: 'Interior Design', description: 'Modern residential and commercial interior design with meticulous attention to detail.', link: 'service-interior.html' },
        { title: 'Landscaping', description: 'Professional landscaping and garden maintenance services for pristine outdoor spaces.', link: 'service-landscaping.html' },
        { title: 'Cleaning Services', description: 'Integrated building and facility cleaning using advanced technologies and eco-friendly materials.', link: 'service-cleaning.html' },
        { title: 'Swimming Pool Management', description: 'Complete pool operation, maintenance, and water quality management services.', link: 'service-pool.html' },
        { title: 'Maintenance Services', description: 'Full-scale maintenance solutions including scheduled and emergency repairs, renovations, and technical support.', link: 'service-maintenance.html' }
    ];

    // Render function for Why carousel
    function renderWhySlide(item) {
        return `
            <div class="why-number">${item.number}</div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        `;
    }

    // Render function for Companies carousel
    function renderCompanySlide(item) {
        return `
            <div class="company-logo-box">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <h3>${item.name}</h3>
        `;
    }

    // Render function for Services carousel
    function renderServiceSlide(item) {
        return `
            <div class="service-slide">
                <a href="${item.link}" class="service-slide-title-link">
                    <h3 class="service-slide-title">${item.title}</h3>
                </a>
                <p class="service-slide-description">${item.description}</p>
            </div>
        `;
    }

    // Initialize all carousels
    console.log('=== INITIALIZING CAROUSELS ===');

    const whyCarousel = document.getElementById('whyCarousel');
    console.log('Why carousel element:', whyCarousel);
    if (whyCarousel) {
        console.log('Creating Why carousel with', whyPoints.length, 'points');
        makeCarousel(whyCarousel, whyPoints, renderWhySlide);
    } else {
        console.error('whyCarousel element not found!');
    }

    const companiesCarousel = document.getElementById('companiesCarousel');
    console.log('Companies carousel element:', companiesCarousel);
    if (companiesCarousel) {
        console.log('Creating Companies carousel with', companies.length, 'companies');
        makeCarousel(companiesCarousel, companies, renderCompanySlide);
    } else {
        console.error('companiesCarousel element not found!');
    }

    const servicesCarousel = document.getElementById('servicesCarousel');
    console.log('Services carousel element:', servicesCarousel);
    if (servicesCarousel) {
        console.log('Creating Services carousel with', services.length, 'services');
        makeCarousel(servicesCarousel, services, renderServiceSlide);
    } else {
        console.error('servicesCarousel element not found!');
    }

    console.log('=== CAROUSEL INITIALIZATION COMPLETE ===');
});

// ========================================
// Services Page Expandable List
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-expandable-item');

    serviceItems.forEach(item => {
        const header = item.querySelector('.service-expandable-header');
        const toggle = item.querySelector('.service-expand-toggle');

        if (header && toggle) {
            header.addEventListener('click', function(e) {
                e.preventDefault();

                // Close other open items
                serviceItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });

            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });

            header.setAttribute('tabindex', '0');
        }
    });
});

// ========================================
// Job Listings Toggle (Careers Page)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const jobItems = document.querySelectorAll('.job-item');

    jobItems.forEach(item => {
        const header = item.querySelector('.job-header');
        const toggle = item.querySelector('.job-toggle');

        if (header && toggle) {
            // Add click handler to entire header
            header.addEventListener('click', function(e) {
                e.preventDefault();

                // Close other open items
                jobItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });

            // Keyboard accessibility
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });

            // Make header focusable
            header.setAttribute('tabindex', '0');
        }
    });
});
