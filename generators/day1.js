const day1Form = document.querySelector("#day1-form");
const songTitleInput = document.querySelector("#song-title");
const artistNameInput = document.querySelector("#artist-name");
const songMessageInput = document.querySelector("#song-message");
const designSelect = document.querySelector("#song-design");

const creationSection = document.querySelector("#creation-section");
const songCanvas = document.querySelector("#song-canvas");
const downloadSongButton = document.querySelector("#download-song");
const copyHashtagsButton = document.querySelector("#copy-hashtags");
const backToFormButton = document.querySelector("#back-to-form");
const copyStatus = document.querySelector("#copy-status");

const canvasContext = songCanvas.getContext("2d");

const hashtags = [
  "#HAN",
  "#HAN_DAY",
  "#HAN_GLOBAL",
  "#StrayKids",
  "#HappyHANDay"
];

function drawSongCard() {
  const songTitle = songTitleInput.value.trim();
  const artistName = artistNameInput.value.trim();
  const message = songMessageInput.value.trim();
  const design = designSelect.value;

  const width = 1200;
  const height = 1500;

  songCanvas.width = width;
  songCanvas.height = height;

  canvasContext.clearRect(0, 0, width, height);

  if (design === "yellow") {
    canvasContext.fillStyle = "#f8e99b";
  } else if (design === "black") {
    canvasContext.fillStyle = "#111111";
  } else {
    canvasContext.fillStyle = "#fff9d9";
  }

  canvasContext.fillRect(0, 0, width, height);

  canvasContext.fillStyle = design === "black"
    ? "#f8e99b"
    : "#111111";

  canvasContext.font = "600 34px Inter, sans-serif";
  canvasContext.fillText("HAN GLOBAL", 90, 105);

  canvasContext.font = "500 150px 'Bodoni Moda', serif";
  canvasContext.fillText("A SONG", 90, 350);
  canvasContext.fillText("FOR HAN", 90, 500);

  canvasContext.font = "500 34px Inter, sans-serif";
  canvasContext.fillText("My birthday dedication", 90, 610);

  canvasContext.font = "500 72px 'Bodoni Moda', serif";
  canvasContext.fillText(songTitle, 90, 850);

  canvasContext.font = "400 34px Inter, sans-serif";
  canvasContext.fillText(`by ${artistName}`, 90, 920);

  if (message) {
    canvasContext.font = "400 34px Inter, sans-serif";

    const words = message.split(" ");
    let line = "";
    let lineY = 1080;
    const maxWidth = 950;

    for (const word of words) {
      const testLine = `${line}${word} `;
      const testWidth = canvasContext.measureText(testLine).width;

      if (testWidth > maxWidth && line !== "") {
        canvasContext.fillText(line, 90, lineY);
        line = `${word} `;
        lineY += 55;
      } else {
        line = testLine;
      }
    }

    canvasContext.fillText(line, 90, lineY);
  }

  canvasContext.font = "600 28px Inter, sans-serif";
  canvasContext.fillText("A birthday song for HAN", 90, 1370);

  canvasContext.font = "400 24px Inter, sans-serif";
  canvasContext.fillText("HAN DAY · HAN GLOBAL", 90, 1430);
}

day1Form.addEventListener("submit", function (event) {
  event.preventDefault();

  drawSongCard();

  document.querySelector("#form-section").hidden = true;
  creationSection.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

downloadSongButton.addEventListener("click", function () {
  const link = document.createElement("a");

  link.download = "han-day-song-card.png";
  link.href = songCanvas.toDataURL("image/png");
  link.click();
});

copyHashtagsButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(hashtags.join(" "));
    copyStatus.textContent = "Hashtags copied!";
  } catch {
    copyStatus.textContent = "Please copy the hashtags manually.";
  }
});

backToFormButton.addEventListener("click", function () {
  creationSection.hidden = true;
  document.querySelector("#form-section").hidden = false;
  copyStatus.textContent = "";
});
