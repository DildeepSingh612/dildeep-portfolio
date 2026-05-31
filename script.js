const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const topBtn = document.getElementById("topBtn");
const typingText = document.getElementById("typingText");
const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

const typingWords = [
    "Web Developer",
    "Computing Student",
    "Future AI Engineer",
    "Software Learner",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = typingWords[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1400;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;

        if (wordIndex === typingWords.length) {
            wordIndex = 0;
        }

        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }

    revealElements();
    startCounters();
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

function revealElements() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(item => {
        const windowHeight = window.innerHeight;
        const elementTop = item.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            item.classList.add("active");
        }
    });
}

revealElements();

let counterStarted = false;

function startCounters() {
    const statsSection = document.querySelector(".stats");

    if (!statsSection) {
        return;
    }

    const sectionTop = statsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight && !counterStarted) {
        const counters = document.querySelectorAll(".counter");

        counters.forEach(counter => {
            const target = Number(counter.getAttribute("data-target"));
            let count = 0;
            const increment = target / 80;

            function updateCounter() {
                count += increment;

                if (count < target) {
                    counter.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            updateCounter();
        });

        counterStarted = true;
    }
}

startCounters();

document.addEventListener("mousemove", e => {
    if (cursor && cursorDot) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";
    }
});

document.querySelectorAll("a, button, .skill-card, .project-card").forEach(item => {
    item.addEventListener("mouseenter", () => {
        if (cursor) {
            cursor.style.transform = "translate(-50%, -50%) scale(1.7)";
            cursor.style.background = "rgba(0, 224, 255, 0.08)";
        }
    });

    item.addEventListener("mouseleave", () => {
        if (cursor) {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
            cursor.style.background = "transparent";
        }
    });
});

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 18;
        const rotateY = (centerX - x) / 18;

        card.style.transform = `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
    });
});

document.querySelectorAll(".magnetic").forEach(button => {
    button.addEventListener("mousemove", e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)";
    });
});