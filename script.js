const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  if (e.target.matches('.next')) {
    slider.append(items[0]);
  } else if (e.target.matches('.prev')) {
    slider.prepend(items[items.length - 1]);
  }
}

document.addEventListener('click', activate, false);

let currentSlide = 0;
const slides = document.querySelectorAll('.item');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

nextButton.addEventListener('click', function() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');

  // Collapse the description when clicking on the navigation buttons
  const description = slides[currentSlide].querySelector('.description');
  description.classList.remove('expanded');
  description.style.maxHeight = null;
});

prevButton.addEventListener('click', function() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');

  // Collapse the description when clicking on the navigation buttons
  const description = slides[currentSlide].querySelector('.description');
  description.classList.remove('expanded');
  description.style.maxHeight = null;
});

const toggleButtons = document.querySelectorAll('.toggle-description');

toggleButtons.forEach(button => {
  button.addEventListener('click', function() {
    expandDescription(this);
  });
});

function expandDescription(event, button) {
  const content = button.parentElement;
  const description = content.querySelector('.description');
  const moreText = button.getAttribute('data-more-text');

  description.classList.toggle('expanded');
  if (description.classList.contains('expanded')) {
    description.style.maxHeight = description.scrollHeight + "px";
    button.textContent = moreText;
    button.setAttribute('data-state', 'expanded');
  } else {
    description.style.maxHeight = null;
    button.textContent = moreText;
    button.removeAttribute('data-state');
  }

  // Collapse the description when the next or prev buttons are clicked
  const navButtons = document.querySelectorAll('.nav .btn');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      description.classList.remove('expanded');
      description.style.maxHeight = null;
      button.textContent = moreText;
      button.removeAttribute('data-state');
    });
  });
}