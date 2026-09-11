const day3Form = document.querySelector("#day3-form");

const countrySelect = document.querySelector("#postcard-country");

const postcardMessageInput = document.querySelector(
  "#postcard-message"
);

const postcardValidationMessage = document.querySelector(
  "#postcard-validation-message"
);

const postcardCreationSection = document.querySelector(
  "#postcard-creation-section"
);

const postcardCanvas = document.querySelector(
  "#postcard-canvas"
);

const downloadPostcardButton = document.querySelector(
  "#download-postcard"
);

const copyPostcardHashtagsButton = document.querySelector(
  "#copy-postcard-hashtags"
);

const backToPostcardFormButton = document.querySelector(
  "#back-to-postcard-form"
);

const postcardCopyStatus = document.querySelector(
  "#postcard-copy-status"
);

const postcardSignatureInput = document.querySelector(
  "#postcard-signature"
);

const postcardCanvasContext = postcardCanvas.getContext("2d");

const postcardHashtags = [
  "#HAN_DAY",
  "#HappyHANDay"
];

async function registerPostcardParticipation() {
  try {
    const response = await fetch("/api/counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        activity: "postcards"
      })
    });

    if (!response.ok) {
      throw new Error("Counter request failed");
    }

    return true;
  } catch (error) {
    console.error(
      "Could not register postcard participation:",
      error
    );

    return false;
  }
}

const prohibitedPostcardWords = [
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
  "tranny",
  "die",
  "dying"
];

function normalizePostcardText(text) {
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

function containsProhibitedPostcardWord(message) {
  const normalizedMessage =
    normalizePostcardText(message);

  return prohibitedPostcardWords.some(function (word) {
    const normalizedWord =
      normalizePostcardText(word);

    return normalizedMessage.includes(
      normalizedWord
    );
  });
}

function drawPostcardRoundedRect(
  ctx,
  x,
  y,
  width,
  height,
  radius
) {
  ctx.beginPath();

  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  ctx.lineTo(
    x + width,
    y + height - radius
  );

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  ctx.lineTo(x + radius, y + height);

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  ctx.lineTo(x, y + radius);

  ctx.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );

  ctx.closePath();
}

function wrapPostcardText(
  ctx,
  text,
  maxWidth
) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = "";

  words.forEach(function (word) {
    const testLine = currentLine
      ? `${currentLine} ${word}`
      : word;

    if (
      ctx.measureText(testLine).width > maxWidth &&
      currentLine
    ) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function drawPostcardMessage(
  ctx,
  message
) {
  const maxWidth = 850;
  let fontSize = 42;
  let lines = [];

  function createLines() {
    ctx.font = `${fontSize}px "Gveret Levin", cursive`;

    return wrapPostcardText(
      ctx,
      message,
      maxWidth
    );
  }

  lines = createLines();

  while (
    lines.length > 5 &&
    fontSize > 24
  ) {
    fontSize -= 2;
    lines = createLines();
  }

  ctx.save();

  ctx.font = `${fontSize}px "Gveret Levin", cursive`;
  ctx.fillStyle = "#3b3028";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = fontSize * 1.45;
  const centerX = 600;
  const centerY = 885;

  const totalHeight =
    lines.length * lineHeight;

  const firstLineY =
    centerY -
    totalHeight / 2 +
    lineHeight / 2;

  lines.forEach(function (line, index) {
    ctx.fillText(
      line,
      centerX,
      firstLineY + index * lineHeight
    );
  });

  ctx.restore();
}

function drawPostcardCard(
  countryName,
  countryFlag,
  message,
  signature
) {
  postcardCanvas.width = 1200;
  postcardCanvas.height = 1500;

  const ctx = postcardCanvasContext;

  ctx.clearRect(
    0,
    0,
    postcardCanvas.width,
    postcardCanvas.height
  );

  const backgroundGradient =
    ctx.createLinearGradient(
      0,
      0,
      1200,
      1500
    );

  backgroundGradient.addColorStop(
    0,
    "#f8e99b"
  );

  backgroundGradient.addColorStop(
    1,
    "#e8cfd0"
  );

  ctx.fillStyle = backgroundGradient;

  ctx.fillRect(
    0,
    0,
    postcardCanvas.width,
    postcardCanvas.height
  );

  ctx.save();

  ctx.fillStyle = "#3b3028";
  ctx.textAlign = "left";
  ctx.font = "600 27px Inter, sans-serif";

  ctx.fillText(
    "HAN GLOBAL",
    65,
    85
  );

  ctx.font = "500 22px Inter, sans-serif";
  ctx.fillStyle = "rgba(59, 48, 40, 0.65)";

  ctx.fillText(
    "DAY 03",
    65,
    125
  );

  ctx.restore();

  ctx.save();

  ctx.fillStyle = "#ffffff";

  drawPostcardRoundedRect(
    ctx,
    65,
    190,
    1070,
    1030,
    12
  );

  ctx.fill();

  ctx.restore();

  ctx.save();

  ctx.strokeStyle = "#d8cbb7";
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 12]);

  ctx.strokeRect(
    105,
    230,
    990,
    950
  );

  ctx.setLineDash([]);

  ctx.restore();

  ctx.save();

  ctx.textAlign = "center";
  ctx.fillStyle = "#3b3028";
  ctx.font = "500 64px Bodoni Moda, serif";

ctx.fillText(
  "STAY EVERYWHERE",
  600,
  350
);

ctx.fillText(
  "AROUND THE WORLD",
  600,
  415
);

  ctx.restore();

  ctx.save();

ctx.fillStyle = "#3b3028";
ctx.textAlign = "center";
ctx.font = "600 23px Inter, sans-serif";

ctx.fillText(
  `FROM: ${countryName.toUpperCase()}`,
  600,
  525
);

ctx.font = "72px sans-serif";

ctx.fillText(
  countryFlag,
  600,
  625
);

ctx.font = "600 23px Inter, sans-serif";

ctx.fillText(
  "TO: HAN",
  600,
  725
);

ctx.restore();

drawPostcardMessage(
  ctx,
  message
);
  
  ctx.save();

  ctx.strokeStyle = "#d8cbb7";
  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.moveTo(170, 1070);
  ctx.lineTo(1030, 1070);

  ctx.stroke();

  ctx.restore();

  ctx.save();

  ctx.fillStyle = "#3b3028";
  ctx.textAlign = "center";
  ctx.font = "500 24px Inter, sans-serif";

  ctx.fillText(
  `with love, ${signature}`,
  600,
  1130
);

  ctx.restore();

  ctx.save();

  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";

  drawPostcardRoundedRect(
    ctx,
    65,
    1325,
    1070,
    95,
    48
  );

  ctx.fill();

  ctx.fillStyle = "#3b3028";
  ctx.textAlign = "center";
  ctx.font = "500 27px Inter, sans-serif";

  ctx.fillText(
    "#HAN_DAY  #HappyHANDay",
    600,
    1385
  );

  ctx.restore();
}

day3Form.addEventListener(
  "submit",
  async function (event) {
    event.preventDefault();

    const countryOption =
      countrySelect.options[
        countrySelect.selectedIndex
      ];

    const countryName = countryOption.value;
    const countryFlag = countryOption.dataset.flag;

    const postcardMessage =
      postcardMessageInput.value.trim();

    const postcardSignature =
  postcardSignatureInput.value.trim();

    if (!countryName) {
      postcardValidationMessage.textContent =
        "Please select your country.";

      postcardValidationMessage.hidden = false;
      return;
    }

    if (!postcardMessage) {
      postcardValidationMessage.textContent =
        "Please write a message before creating your postcard.";

      postcardValidationMessage.hidden = false;
      return;
    }

    if (
      containsProhibitedPostcardWord(
        postcardMessage
      )
    ) {
      postcardValidationMessage.textContent =
        "This message cannot be generated because it contains inappropriate language. Please write a kind and respectful message for HAN.";

      postcardValidationMessage.hidden = false;
      return;
    }

    if (!postcardSignature) {
  postcardValidationMessage.textContent =
    "Please write your name or nickname.";

  postcardValidationMessage.hidden = false;
  return;
}

if (containsProhibitedPostcardWord(postcardSignature)) {
  postcardValidationMessage.textContent =
    "Please use a respectful name or nickname without inappropriate language.";

  postcardValidationMessage.hidden = false;
  return;
}
    
    postcardValidationMessage.textContent = "";
    postcardValidationMessage.hidden = true;

    await registerPostcardParticipation();
    
    drawPostcardCard(
      countryName,
      countryFlag,
      postcardMessage,
      postcardSignature
    );

    day3Form.closest("section").hidden = true;
    postcardCreationSection.hidden = false;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);

downloadPostcardButton.addEventListener(
  "click",
  function () {
    const link = document.createElement("a");

    link.download = "han-day-postcard.png";

    link.href = postcardCanvas.toDataURL(
      "image/png"
    );

    link.click();
  }
);

copyPostcardHashtagsButton.addEventListener(
  "click",
  async function () {
    const hashtags = postcardHashtags.join(" ");

    try {
      await navigator.clipboard.writeText(
        hashtags
      );

      postcardCopyStatus.textContent =
        "Copied!";

      setTimeout(function () {
        postcardCopyStatus.textContent = "";
      }, 2000);
    } catch (error) {
      postcardCopyStatus.textContent =
        "Copy failed.";
    }
  }
);

backToPostcardFormButton.addEventListener(
  "click",
  function () {
    postcardCreationSection.hidden = true;

    day3Form.closest("section").hidden = false;

    countrySelect.value = "";
    postcardMessageInput.value = "";
    postcardSignatureInput.value = "";

    postcardValidationMessage.textContent = "";
    postcardValidationMessage.hidden = true;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);
