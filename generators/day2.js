const day2Form = document.querySelector("#day2-form");
const wishMessageInput = document.querySelector("#wish-message");
const wishDesignSelect = document.querySelector("#wish-design");

day2Form.addEventListener("submit", function (event) {
  event.preventDefault();

  const wishMessage = wishMessageInput.value.trim();
  const wishDesign = wishDesignSelect.value;

  console.log("Wish:", wishMessage);
  console.log("Design:", wishDesign);
});
