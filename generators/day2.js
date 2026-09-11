const day2Form = document.querySelector("#day2-form");

const wishMessageInput = document.querySelector("#wish-message");

const wishValidationMessage = document.querySelector(
  "#wish-validation-message"
);

const wishCreationSection = document.querySelector(
  "#wish-creation-section"
);

const wishCanvas = document.querySelector("#wish-canvas");

const downloadWishButton = document.querySelector(
  "#download-wish"
);

const copyWishHashtagsButton = document.querySelector(
  "#copy-wish-hashtags"
);

const backToWishFormButton = document.querySelector(
  "#back-to-wish-form"
);

const wishCopyStatus = document.querySelector(
  "#wish-copy-status"
);

const wishCanvasContext = wishCanvas.getContext("2d");


const wishHashtags = [
  "#HAN_DAY",
  "#HappyHANDay"
];

async function registerWishParticipation() {
  try {
    const response = await fetch("/api/counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        activity: "stars"
      })
    });

    if (!response.ok) {
      throw new Error("Counter request failed");
    }

    return true;
  } catch (error) {
    console.error(
      "Could not register wish participation:",
      error
    );

    return false;
  }
}

const prohibitedWishWords = [
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

function drawRoundedRect(
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

  ctx.lineTo(
    x + radius,
    y + height
  );

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  ctx.lineTo(
    x,
    y + radius
  );

  ctx.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );

  ctx.closePath();
}



function drawStarShape(
  ctx,
  centerX,
  centerY,
  outerRadius,
  innerRadius
) {
  const points = 5;

  const outerCornerRoundness = 0.42;
  const innerCornerRoundness = 0.32;

  const vertices = [];

  for (let index = 0; index < points * 2; index++) {
    const angle =
      -Math.PI / 2 +
      (Math.PI * index) / points;

    const radius =
      index % 2 === 0
        ? outerRadius
        : innerRadius;

    vertices.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    });
  }

  ctx.beginPath();

  for (let index = 0; index < vertices.length; index++) {
    const current = vertices[index];

    const previous =
      vertices[
        (index - 1 + vertices.length) %
          vertices.length
      ];

    const next =
      vertices[
        (index + 1) % vertices.length
      ];

    const isOuter = index % 2 === 0;

    const roundness = isOuter
      ? outerCornerRoundness
      : innerCornerRoundness;

    const startX =
      current.x +
      (previous.x - current.x) * roundness;

    const startY =
      current.y +
      (previous.y - current.y) * roundness;

    const endX =
      current.x +
      (next.x - current.x) * roundness;

    const endY =
      current.y +
      (next.y - current.y) * roundness;

    if (index === 0) {
      ctx.moveTo(startX, startY);
    } else {
      ctx.lineTo(startX, startY);
    }

    ctx.quadraticCurveTo(
      current.x,
      current.y,
      endX,
      endY
    );
  }

  ctx.closePath();
}



function drawWishStar(ctx) {
  const centerX = 600;
  const centerY = 780;

  const outerRadius = 365;
  const innerRadius = 220;

  ctx.save();

  ctx.shadowColor = "rgba(255, 255, 255, 0.12)";
  ctx.shadowBlur = 35;

  drawStarShape(
    ctx,
    centerX,
    centerY,
    outerRadius,
    innerRadius
  );

  ctx.fillStyle = "#f8e99b";
  ctx.fill();

  ctx.restore();

  ctx.save();

  drawStarShape(
    ctx,
    centerX,
    centerY,
    outerRadius - 12,
    innerRadius - 12
  );

  ctx.fillStyle = "#fff7c9";
  ctx.fill();

  ctx.restore();
}



function drawTextInsideStar(ctx, message) {
  const centerX = 600;
  const centerY = 780;

  const maxWidth = 430;

  let fontSize = 42;

  let lines = [];

  function createLines() {
    ctx.font = `${fontSize}px "Gveret Levin", cursive`;

    const words = message.split(" ");

    const result = [];

    let currentLine = "";

    words.forEach(function (word) {
      const testLine = currentLine
        ? `${currentLine} ${word}`
        : word;

      const testWidth = ctx.measureText(testLine).width;

      if (
        testWidth > maxWidth &&
        currentLine
      ) {
        result.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      result.push(currentLine);
    }

    return result;
  }

  lines = createLines();

  while (
    lines.length > 4 &&
    fontSize > 24
  ) {
    fontSize -= 2;
    lines = createLines();
  }

  ctx.save();

  ctx.font = `${fontSize}px "Gveret Levin", cursive`;
  ctx.fillStyle = "#4a3b2e";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = fontSize * 1.45;

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



function drawWishCard(wishMessage) {
  wishCanvas.width = 1200;
  wishCanvas.height = 1500;

  const ctx = wishCanvasContext;

  ctx.clearRect(
    0,
    0,
    wishCanvas.width,
    wishCanvas.height
  );



  const backgroundGradient = ctx.createLinearGradient(
    0,
    0,
    0,
    wishCanvas.height
  );

  backgroundGradient.addColorStop(
    0,
    "#7c91bd"
  );

  backgroundGradient.addColorStop(
    1,
    "#435b89"
  );

  ctx.fillStyle = backgroundGradient;

  ctx.fillRect(
    0,
    0,
    wishCanvas.width,
    wishCanvas.height
  );



  ctx.save();

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";

  ctx.font = "600 27px Inter, sans-serif";

  ctx.fillText(
    "HAN GLOBAL",
    65,
    85
  );

  ctx.font = "500 22px Inter, sans-serif";

  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";

  ctx.fillText(
    "DAY 02",
    65,
    125
  );

  ctx.restore();




  ctx.save();

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";

  ctx.font = "500 65px Bodoni Moda, serif";

  ctx.fillText(
    "MAKE A",
    wishCanvas.width / 2,
    235
  );

  ctx.fillText(
    "WISH FOR HAN",
    wishCanvas.width / 2,
    315
  );

  ctx.restore();


  drawWishStar(ctx);

  drawTextInsideStar(
    ctx,
    wishMessage
  );



  ctx.save();

  ctx.fillStyle =
    "rgba(255, 255, 255, 0.12)";

  if (
    typeof ctx.roundRect === "function"
  ) {
    ctx.beginPath();

    ctx.roundRect(
      65,
      1360,
      1070,
      90,
      45
    );

    ctx.fill();
  } else {
    drawRoundedRect(
      ctx,
      65,
      1360,
      1070,
      90,
      45
    );

    ctx.fill();
  }

  ctx.textAlign = "center";

  ctx.fillStyle = "#f8e99b";

  ctx.font = "500 27px Inter, sans-serif";

  ctx.fillText(
    "#HAN_DAY  #HappyHANDay",
    wishCanvas.width / 2,
    1415
  );

  ctx.restore();
}




function containsProhibitedWishWord(message) {
  const normalizedMessage = normalizeText(message);

  return prohibitedWishWords.some(function (word) {
    const normalizedWord = normalizeText(word);

    return normalizedMessage.includes(normalizedWord);
  });
}


day2Form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const wishMessage = wishMessageInput.value.trim();

  if (!wishMessage) {
    wishValidationMessage.textContent =
      "Please write a wish before creating your image.";

    wishValidationMessage.hidden = false;

    return;
  }

  if (containsProhibitedWishWord(wishMessage)) {
    wishValidationMessage.textContent =
      "This wish cannot be generated because it contains inappropriate language. Please write a kind and respectful message for HAN.";

    wishValidationMessage.hidden = false;

    return;
  }

  wishValidationMessage.textContent = "";
  wishValidationMessage.hidden = true;

  await registerWishParticipation();
  
  drawWishCard(wishMessage);

  day2Form.closest("section").hidden = true;

  wishCreationSection.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


downloadWishButton.addEventListener(
  "click",
  function () {
    const link = document.createElement("a");

    link.download = "han-day-wish.png";

    link.href = wishCanvas.toDataURL(
      "image/png"
    );

    link.click();
  }
);



copyWishHashtagsButton.addEventListener(
  "click",
  async function () {
    const hashtags = wishHashtags.join(" ");

    try {
      await navigator.clipboard.writeText(
        hashtags
      );

      wishCopyStatus.textContent =
        "Copied!";

      setTimeout(function () {
        wishCopyStatus.textContent = "";
      }, 2000);

    } catch (error) {
      wishCopyStatus.textContent =
        "Copy failed.";
    }
  }
);



backToWishFormButton.addEventListener(
  "click",
  function () {
    wishCreationSection.hidden = true;

    day2Form.closest("section").hidden = false;

    wishMessageInput.value = "";

    wishValidationMessage.textContent = "";

    wishValidationMessage.hidden = true;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);
