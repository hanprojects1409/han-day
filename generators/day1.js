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
const blockedWords = [
  "puto",
  "puta",
  "pendejo",
  "pendeja",
  "idiota",
  "estupido",
  "estúpido",
  "estupida",
  "estúpida",
  "mierda",
  "chingar",
  "chingada",
  "chingado",
  "verga",
  "cabron",
  "cabrón",
  "marica",
  "maricon",
  "maricón",
    "fuck",
  "fucking",
  "fucked",
  "motherfucker",
  "motherfuckers",
  "shit",
  "shitty",
  "bullshit",
  "bitch",
  "bitches",
  "bitchy",
  "asshole",
  "assholes",
  "dumbass",
  "jackass",
  "bastard",
  "damn",
  "goddamn",
  "hell",
    "slut",
  "sluts",
  "slutty",
  "whore",
  "whores",
  "hoe",
  "hoes",
  "skank",
  "skanks",
  "tramp",
  "tramps",
  "harlot",
  "thot",
  "thots",
  "bimbo",
  "bimbos",
  "cunt",
  "cunts",
  "twat",
  "twats",
  "dick",
  "dicks",
  "dickhead",
  "dickheads",
  "cock",
  "cocks",
  "pussy",
  "pussies",
  "prick",
  "pricks",
  "wanker",
  "wankers",
  "jerkoff",
  "jerk-off",
  "jackoff",
  "jack-off",
    "porn",
  "porno",
  "pornography",
  "pornographic",
  "xxx",
  "sexcam",
  "camgirl",
  "camboy",
  "onlyfans",
  "nudes",
  "nude",
  "dickpic",
  "dick pics",
  "send nudes",
  "suck my",
  "fuck me",
  "fuck you",
  "go fuck",
  "eat shit",
  "blowjob",
  "blow job",
  "handjob",
  "hand job",
  "cum",
  "cumming",
  "jizz",
  "semen",
  "orgasm",
  "masturbate",
  "masturbation",
    "fag",
  "faggot",
  "faggots",
  "dyke",
  "retard",
  "retarded",
  "nigger",
  "nigga",
  "chink",
  "spic",
  "wetback",
  "kike",
  "tranny"
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z0-9]/g, "");
}

function containsBlockedWord(text) {
  const normalizedText = normalizeText(text);

  return blockedWords.some((word) => {
    const normalizedWord = normalizeText(word);

    return normalizedText.includes(normalizedWord);
  });
}

const canvasContext = songCanvas.getContext("2d");

const hashtags = [
  "#HAN_DAY",
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

  canvasContext.font = "500 92px 'Bodoni Moda', serif";
  canvasContext.fillText(songTitle, 90, 850);

  canvasContext.font = "400 34px Inter, sans-serif";
  canvasContext.fillText(`by ${artistName}`, 90, 935);

  if (message) {
    canvasContext.font = "400 44px Inter, sans-serif";

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

  const songTitle = songTitleInput.value.trim();
  const artistName = artistNameInput.value.trim();
  const message = songMessageInput.value.trim();

  const combinedText = `${songTitle} ${artistName} ${message}`;

  if (containsBlockedWord(combinedText)) {
    alert(
      "Please use respectful language. Profanity or harmful content is not allowed."
    );
    return;
  }

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
