const day2Form = document.querySelector("#day2-form");
const wishMessageInput = document.querySelector("#wish-message");

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

function drawWishCard(wishMessage) {
  wishCanvas.width = 1200;
  wishCanvas.height = 1500;

  const ctx = wishCanvasContext;

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
  ctx.fillRect(
    0,
    0,
    wishCanvas.width,
    wishCanvas.height
  );

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";

  ctx.font = "500 42px Inter, sans-serif";
  ctx.fillText("HAN GLOBAL", 90, 120);

  ctx.font = "500 82px 'Bodoni Moda', serif";
  ctx.fillText("MAKE A", 90, 280);
  ctx.fillText("WISH FOR HAN", 90, 380);

  drawWishStar(ctx);
  drawTextInsideStar(ctx, wishMessage);

  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.beginPath();
  ctx.roundRect(65, 1360, 1070, 90, 45);
  ctx.fill();

  ctx.textAlign = "center";
  ctx.fillStyle = "#f8e99b";
  ctx.font = "500 27px Inter, sans-serif";

  ctx.fillText(
    "#HAN_DAY  #HappyHANDay",
    wishCanvas.width / 2,
    1415
  );

  ctx.textAlign = "left";
}

function drawWishStar(ctx) {
  const centerX = 600;
  const centerY = 780;

  const outerRadius = 360;
  const innerRadius = 205;

  ctx.save();

  const glow = ctx.createRadialGradient(
    centerX,
    centerY,
    20,
    centerX,
    centerY,
    390
  );

  glow.addColorStop(0, "rgba(255, 244, 170, 0.30)");
  glow.addColorStop(1, "rgba(255, 244, 170, 0)");

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 390, 0, Math.PI * 2);
  ctx.fill();

  drawStarShape(
    ctx,
    centerX,
    centerY,
    outerRadius,
    innerRadius
  );

  ctx.restore();
}

function drawStarShape(
  ctx,
  centerX,
  centerY,
  outerRadius,
  innerRadius
) {
  const points = 5;
  const rotation = -Math.PI / 2;

  const outerCorner = 0.18;
  const innerCorner = 0.30;

  const vertices = [];

  for (let i = 0; i < points * 2; i++) {
    const angle = rotation + (i * Math.PI) / points;
    const radius =
      i % 2 === 0 ? outerRadius : innerRadius;

    vertices.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      radius
    });
  }

  ctx.save();

  const gradient = ctx.createRadialGradient(
    centerX - 130,
    centerY - 150,
    20,
    centerX,
    centerY,
    outerRadius
  );

  gradient.addColorStop(0, "#fffde5");
  gradient.addColorStop(0.48, "#f8e99b");
  gradient.addColorStop(1, "#d7b84d");

  ctx.fillStyle = gradient;
  ctx.beginPath();

  vertices.forEach(function (current, index) {
    const previous =
      vertices[
        (index - 1 + vertices.length) % vertices.length
      ];

    const next =
      vertices[(index + 1) % vertices.length];

    const roundness =
      index % 2 === 0
        ? outerCorner
        : innerCorner;

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
  });

  ctx.closePath();

  ctx.shadowColor = "rgba(255, 235, 145, 0.42)";
  ctx.shadowBlur = 30;
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.stroke();

  ctx.restore();
}

function drawTextInsideStar(ctx, wishMessage) {
  const words = wishMessage.split(/\s+/);
  const lines = [];

  let currentLine = "";
  let fontSize = 48;
  const maxWidth = 430;

  function createLines() {
    lines.length = 0;
    currentLine = "";

    ctx.font = `${fontSize}px "Gveret Levin";

    words.forEach(function (word) {
      const testLine = currentLine
        ? `${currentLine} ${word}`
        : word;

      if (
        currentLine &&
        ctx.measureText(testLine).width > maxWidth
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
  }

  createLines();

  if (lines.length > 3) {
    fontSize = 40;
    createLines();
  }

  if (lines.length > 4) {
    fontSize = 34;
    createLines();
  }

  ctx.save();

  ctx.fillStyle = "#4a3b2e";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${fontSize}px "Gveret Levin";

  const lineHeight = fontSize * 1.2;
  const startY =
    780 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach(function (line, index) {
    ctx.fillText(
      line,
      600,
      startY + index * lineHeight
    );
  });

  ctx.restore();
}

day2Form.addEventListener("submit", function (event) {
  event.preventDefault();

  const wishMessage = wishMessageInput.value.trim();

  if (!wishMessage) {
    return;
  }

  drawWishCard(wishMessage);

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

copyWishHashtagsButton.addEventListener(
  "click",
  async function () {
    try {
      await navigator.clipboard.writeText(
        wishHashtags.join(" ")
      );

      wishCopyStatus.textContent = "Copied!";
    } catch (error) {
      wishCopyStatus.textContent = "Copy failed";
    }
  }
);

backToWishFormButton.addEventListener(
  "click",
  function () {
    wishCreationSection.hidden = true;
    day2Form.closest("section").hidden = false;
    wishCopyStatus.textContent = "";
  }
);
