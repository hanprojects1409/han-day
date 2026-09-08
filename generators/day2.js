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

  const isShooting = wishDesign === "shooting";
  const isShining = wishDesign === "shining";

  const backgroundColor = isShooting
    ? "#fff9d9"
    : isShining
      ? "#f8e99b"
      : "#fffdf2";

  const textColor = "#111111";

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, wishCanvas.width, wishCanvas.height);

  ctx.fillStyle = textColor;
  ctx.textAlign = "left";

  ctx.font = "500 42px Inter, sans-serif";
  ctx.fillText("HAN GLOBAL", 90, 120);

  ctx.font = "500 82px 'Bodoni Moda', serif";
  ctx.fillText("MAKE A", 90, 280);
  ctx.fillText("WISH FOR HAN", 90, 380);

  if (isShooting) {
    drawShootingStar(ctx);
  } else {
    drawWishStar(ctx, isShining);
    drawTextInsideStar(ctx, wishMessage);
  }

  if (isShooting) {
    drawTextBelowStar(ctx, wishMessage);
  }

  ctx.textAlign = "left";
  ctx.font = "400 26px Inter, sans-serif";
  ctx.fillText("#HAN_DAY  #HappyHANDay", 90, 1410);
}

function drawWishStar(ctx, isShining) {
  const centerX = 600;
  const centerY = 780;
  const outerRadius = 300;
  const innerRadius = 135;
  const points = 5;

  ctx.save();

  ctx.beginPath();

  for (let i = 0; i < points * 2; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();

  ctx.fillStyle = isShining ? "#f2d84b" : "#f8e99b";
  ctx.fill();

  ctx.lineWidth = 8;
  ctx.strokeStyle = "#111111";
  ctx.stroke();

  if (isShining) {
    drawSparkle(ctx, 300, 560, 34);
    drawSparkle(ctx, 900, 580, 28);
    drawSparkle(ctx, 300, 980, 24);
    drawSparkle(ctx, 900, 970, 34);
  }

  ctx.restore();
}

function drawSparkle(ctx, x, y, size) {
  ctx.save();

  ctx.translate(x, y);
  ctx.beginPath();

  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.25, -size * 0.25);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.25, size * 0.25);
  ctx.lineTo(0, size);
  ctx.lineTo(-size * 0.25, size * 0.25);
  ctx.lineTo(-size, 0);
  ctx.lineTo(-size * 0.25, -size * 0.25);
  ctx.closePath();

  ctx.fillStyle = "#111111";
  ctx.fill();

  ctx.restore();
}

function drawTextInsideStar(ctx, wishMessage) {
  const words = wishMessage.split(" ");
  const lines = [];
  let currentLine = "";

  ctx.font = "400 34px Inter, sans-serif";

  words.forEach(function (word) {
    const testLine = `${currentLine} ${word}`.trim();

    if (ctx.measureText(testLine).width > 360) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  ctx.fillStyle = "#111111";
  ctx.textAlign = "center";

  lines.forEach(function (line, index) {
    ctx.fillText(line, 600, 750 + index * 48);
  });

  ctx.textAlign = "left";
}

function drawShootingStar(ctx) {
  const centerX = 600;
  const centerY = 760;

  ctx.save();

  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 34;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(260, 930);
  ctx.lineTo(520, 700);
  ctx.stroke();

  ctx.lineWidth = 18;

  ctx.beginPath();
  ctx.moveTo(180, 1010);
  ctx.lineTo(500, 700);
  ctx.stroke();

  drawStarShape(ctx, centerX, centerY, 230, 105);

  ctx.restore();
}

function drawStarShape(ctx, centerX, centerY, outerRadius, innerRadius) {
  const points = 5;

  ctx.save();

  ctx.beginPath();

  for (let i = 0; i < points * 2; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();

  ctx.fillStyle = "#f8e99b";
  ctx.fill();

  ctx.lineWidth = 8;
  ctx.strokeStyle = "#111111";
  ctx.stroke();

  ctx.restore();
}

function drawTextBelowStar(ctx, wishMessage) {
  const words = wishMessage.split(" ");
  const lines = [];
  let currentLine = "";

  ctx.font = "400 38px Inter, sans-serif";

  words.forEach(function (word) {
    const testLine = `${currentLine} ${word}`.trim();

    if (ctx.measureText(testLine).width > 850) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  ctx.fillStyle = "#111111";
  ctx.textAlign = "center";

  lines.forEach(function (line, index) {
    ctx.fillText(line, 600, 1100 + index * 58);
  });

  ctx.textAlign = "left";
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
