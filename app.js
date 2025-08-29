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
tabButtons.forEach(button => {
    const skillGroups = document.querySelectorAll(".skills__group");
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));

        skillGroups.forEach(group => group.style.display = "none");

        document.getElementById(button.dataset.target).style.display = "flex";

        button.classList.add("active");
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


// Contact Modal
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

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        closeModalFn();
    }
});

// Contact Form Submission
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
    
    // Get form data
    const formData = new FormData(contactForm);
    
    try {
        // Check if FormSpree endpoint is configured
        const formAction = contactForm.getAttribute('action');
        
        // Submit to FormSpree or other service
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
            
            // Close modal after 3 seconds
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