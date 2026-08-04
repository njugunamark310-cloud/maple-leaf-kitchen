 const slider = document.querySelector('.testimonial-slider');
const cards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function showSlide(i) {
  slider.style.transform = `translateX(-${i * 100}%)`;
}

// Next button
nextBtn.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  showSlide(index);
});

// Previous button
prevBtn.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  showSlide(index);
});

// Auto slide every 5 seconds
setInterval(() => {
  index = (index + 1) % cards.length;
  showSlide(index);
}, 5000);
