// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Preloader
    window.addEventListener("load", function() {
        const preloader = document.querySelector(".preloader");
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 500);
    });

    // Smooth scrolling for navigation
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });

    // Function to scroll to a section
    window.scrollToSection = function(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: "smooth"
            });
        }
    };

    // Download resume function
    window.downloadResume = function() {
        // Replace with your actual resume file path
        window.open("https://drive.google.com/file/d/1d48FehYLVTnvKU_y6lTaD5CsCPmol3dI/view?usp=sharing", "_blank");
    };

    // Typing text effect
    const typingText = document.querySelector(".typing-text");
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = "";

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Scroll to top button
    const scrollTopBtn = document.querySelector(".scroll-top");
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    });

    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Theme toggle
    const themeToggle = document.querySelector(".theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    let isDarkMode = true; // Default dark mode

    themeToggle.addEventListener("click", function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.documentElement.style.setProperty('--dark-bg', '#121212');
            document.documentElement.style.setProperty('--darker-bg', '#0a0a0a');
            document.documentElement.style.setProperty('--card-bg', 'rgba(30, 30, 30, 0.5)');
            document.documentElement.style.setProperty('--text', '#f0f0f0');
            document.documentElement.style.setProperty('--text-muted', '#b0b0b0');
            themeIcon.className = "fas fa-moon";
        } else {
            document.documentElement.style.setProperty('--dark-bg', '#f5f5f5');
            document.documentElement.style.setProperty('--darker-bg', '#e5e5e5');
            document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.7)');
            document.documentElement.style.setProperty('--text', '#333333');
            document.documentElement.style.setProperty('--text-muted', '#666666');
            themeIcon.className = "fas fa-sun";
        }
    });

    // Contact form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log("Form submitted:", { name, email, subject, message });
            
            // Show success message
            alert("Thank you for your message! I'll get back to you soon.");
            
            // Reset form
            contactForm.reset();
        });
    }

    // Cursor trail effect
    function createCursorTrail() {
        const trailCount = 10;
        const trailElements = [];
        
        // Create trail elements
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement("div");
            trail.className = "cursor-trail";
            document.body.appendChild(trail);
            trailElements.push({
                element: trail,
                x: 0,
                y: 0,
                delay: i * 2
            });
        }
        
        // Track mouse position
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animate trails
        function animateTrails() {
            trailElements.forEach((trail, index) => {
                // Calculate position with delay
                const dx = mouseX - trail.x;
                const dy = mouseY - trail.y;
                
                trail.x += dx * 0.2;
                trail.y += dy * 0.2;
                
                // Set position and opacity
                trail.element.style.left = `${trail.x}px`;
                trail.element.style.top = `${trail.y}px`;
                trail.element.style.opacity = 1 - (index / trailCount);
            });
            
            requestAnimationFrame(animateTrails);
        }
        
        animateTrails();
    }
    
    // Initialize cursor trail effect
    createCursorTrail();

    // Animation for floating elements
    const floatingElements = document.querySelectorAll('.float');
    floatingElements.forEach(element => {
        element.style.animationDelay = `${Math.random() * 2}s`;
    });

    // Initialize particles background
    initParticlesBackground();
});

// Particles background for hero section
function initParticlesBackground() {
    const bgAnimation = document.querySelector('.bg-animation');
    
    if (!bgAnimation) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    bgAnimation.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Particles array
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY = -particle.speedY;
            }
        });
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0 || portfolioItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize with "all" filter
    filterButtons[0].click();
}

// Initialize portfolio filter
document.addEventListener("DOMContentLoaded", function() {
    initPortfolioFilter();
});

// Skills progress animation
function initSkillsProgress() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const percentage = progressBar.getAttribute('data-progress');
                progressBar.style.width = percentage + '%';
                
                // Add the percentage text
                const percentText = entry.target.querySelector('.percent-text');
                if (percentText) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count++;
                        percentText.textContent = count + '%';
                        if (count >= parseInt(percentage)) {
                            clearInterval(interval);
                        }
                    }, 15);
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize skills progress
document.addEventListener("DOMContentLoaded", function() {
    initSkillsProgress();
});

// Project modal functionality
function initProjectModals() {
    const projectItems = document.querySelectorAll('.portfolio-item');
    const modal = document.querySelector('.project-modal');
    
    if (!modal || projectItems.length === 0) return;
    
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get project data
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');
            const image = item.querySelector('img').getAttribute('src');
            const technologies = item.getAttribute('data-technologies');
            const link = item.getAttribute('data-link');
            
            // Populate modal
            modalContent.querySelector('.modal-title').textContent = title;
            modalContent.querySelector('.modal-description').textContent = description;
            modalContent.querySelector('.modal-image').setAttribute('src', image);
            
            // Set technologies
            const techList = modalContent.querySelector('.modal-technologies');
            techList.innerHTML = '';
            technologies.split(',').forEach(tech => {
                const techItem = document.createElement('span');
                techItem.className = 'tech-tag';
                techItem.textContent = tech.trim();
                techList.appendChild(techItem);
            });
            
            // Set link
            const modalLink = modalContent.querySelector('.modal-link');
            if (link) {
                modalLink.href = link;
                modalLink.style.display = 'inline-block';
            } else {
                modalLink.style.display = 'none';
            }
            
            // Show modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal on click
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize project modals
document.addEventListener("DOMContentLoaded", function() {
    initProjectModals();
});

// Testimonial slider
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (!testimonialSlider) return;
    
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    const prevBtn = testimonialSlider.querySelector('.prev-btn');
    const nextBtn = testimonialSlider.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    // Show current testimonial
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
    }
    
    // Initialize
    showTestimonial(currentIndex);
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Auto slide
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Initialize testimonial slider
// document.addEventListener("DOMContentLo

// Initialize testimonial slider
document.addEventListener("DOMContentLoaded", function() {
    initTestimonialSlider();
});

// Animation for counter numbers
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // ms
                const step = Math.ceil(target / (duration / 15));
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current > target) {
                        counter.textContent = target;
                    } else {
                        counter.textContent = current;
                        setTimeout(updateCounter, 15);
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counters
document.addEventListener("DOMContentLoaded", function() {
    initCounters();
});

// Timeline animation
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize timeline
document.addEventListener("DOMContentLoaded", function() {
    initTimeline();
});

// Blog post preview
function initBlogPreviews() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (blogPosts.length === 0) return;
    
    blogPosts.forEach(post => {
        const readMoreBtn = post.querySelector('.read-more');
        const excerpt = post.querySelector('.post-excerpt');
        const fullContent = post.querySelector('.post-full-content');
        
        if (!readMoreBtn || !excerpt || !fullContent) return;
        
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (excerpt.style.display !== 'none') {
                excerpt.style.display = 'none';
                fullContent.style.display = 'block';
                readMoreBtn.textContent = 'Show Less';
            } else {
                excerpt.style.display = 'block';
                fullContent.style.display = 'none';
                readMoreBtn.textContent = 'Read More';
            }
        });
    });
}

// Initialize blog previews
document.addEventListener("DOMContentLoaded", function() {
    initBlogPreviews();
});

// Project filter tags cloud
function initTagCloud() {
    const tagCloud = document.querySelector('.tag-cloud');
    
    if (!tagCloud) return;
    
    const tags = tagCloud.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        // Random size between 0.8 and 1.4
        const size = 0.8 + Math.random() * 0.6;
        tag.style.fontSize = `${size}em`;
        
        // Random rotation between -10 and 10 degrees
        const rotation = Math.random() * 20 - 10;
        tag.style.transform = `rotate(${rotation}deg)`;
        
        // Filter functionality
        tag.addEventListener('click', () => {
            const filter = tag.getAttribute('data-filter');
            const filterButtons = document.querySelectorAll('.portfolio-filter button');
            
            // Find and click the corresponding filter button
            filterButtons.forEach(button => {
                if (button.getAttribute('data-filter') === filter) {
                    button.click();
                }
            });
        });
    });
}

// Initialize tag cloud
document.addEventListener("DOMContentLoaded", function() {
    initTagCloud();
});

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate="true"]');
    
    if (forms.length === 0) return;
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        // Add validation on submit
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    showError(input, 'This field is required');
                } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid email address');
                } else {
                    clearError(input);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Live validation on blur
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    showError(input, 'This field is required');
                } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
                    showError(input, 'Please enter a valid email address');
                } else {
                    clearError(input);
                }
            });
            
            // Clear error on input
            input.addEventListener('input', function() {
                clearError(input);
            });
        });
    });
    
    // Helper functions
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error');
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        input.classList.remove('error');
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

// Initialize form validation
document.addEventListener("DOMContentLoaded", function() {
    initFormValidation();
});

// Project category statistics
function initProjectStats() {
    const statsContainer = document.querySelector('.project-stats');
    
    if (!statsContainer) return;
    
    // Count projects by category
    const projectItems = document.querySelectorAll('.portfolio-item');
    const stats = {};
    
    projectItems.forEach(item => {
        const categories = item.className.split(' ')
            .filter(cls => cls !== 'portfolio-item')
            .map(cls => cls.replace('category-', ''));
        
        categories.forEach(category => {
            if (!stats[category]) {
                stats[category] = 0;
            }
            stats[category]++;
        });
    });
    
    // Create chart if Chart.js is available
    if (window.Chart && document.getElementById('projectStatsChart')) {
        const ctx = document.getElementById('projectStatsChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(stats),
                datasets: [{
                    data: Object.values(stats),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right'
                }
            }
        });
    }
}

// Initialize project stats
document.addEventListener("DOMContentLoaded", function() {
    initProjectStats();
});

// Lazy loading images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;
    
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
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", function() {
    initLazyLoading();
});

// Initialize mobile navigation menu
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!menuToggle || !mobileNav) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target) && mobileNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu when clicking a nav link
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Initialize mobile navigation
document.addEventListener("DOMContentLoaded", function() {
    initMobileNav();
});

// Initialize AOS animation library if available
function initAOS() {
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
}

// Initialize AOS
document.addEventListener("DOMContentLoaded", function() {
    initAOS();
});