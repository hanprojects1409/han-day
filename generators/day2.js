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
  const outerRadius = 340;
  const innerRadius = 155;

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
  drawSparkle(ctx, 270, 540, 42);
  drawSparkle(ctx, 930, 560, 34);
  drawSparkle(ctx, 250, 1010, 30);
  drawSparkle(ctx, 950, 990, 44);
  drawSparkle(ctx, 600, 430, 22);
  }

  ctx.restore();
}

function drawSparkle(ctx, x, y, size) {
  ctx.save();

  ctx.translate(x, y);

  const glow = ctx.createRadialGradient(
    0,
    0,
    0,
    0,
    0,
    size * 1.8
  );

  glow.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  glow.addColorStop(0.35, "rgba(255, 244, 170, 0.45)");
  glow.addColorStop(1, "rgba(255, 244, 170, 0)");

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, size * 1.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.quadraticCurveTo(
    size * 0.18,
    -size * 0.2,
    size * 0.42,
    0
  );
  ctx.quadraticCurveTo(
    size * 0.18,
    size * 0.2,
    0,
    size
  );
  ctx.quadraticCurveTo(
    -size * 0.18,
    size * 0.2,
    -size * 0.42,
    0
  );
  ctx.quadraticCurveTo(
    -size * 0.18,
    -size * 0.2,
    0,
    -size
  );

  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fill();

  ctx.rotate(Math.PI / 4);

  ctx.beginPath();
  ctx.moveTo(0, -size * 0.7);
  ctx.lineTo(size * 0.16, -size * 0.16);
  ctx.lineTo(size * 0.7, 0);
  ctx.lineTo(size * 0.16, size * 0.16);
  ctx.lineTo(0, size * 0.7);
  ctx.lineTo(-size * 0.16, size * 0.16);
  ctx.lineTo(-size * 0.7, 0);
  ctx.lineTo(-size * 0.16, -size * 0.16);
  ctx.closePath();

  ctx.fillStyle = "rgba(255, 244, 170, 0.85)";
  ctx.fill();

  ctx.restore();
}

function drawTextInsideStar(ctx, wishMessage) {
  const words = wishMessage.split(" ");
  const lines = [];
  let currentLine = "";

  ctx.font = "400 48px Parisienne, cursive";

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
  ctx.moveTo(120, 1060);

  ctx.bezierCurveTo(
    270,
    930,
    390,
    820,
    540,
    720
  );

  ctx.strokeStyle = "rgba(255, 235, 150, 0.12)";
  ctx.lineWidth = 150;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(255, 235, 150, 0.3)";
  ctx.shadowBlur = 70;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(150, 1030);

  ctx.bezierCurveTo(
    290,
    920,
    410,
    810,
    550,
    720
  );

  ctx.strokeStyle = "rgba(255, 244, 170, 0.28)";
  ctx.lineWidth = 75;
  ctx.shadowBlur = 35;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(190, 1000);

  ctx.bezierCurveTo(
    320,
    900,
    430,
    805,
    555,
    720
  );

  ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
  ctx.lineWidth = 18;
  ctx.shadowBlur = 18;
  ctx.stroke();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  drawShootingStarShape(ctx, centerX, centerY);

  drawSparkle(ctx, 300, 850, 25);
  drawSparkle(ctx, 410, 760, 18);
  drawSparkle(ctx, 760, 570, 22);
  drawSparkle(ctx, 850, 880, 18);

  ctx.restore();
}

function drawShootingStarShape(ctx, centerX, centerY) {
  ctx.save();

  ctx.translate(centerX, centerY);
  ctx.rotate(-Math.PI / 10);

  const gradient = ctx.createRadialGradient(
    -35,
    -45,
    15,
    0,
    0,
    230
  );

  gradient.addColorStop(0, "#fffde5");
  gradient.addColorStop(0.45, "#f8e99b");
  gradient.addColorStop(1, "#d5b64d");

  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.moveTo(0, -220);
  ctx.bezierCurveTo(
    22,
    -90,
    70,
    -25,
    220,
    0
  );
  ctx.bezierCurveTo(
    75,
    25,
    25,
    75,
    0,
    220
  );
  ctx.bezierCurveTo(
    -25,
    75,
    -75,
    25,
    -220,
    0
  );
  ctx.bezierCurveTo(
    -75,
    -25,
    -22,
    -90,
    0,
    -220
  );

  ctx.closePath();

  ctx.shadowColor = "rgba(255, 239, 150, 0.65)";
  ctx.shadowBlur = 45;
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.stroke();

  ctx.restore();
}

function drawStarShape(ctx, centerX, centerY, outerRadius, innerRadius) {
  const points = 5;
  const rotation = -Math.PI / 2;

  ctx.save();

  const gradient = ctx.createRadialGradient(
    centerX - 90,
    centerY - 110,
    20,
    centerX,
    centerY,
    outerRadius
  );

  gradient.addColorStop(0, "#fffbd7");
  gradient.addColorStop(0.5, "#f8e99b");
  gradient.addColorStop(1, "#d8b94e");

  ctx.fillStyle = gradient;
  ctx.beginPath();

  for (let i = 0; i < points * 2; i++) {
    const angle = rotation + (i * Math.PI) / points;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.quadraticCurveTo(
        centerX + Math.cos(angle - 0.04) * radius,
        centerY + Math.sin(angle - 0.04) * radius,
        x,
        y
      );
    }
  }

  ctx.closePath();

  ctx.shadowColor = "rgba(255, 235, 145, 0.45)";
  ctx.shadowBlur = 35;
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
  ctx.stroke();

  ctx.restore();
}

function drawTextBelowStar(ctx, wishMessage) {
  const words = wishMessage.split(" ");
  const lines = [];
  let currentLine = "";

  ctx.font = "400 48px Parisienne, cursive";

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
