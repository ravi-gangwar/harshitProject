import { SkillsDummyData } from "../constant/SkillsDummyData.js";

const skillsCardParent =
  document.getElementsByClassName("skillsCardSection")[0];

// Define the card HTML as a string
const cardHTML = (item) => {
  return `
    <div class="skillCard">
        <div class="skillCardInnerDiv">
            <h3>${item.domain}</h3>
            ${item.skills
              .map(
                (skill) => `
                <div class="skillsDiv">
                    <div class="skillsNameAndPercentage">
                        <p>${skill.skillName}</p>
                        <p>${skill.proficiency}%</p>
                    </div>
                    <div class="percentageBar">
                        <div class="bar" style="width: ${skill.proficiency}%;"></div>
                    </div>
                </div>
            `
              )
              .join("")}
            </div>
            </div>
            `;
};

const skillsArray = [...SkillsDummyData];

// Render initial data
function renderSkills() {
  skillsCardParent.innerHTML = ""; // Clear existing content
  skillsArray.forEach((item) => {
    skillsCardParent.insertAdjacentHTML("beforeend", cardHTML(item));
  });
}

renderSkills();

// show popup

const addSkillsButton = document.getElementsByClassName("addSkillsBtn")[0];

addSkillsButton.addEventListener("click", () => {
  const popup = document.getElementsByClassName("addSkillsPopup")[0];
  if (popup) {
    popup.style.display = "flex";
  }
});

// Function to handle 'Add Skills' button click
function handleAddSkillsPopup() {
  console.log("hi");
  const newSkills = [];
  let isValid = true;
  let hasValidInput = false;

  // Get all skill and proficiency inputs
  const skillInputs = document.querySelectorAll(
    ".addSkillInputDiv input:nth-of-type(1)"
  );
  const proficiencyInputs = document.querySelectorAll(
    ".addSkillInputDiv input:nth-of-type(2)"
  );

  skillInputs.forEach((skillInput, index) => {
    const skillName = skillInput.value;
    const proficiency = proficiencyInputs[index]?.value;

    console.table([{ skillName, proficiency }]);

    if (skillName && proficiency) {
      const proficiencyValue = parseInt(proficiency, 10);

      if (proficiencyValue < 1 || proficiencyValue > 100) {
        isValid = false;
        alert(
          `Proficiency must be between 1 and 100. Invalid value entered for skill: ${skillName}`
        );
        return; // Exit the loop
      }

      newSkills.push({
        skillName: skillName,
        proficiency: proficiencyValue,
      });
      hasValidInput = true;
    }
  });

  if (!hasValidInput) {
    alert("Please enter at least one valid skill and proficiency.");
  } else if (isValid && newSkills.length > 0) {
    // Create a new domain object with the entered skills
    const newDomain = {
      domain:
        document.querySelector(".domainDiv input").value || "Unknown Domain",
      skills: newSkills,
    };

    // Assuming skillsArray is an array where you want to add this new domain
    skillsArray.push(newDomain); // Add the new domain to skillsArray
    renderSkills(); // Call the render function to update the UI
    // Hide the popup
    const popup = document.getElementsByClassName("addSkillsPopup")[0];
    if (popup) {
      popup.style.display = "none";
    }
  }
}

// Function to handle 'Cancel' button click
function handleCancelPopup() {
  // Clear the input fields
  for (let i = 1; i <= 5; i++) {
    const skillInput = document.getElementById(`skill${i}`);
    const proficiencyInput = document.getElementById(`proficiency${i}`);

    if (skillInput) skillInput.value = "";
    if (proficiencyInput) proficiencyInput.value = "";
  }

  // Hide the popup
  const popup = document.getElementsByClassName("addSkillsPopup")[0];
  if (popup) {
    popup.style.display = "none";
  }
}

// Attach event listeners to buttons
document
  .querySelector(".handleCancelPopup")
  .addEventListener("click", handleCancelPopup);
document
  .querySelector(".handleAddSkillspopup")
  .addEventListener("click", handleAddSkillsPopup);

