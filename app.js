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

        document.getElementById(button.dataset.target).style.display = "block";

        button.classList.add("active");

        AOS.init();
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