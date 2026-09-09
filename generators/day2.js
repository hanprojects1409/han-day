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
  "#HAN_DAY",
  "#HappyHANDay"
];

function drawWishCard(wishMessage, wishDesign) {
  wishCanvas.width = 1200;
  wishCanvas.height = 1500;

  const ctx = wishCanvasContext;

  const isShooting = wishDesign === "shooting";
  const isShining = wishDesign === "shining";

  const backgroundColor = "#14294a";

  const textColor = "#ffffff";

  const skyGradient = ctx.createLinearGradient(
  0,
  0,
  0,
  wishCanvas.height
);

skyGradient.addColorStop(0, "#0b1830");
skyGradient.addColorStop(0.55, "#18345b");
skyGradient.addColorStop(1, "#315b82");

ctx.fillStyle = skyGradient;
ctx.fillRect(0, 0, wishCanvas.width, wishCanvas.height);
  drawBackgroundStars(ctx);

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
  const outerRadius = 285;
  const innerRadius = 125;

  ctx.save();

  const glow = ctx.createRadialGradient(
    centerX,
    centerY,
    20,
    centerX,
    centerY,
    360
  );

  glow.addColorStop(0, "rgba(255, 244, 170, 0.28)");
  glow.addColorStop(1, "rgba(255, 244, 170, 0)");

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 360, 0, Math.PI * 2);
  ctx.fill();

  drawStarShape(ctx, centerX, centerY, outerRadius, innerRadius);

  if (isShining) {
    drawSparkle(ctx, 315, 570, 28);
    drawSparkle(ctx, 885, 575, 22);
    drawSparkle(ctx, 300, 975, 20);
    drawSparkle(ctx, 900, 970, 28);
  }

  ctx.restore();
}

function drawSparkle(ctx, x, y, size) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);

  const gradient = ctx.createLinearGradient(
    0,
    -size,
    0,
    size
  );

  gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();

  ctx.moveTo(0, -size);
  ctx.quadraticCurveTo(
    size * 0.2,
    -size * 0.2,
    size,
    0
  );
  ctx.quadraticCurveTo(
    size * 0.2,
    size * 0.2,
    0,
    size
  );
  ctx.quadraticCurveTo(
    -size * 0.2,
    size * 0.2,
    -size,
    0
  );
  ctx.quadraticCurveTo(
    -size * 0.2,
    -size * 0.2,
    0,
    -size
  );

  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawTextInsideStar(ctx, wishMessage) {
  const words = wishMessage.split(" ");
  const lines = [];
  let currentLine = "";

  ctx.font = "400 32px Inter, sans-serif";

  words.forEach(function (word) {
    const testLine = `${currentLine} ${word}`.trim();

    if (ctx.measureText(testLine).width > 330) {
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
    ctx.fillText(line, 600, 720 + index * 44);
  });

  ctx.textAlign = "left";
}

function drawShootingStar(ctx) {
  const centerX = 600;
  const centerY = 760;

  ctx.save();

  ctx.beginPath();
  ctx.moveTo(180, 1030);

  ctx.bezierCurveTo(
    300,
    920,
    390,
    820,
    520,
    730
  );

  ctx.strokeStyle = "rgba(255, 244, 170, 0.18)";
  ctx.lineWidth = 90;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(230, 990);

  ctx.bezierCurveTo(
    350,
    890,
    420,
    810,
    535,
    730
  );

  ctx.strokeStyle = "rgba(255, 244, 170, 0.45)";
  ctx.lineWidth = 34;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(300, 930);

  ctx.bezierCurveTo(
    390,
    850,
    450,
    790,
    545,
    730
  );

  ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
  ctx.lineWidth = 8;
  ctx.stroke();

  drawStarShape(ctx, centerX, centerY, 230, 100);

  ctx.restore();
}

function drawStarShape(ctx, centerX, centerY, outerRadius, innerRadius) {
  const points = 5;

  ctx.save();

  const gradient = ctx.createRadialGradient(
    centerX - 80,
    centerY - 100,
    20,
    centerX,
    centerY,
    outerRadius
  );

  gradient.addColorStop(0, "#fff7bd");
  gradient.addColorStop(0.55, "#f8e99b");
  gradient.addColorStop(1, "#e6c95d");

  ctx.fillStyle = gradient;

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

  ctx.shadowColor = "rgba(255, 232, 130, 0.35)";
  ctx.shadowBlur = 28;
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  // Borde fino y suave
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
  ctx.stroke();

  ctx.restore();
}

function drawTextBelowStar(ctx, wishMessage) {
  const words = wishMessage.split(" ");
  const lines = [];
  let currentLine = "";

  ctx.font = "400 36px Inter, sans-serif";

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
    ctx.fillText(line, 600, 1100 + index * 54);
  });

  ctx.textAlign = "left";
}

function drawBackgroundStars(ctx) {
  const stars = [
    [150, 210, 3],
    [350, 170, 2],
    [520, 230, 3],
    [760, 180, 2],
    [980, 240, 3],
    [180, 470, 2],
    [1020, 460, 2],
    [160, 1190, 3],
    [1040, 1180, 3],
    [420, 1260, 2],
    [820, 1280, 2]
  ];

  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.65)";

  stars.forEach(function ([x, y, radius]) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
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
