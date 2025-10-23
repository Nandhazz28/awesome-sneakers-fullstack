AOS.init({ duration: 800, once: true, offset: 50 });

const sliderImages = [
  "imagefolder/featured-image/download(1).png",
  "imagefolder/featured-image/download(3).png",
  "imagefolder/featured-image/download(4).png",
  "imagefolder/featured-image/download(5).png",
  "imagefolder/featured-image/download(6).png",
];

let currentIndex = 0;
const sliderImg = document.getElementById("sliderImg");

function showSlide(index) {
  sliderImg.src = sliderImages[index];
  sliderImg.classList.add("fade");
  setTimeout(() => sliderImg.classList.remove("fade"), 300);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % sliderImages.length;
  showSlide(currentIndex);
}

function prevslide() {
  currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
  showSlide(currentIndex);
}

const style = document.createElement("style");
style.innerHTML = `
  .fade {
    opacity: 0.4;
    transition: opacity 0.3s ease-in-out;
  }
`;
document.head.appendChild(style);
