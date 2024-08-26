import { projects } from "../constant/ProjectsData.js";
import { swiperCardData } from "../constant/SwiperCardData.js";

// Get the parent div where you want to insert the cards
const projectListingDiv =
  document.getElementsByClassName("projects-listing")[0];

// Define the card HTML as a string
const cardHTML = (item, i) => {


  return `
      <div class="card">
        <img
          class="upCardArea"
          src="../assests/ProjectsImages/Image${i+1}.png"
          alt=""
        />
        <div class="downCardArea">
          <h4>${item.heading}</h4>
          <p>
            ${item.description}
          </p>
          <!-- techStacks -->
          <div class="techStacks">
            ${
              item.techStack
                .map((tech, index) => {
                  return `<div class="techStack-badge">${tech}</div>`;
                })
                .join("") // join the array of strings into a single string
            }
          </div>
        </div>
      </div>
    `;
};

// Insert each card into the parent div
for (let i = 0; i < projects.length; i++) {
  projectListingDiv.insertAdjacentHTML("beforeend", cardHTML(projects[i], i));
}


const swiperSlidesDiv = document.getElementsByClassName("swiper-wrapper")[0];

// Define the card HTML as a string
const swiperCard = (item, i) => {
  return `
    <div class="swiper-slide">
      <img class="rating_images" src="../assests/RecommandationsImg/Rating.png" alt="Rating">
      <h3>${item.heading}</h3>
      <p class="p-swiperSlider">${item.description}</p>
      <div class="profile-dec">
        <img src="../assests/RecommandationsImg/Profile${(i+1) % 3 === 0 ? 3 : (i+1) % 3}.png" alt="">
        <div >
          <h3>${item.name}</h3>
          <p>${item.role}</p>
        </div>
      </div>
    </div>
  `;
};

// Insert each card into the parent div
for (let i = 0; i < swiperCardData.length; i++) {
  swiperSlidesDiv.insertAdjacentHTML(
    "beforeend",
    swiperCard(swiperCardData[i], i)
  );
}



// Initialize Swiper after adding slides
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 5,
  spaceBetween: 20,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
  },
});
