const day2Form = document.querySelector("#day2-form");
const wishMessageInput = document.querySelector("#wish-message");
const wishDesignSelect = document.querySelector("#wish-design");

const wishCreationSection = document.querySelector(
  "#wish-creation-section"
);

const wishCanvas = document.querySelector("#wish-canvas");
const downloadWishButton = document.querySelector("#download-wish");
const copyWishHashtagsButton = document.querySelector(
  "#copy-wish-hashtags"
);
const backToWishFormButton = document.querySelector(
  "#back-to-wish-form"
);
const wishCopyStatus = document.querySelector("#wish-copy-status");

const wishCanvasContext = wishCanvas.getContext("2d");

const wishHashtags = [
  "#HAN",
  "#HAN_DAY",
  "#HAN_GLOBAL",
  "#StrayKids",
  "#HappyHANDay"
];

function drawWishCard(wishMessage, wishDesign) {
  wishCanvas.width = 1200;
  wishCanvas.height = 1500;

  const ctx = wishCanvasContext;

  if (wishDesign === "classic") {
  ctx.fillStyle = "#fff9d9";
} else if (wishDesign === "shining") {
  ctx.fillStyle = "#f8e99b";
} else {
  ctx.fillStyle = "#111111";
  }

  ctx.fillRect(0, 0, wishCanvas.width, wishCanvas.height);

  ctx.fillStyle = wishDesign === "shooting" ? "#ffffff" : "#111111";
  ctx.textAlign = "left";

  ctx.font = "500 42px Inter, sans-serif";
  ctx.fillText("HAN GLOBAL", 90, 120);

  ctx.font = "500 82px 'Bodoni Moda', serif";
  ctx.fillText("MAKE A", 90, 280);
  ctx.fillText("WISH FOR HAN", 90, 380);

  ctx.textAlign = "center";

  ctx.font = "100px serif";
  ctx.fillText("★", 600, 650);

  ctx.font = "400 42px Inter, sans-serif";
  ctx.fillText("My wish for HAN", 600, 820);

  ctx.font = "400 38px Inter, sans-serif";

  const words = wishMessage.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach(function (word) {
    const testLine = `${currentLine} ${word}`.trim();

    if (ctx.measureText(testLine).width > 900) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  lines.forEach(function (line, index) {
    ctx.fillText(line, 600, 950 + index * 58);
  });

  ctx.font = "400 28px Inter, sans-serif";
  ctx.fillText("A wish sent with love", 600, 1320);

  ctx.textAlign = "left";
  ctx.font = "400 26px Inter, sans-serif";
  ctx.fillText("#HAN_DAY  #HappyHANDay", 90, 1410);
}

day2Form.addEventListener("submit", function (event) {
  event.preventDefault();

  const wishMessage = wishMessageInput.value.trim();
  const wishDesign = wishDesignSelect.value;

  drawWishCard(wishMessage, wishDesign);

  day2Form.closest("section").hidden = true;
  wishCreationSection.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

downloadWishButton.addEventListener("click", function () {
  const link = document.createElement("a");

  link.download = "han-day-wish-card.png";
  link.href = wishCanvas.toDataURL("image/png");
  link.click();
});

copyWishHashtagsButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(wishHashtags.join(" "));

    wishCopyStatus.textContent = "Copied!";
  } catch (error) {
    wishCopyStatus.textContent = "Copy failed";
  }
});

backToWishFormButton.addEventListener("click", function () {
  wishCreationSection.hidden = true;
  day2Form.closest("section").hidden = false;
});
