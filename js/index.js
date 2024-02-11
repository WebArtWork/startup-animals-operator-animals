let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})
// slaider profiles
const slider = document.querySelector(".slider-profiles");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
const sliderDotsContainer = document.querySelector(".slider-dots");
const scrollSpeed = 1.5;

let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startX = 0;
let offsetX = 0;

slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
    const deltaX = touchEndX - touchStartX;
    if (deltaX > 10) { // Вы можете настроить порог для определения свайпа
        // Свайп вправо (предыдущий слайд)
        slider.scrollBy({ left: -slider.offsetWidth, behavior: "smooth" });
        updateSlider();
    } else if (deltaX < -10) { // Вы можете настроить порог для определения свайпа
        // Свайп влево (следующий слайд)
        slider.scrollBy({ left: slider.offsetWidth, behavior: "smooth" });
        updateSlider();
    }
});

slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    offsetX = 0;
    slider.style.scrollBehavior = "auto";
});

slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    offsetX = currentX - startX;

    // Змініть кількість прокручуваних пікселів
    slider.scrollLeft -= offsetX * scrollSpeed;

    startX = currentX;
});

slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.style.scrollBehavior = "smooth";
    const scrollPos = slider.scrollLeft;
    const currentSlide = Math.round(scrollPos / slider.offsetWidth);
    slider.scroll({ left: currentSlide * slider.offsetWidth, behavior: "smooth" });
    updateSlider();
});

slider.addEventListener("mouseleave", () => {
    if (isDragging) {
        isDragging = false;
        slider.style.scrollBehavior = "smooth";
        const scrollPos = slider.scrollLeft;
        const currentSlide = Math.round(scrollPos / slider.offsetWidth);
        slider.scroll({ left: currentSlide * slider.offsetWidth, behavior: "smooth" });
        updateSlider();
    }
});

const slides = document.querySelectorAll(".slide-profiles");

slides.forEach((slide, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === 0) {
        dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
        slider.scroll({ left: index * slider.offsetWidth, behavior: "smooth" });
        activateDot(index);
    });
    sliderDotsContainer.appendChild(dot);
});

slider.addEventListener("scroll", () => {
    updateSlider();
});

function updateSlider() {
    const scrollPos = slider.scrollLeft;
    const currentSlide = Math.round(scrollPos / slider.offsetWidth);
    activateDot(currentSlide);
}

function activateDot(index) {
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}
