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
  cnv.style('background', 'transparent');
  strokeWeight(1.2);
  noFill();
}

function draw() {
  clear(); // mantém fundo transparente
  translate(width / 2, height / 2);
  stroke(255); // cor branca

  let cycleTime = t % totalDuration;

  drawSimplePulsingPoint(); // versão simplificada

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

function drawSimplePulsingPoint() {
  noStroke();
  fill(255); // ponto branco fixo
  ellipse(0, 0, 10); // menor, sem brilho nem animação

  noFill();
  stroke(255);
  strokeWeight(1.2);
  ellipse(0, 0, 30); // anel externo fixo para destaque
}

function drawGrowingCircles(progress) {
  noFill();
  strokeWeight(1.2);
  stroke(255); // sem opacidade
  for (let i = 1; i <= maxCircles; i++) {
    let targetRadius = baseRadius * i;
    let r = targetRadius * progress;
    ellipse(0, 0, r * 2);
  }
}

function drawAnimatedCircles() {
  noFill();
  strokeWeight(1.2);
  stroke(255); // todas as linhas 100% visíveis
  push();
  rotate(0.01 * sin(t * 0.01));
  let syncPulse = sin(t * pulseSpeed);
  for (let i = 1; i <= maxCircles; i++) {
    let offset = syncPulse * 8;
    let r = baseRadius * i + offset;
    ellipse(0, 0, r * 2);
  }
  pop();
}