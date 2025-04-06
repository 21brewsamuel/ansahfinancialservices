// DOM Elements
const header = document.getElementById('header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const pageLinks = document.querySelectorAll('[data-page]');
const scrollLinks = document.querySelectorAll('[data-scroll-to]');
const pages = document.querySelectorAll('.page');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

// Current testimonial index
let currentTestimonial = 0;

// Page Navigation
function showPage(pageId) {
  // Hide all pages
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  // Show the selected page
  document.getElementById(pageId).classList.add('active');
  
  // Close mobile menu if open
  navLinks.classList.remove('active');
  
  // Scroll to top when changing pages
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

// Testimonial Slider
function showTestimonial(index) {
  // Hide all testimonials
  testimonialSlides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Remove active class from all dots
  testimonialDots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Show the selected testimonial
  testimonialSlides[index].classList.add('active');
  testimonialDots[index].classList.add('active');
  
  // Update current index
  currentTestimonial = index;
}

function nextTestimonial() {
  let nextIndex = currentTestimonial + 1;
  if (nextIndex >= testimonialSlides.length) {
    nextIndex = 0;
  }
  showTestimonial(nextIndex);
}

function prevTestimonial() {
  let prevIndex = currentTestimonial - 1;
  if (prevIndex < 0) {
    prevIndex = testimonialSlides.length - 1;
  }
  showTestimonial(prevIndex);
}

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Reset interval when manually changing testimonials
function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Event Listeners
window.addEventListener('scroll', () => {
  // Header scroll effect
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Page navigation links
pageLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.getAttribute('data-page');
    showPage(pageId);
  });
});

// Scroll to section links
scrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-scroll-to');
    scrollToSection(sectionId);
  });
});

// Testimonial controls
testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showTestimonial(index);
    resetTestimonialInterval();
  });
});

testimonialPrev.addEventListener('click', () => {
  prevTestimonial();
  resetTestimonialInterval();
});

testimonialNext.addEventListener('click', () => {
  nextTestimonial();
  resetTestimonialInterval();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') && 
      !e.target.closest('nav') && 
      !e.target.closest('.mobile-menu-toggle')) {
    navLinks.classList.remove('active');
  }
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // You can add custom validation here if needed
    // This is just a placeholder for future validation logic
    
    // Example: Show success message
    // e.preventDefault();
    // alert('Form submitted successfully! We will contact you soon.');
  });
}

// Initialize the page based on URL hash if present
document.addEventListener('DOMContentLoaded', () => {
  // Check if URL has a hash and navigate to that section
  if (window.location.hash) {
    const sectionId = window.location.hash.substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 500);
    }
  }

  // Handle navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // If it's a section link (not just "#")
      if(this.getAttribute('href') !== "#") {
        e.preventDefault();
        
        // If it has data-page attribute, handle page navigation
        const dataPage = this.getAttribute('data-page');
        if(dataPage) {
          // If it's a page navigation link
          const pages = document.querySelectorAll('.page');
          pages.forEach(page => {
            page.classList.remove('active');
          });
          document.getElementById(dataPage).classList.add('active');
          window.scrollTo(0, 0);
        } else {
          // If it's just a section link, scroll to that section
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if(targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }
    });
  });
}); 