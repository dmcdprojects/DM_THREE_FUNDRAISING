/// 3. FUNDRAISING (ajustado)

let t = 0;
const maxCircles = 4;
const baseRadius = 20;
const pulseSpeed = 0.03;

const totalDuration = 600;
const growDuration = 90;
const shrinkDuration = 90;
const pulseDuration = totalDuration - growDuration - shrinkDuration;

function setup() {
  let cnv = createCanvas(200, 200);
  cnv.style('background', 'transparent'); // garante fundo transparente no canvas
  strokeWeight(1.2);
  noFill();
}

function draw() {
  // background(0); // removido para manter o fundo transparente
  clear(); // limpa o canvas com transparência
  translate(width / 2, height / 2);
  stroke(255); // branco

  let cycleTime = t % totalDuration;

  drawPulsingPoint();

  if (cycleTime < growDuration) {
    let progress = cycleTime / growDuration;
    drawGrowingCircles(progress);
  } else if (cycleTime < growDuration + pulseDuration) {
    drawAnimatedCircles();
  } else {
    let shrinkProgress = (cycleTime - growDuration - pulseDuration) / shrinkDuration;
    drawGrowingCircles(1 - shrinkProgress);
  }

  t++;
}

function drawPulsingPoint() {
  noStroke();
  let syncPulse = sin(t * pulseSpeed);
  let pulse = 100 + 100 * syncPulse;
  fill(255, pulse);
  ellipse(0, 0, 14);

  noFill();
  stroke(255, 40 + 40 * syncPulse);
  strokeWeight(1.2);
  ellipse(0, 0, 40 + 10 * syncPulse);
}

function drawGrowingCircles(progress) {
  noFill();
  strokeWeight(1.2);
  for (let i = 1; i <= maxCircles; i++) {
    let targetRadius = baseRadius * i;
    let r = targetRadius * progress;
    stroke(255, map(i, 1, maxCircles, 220, 50) * progress);
    ellipse(0, 0, r * 2);
  }
}

function drawAnimatedCircles() {
  noFill();
  strokeWeight(1.2);
  push();
  rotate(0.01 * sin(t * 0.01));
  let syncPulse = sin(t * pulseSpeed);
  for (let i = 1; i <= maxCircles; i++) {
    let offset = syncPulse * 8;
    let r = baseRadius * i + offset;
    stroke(255, map(i, 1, maxCircles, 220, 50));
    ellipse(0, 0, r * 2);
  }
  pop();
}

function drawPulsingPoint() {
  // Ativa modo de blend para brilho
  blendMode(ADD);

  // Sincroniza intensidade do brilho com a pulsação
  let syncPulse = sin(t * pulseSpeed);
  let pulse = 100 + 100 * syncPulse;

  // Camada de brilho difuso ao redor
  noStroke();
  for (let i = 0; i < 4; i++) {
    let alpha = map(i, 0, 3, 50, 5) * syncPulse;
    fill(255, alpha);
    ellipse(0, 0, 30 + i * 15); // camadas circulares aumentando de tamanho
  }

  // Núcleo mais brilhante
  fill(255, 200 + 55 * syncPulse);
  ellipse(0, 0, 12);

  // Anel externo com stroke leve
  noFill();
  stroke(100, 60 + 40 * syncPulse);
  strokeWeight(1.2);
  ellipse(0, 0, 40 + 10 * syncPulse);

  // Restaura modo normal para o restante do desenho
  blendMode(BLEND);
}