// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const loadingPercentage = document.getElementById('loadingPercentage');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        progress = Math.min(progress, 100);
        
        loadingBarFill.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                mainContent.classList.add('show');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Initialize URL routing after loading screen is done
                    initializeRouting();
                }, 800);
            }, 800);
        }
    }, 100);

    setTimeout(() => {
        if (progress < 100) {
            progress = 100;
            loadingBarFill.style.width = '100%';
            loadingPercentage.textContent = '100%';
        }
    }, 2000);
});

// URL Routing System
function initializeRouting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__menu a[href^="#"]');
    
    // Function to update URL and navigate to section
    function navigateToSection(sectionId) {
        // Update URL without page reload
        if (sectionId && sectionId !== 'home') {
            window.history.pushState(null, null, `#${sectionId}`);
        } else {
            // For home section, remove hash
            window.history.pushState(null, null, window.location.pathname);
        }
        
        // DON'T update active navigation here - let the scroll handler do it
        // This allows intermediate sections to highlight during scroll
        
        // Scroll to section smoothly
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Function to update active navigation link
    function updateActiveNavigation(currentSection) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('href').substring(1);
            if (linkSection === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to get current section based on scroll position
    function getCurrentSection() {
        let currentSection = 'home';
        const scrollPosition = window.scrollY + window.innerHeight / 3; // More responsive detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        return currentSection;
    }
    
    // Handle scroll events to update URL
    let lastSection = 'home';
    window.addEventListener('scroll', () => {
        const currentSection = getCurrentSection();
        
        // Update immediately if section changed (no timeout)
        if (currentSection !== lastSection) {
            lastSection = currentSection;
            
            // Update URL smoothly
            if (currentSection === 'home') {
                window.history.replaceState(null, null, window.location.pathname);
            } else {
                window.history.replaceState(null, null, `#${currentSection}`);
            }
            updateActiveNavigation(currentSection);
        }
    });
    
    // Handle direct URL navigation (when someone visits yoursite.com/#skills)
    function handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            // Delay to ensure page is fully loaded
            setTimeout(() => {
                navigateToSection(hash);
            }, 100);
        } else {
            // Default to home section
            updateActiveNavigation('home');
        }
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'home';
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            updateActiveNavigation(hash);
        }
    });
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            navigateToSection(sectionId);
        });
    });
    
    // Initialize routing
    handleInitialHash();
}

function initializeWebsite() {
    AOS.init();
}

setTimeout(initializeWebsite, 3000);

AOS.init();

// Hamburger
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
    const navMenu = document.getElementById('navMenu');
    const resumebtn = document.querySelector('.resume-button');
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
        resumebtn.style.display = 'none';
    }
    else {
        resumebtn.style.display = 'block';
    }
});


// Scroll
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});


// Typed
var typed = new Typed('#typed', {
    strings: ['Coder.', 'Developer.', 'Techie.', 'Engineer.', 'Designer.', 'Creator.', 'Gamer.'],
    typeSpeed: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
    backSpeed: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
    loop: true,
    backDelay: 1000,
    startDelay: 1100,
    onComplete: (self) => {
        self.startDelay = 0;
    }
});


// Skills
const tabButtons = document.querySelectorAll(".skills__tab");

function randomizeAllSkills() {
    const allSkillsSection = document.getElementById('allSection');
    const skillItems = Array.from(allSkillsSection.children);
    
    for (let i = skillItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [skillItems[i], skillItems[j]] = [skillItems[j], skillItems[i]];
    }
    allSkillsSection.innerHTML = '';
    skillItems.forEach(item => allSkillsSection.appendChild(item));
}

document.addEventListener('DOMContentLoaded', () => {
    randomizeAllSkills();
});

tabButtons.forEach(button => {
    const skillGroups = document.querySelectorAll(".skills__group");
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));

        skillGroups.forEach(group => group.style.display = "none");

        document.getElementById(button.dataset.target).style.display = "flex";

        button.classList.add("active");
        
        if (button.dataset.target === 'allSection') {
            randomizeAllSkills();
        }
    });
});


// Carousel
let activeIdx = 0;
const projectCards = document.querySelectorAll('.carousel__card');
const leftBtn = document.querySelector('.carousel__btn--left');
const rightBtn = document.querySelector('.carousel__btn--right');
const carousel = document.querySelector('.carousel');
const carouselBtn = document.querySelector('.carousel__btn');

function updateProjectCarousel() {
    projectCards.forEach((card, idx) => {
        card.classList.remove('carousel__card--left', 'carousel__card--active', 'carousel__card--right');
    });

    const total = projectCards.length;
    const leftIdx = (activeIdx - 1 + total) % total;
    const rightIdx = (activeIdx + 1) % total;

    projectCards[leftIdx].classList.add('carousel__card--left');
    projectCards[activeIdx].classList.add('carousel__card--active');
    projectCards[rightIdx].classList.add('carousel__card--right');
}

leftBtn.addEventListener('click', () => {
    activeIdx = (activeIdx - 1 + projectCards.length) % projectCards.length;
    updateProjectCarousel();
});

rightBtn.addEventListener('click', () => {
    activeIdx = (activeIdx + 1) % projectCards.length;
    updateProjectCarousel();
});

let autoRotateInterval = setInterval(() => {
    activeIdx = (activeIdx + 1) % projectCards.length;
    updateProjectCarousel();
}, 3000);

function pauseAutoRotate() {
    clearInterval(autoRotateInterval);
}

function resumeAutoRotate() {
    autoRotateInterval = setInterval(() => {
        activeIdx = (activeIdx + 1) % projectCards.length;
        updateProjectCarousel();
    }, 3000);
}

carousel.addEventListener('mouseenter', pauseAutoRotate);
carousel.addEventListener('mouseleave', resumeAutoRotate);
carouselBtn.addEventListener('mouseenter', pauseAutoRotate);
carouselBtn.addEventListener('mouseleave', resumeAutoRotate);
updateProjectCarousel();


// CF API
fetch("https://codeforces.com/api/user.info?handles=Vaibhavv1703")
    .then(res => res.json())
    .then(data => {
        const cf_curr = data.result[0].rating;
        const cf_max = data.result[0].maxRating;

        console.log(`Codeforces: ${cf_curr} (Max: ${cf_max})`);

        let rating = document.querySelector(".CF_rating");
        rating.innerText = `Max Rating: ${cf_max}`
    });

// LC API
fetch("https://alfa-leetcode-api.onrender.com/Vaibhavv_1703/contest")
    .then(res => res.json())
    .then(data => {
        const lc_curr = Math.round(data.contestRating);
        const lc_max = data.contestParticipation.reduce((max, contest) => {
            return Math.round(contest.rating > max ? contest.rating : max);
        }, 0);

        console.log(`Leetcode: ${lc_curr} (Max: ${lc_max})`);

        let rating = document.querySelector(".LC_rating");
        rating.innerText = `Max Rating: ${lc_max}`
    })
    .catch(err => console.error("LeetCode API error:", err));


const contactModalBtn = document.getElementById('contactModalBtn');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const modalOverlay = document.querySelector('.modal__overlay');

function openModal() {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFn() {
    contactModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

contactModalBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFn);
modalOverlay.addEventListener('click', closeModalFn);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        closeModalFn();
    }
});

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form__status ${type} show`;
    
    setTimeout(() => {
        formStatus.classList.remove('show');
    }, 5000);
}

function setLoadingState(loading) {
    if (loading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    }
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    setLoadingState(true);
    showStatus('Sending your message...', 'loading');
    
    const formData = new FormData(contactForm);
    
    try {
        const formAction = contactForm.getAttribute('action');
        
        const response = await fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
            contactForm.reset();
            
            setTimeout(() => {
                closeModalFn();
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showStatus('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
    } finally {
        setLoadingState(false);
    }
});