AOS.init();

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const resumebtn = document.querySelector('.resume-button');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if(navMenu.classList.contains('active')) {
            resumebtn.style.display = 'none';
        } 
        else {
            resumebtn.style.display = 'block';
        }
    });


    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.querySelector('.progress-bar').style.width = scrollPercent + '%';
    });

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

    const tabButtons = document.querySelectorAll(".skills__tab");
    const skillGroups = document.querySelectorAll(".skills__group");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));

            skillGroups.forEach(group => group.style.display = "none");

            document.getElementById(button.dataset.target).style.display = "block";

            button.classList.add("active");

            AOS.init();
        });
    });

    const projectCards = document.querySelectorAll('.carousel__card');
    const leftBtn = document.querySelector('.carousel__btn--left');
    const rightBtn = document.querySelector('.carousel__btn--right');
    const carousel = document.querySelector('.carousel');
    const carouselBtn = document.querySelector('.carousel__btn');

    let activeIdx = 0;

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