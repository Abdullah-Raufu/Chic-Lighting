let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000);
}

function changeSlide(n) {
    slideIndex += n;
    let slides = document.getElementsByClassName("slides");
    if (slideIndex < 1) { slideIndex = slides.length; }
    if (slideIndex > slides.length) { slideIndex = 1; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


function updateTicker() {
    const ticker = document.getElementById("ticker");
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(2);
                const lon = position.coords.longitude.toFixed(2);
                ticker.innerText = `Date: ${date} | Time: ${time} | Location: Latitude ${lat}, Longitude ${lon}`;
            },
            (error) => {
                ticker.innerText = `Date: ${date} | Time: ${time} | Location: Unable to determine location`;
            }
        );
    } else {
        ticker.innerText = `Date: ${date} | Time: ${time} | Location: Geolocation not supported`;
    }
}

setInterval(updateTicker, 1000);
updateTicker();

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector('.gallery');

    // Pause scrolling on hover
    gallery.addEventListener('mouseover', () => {
        gallery.style.animationPlayState = 'paused';
    });

    // Resume scrolling when not hovering
    gallery.addEventListener('mouseout', () => {
        gallery.style.animationPlayState = 'running';
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const toTopBtn = document.getElementById("toTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            toTopBtn.style.display = "block"; 
        } else {
            toTopBtn.style.display = "none"; 
        }
    });

    // Scroll to the top when button is clicked
    toTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", 
        });
    });
});

function toggleNavbar() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
}
