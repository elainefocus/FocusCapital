function togglePopup(ev, id) {
  ev.stopPropagation();
  const pin = ev.currentTarget;
  const popup = document.getElementById(id);
  const isActive = popup.classList.contains('active');
  document.querySelectorAll('.popup.active').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pin.active').forEach(p => p.classList.remove('active'));
  if (!isActive) {
    popup.classList.add('active');
    pin.classList.add('active');
  }
}

function toggleTrianglePopup(ev, id) {
  ev.stopPropagation();
  const popup = document.getElementById(id);
  const isActive = popup.classList.contains('active');
  document.querySelectorAll('.triangle-popup.active').forEach(p => p.classList.remove('active'));
  if (!isActive) popup.classList.add('active');
}

document.body.addEventListener('click', e => {
  if (!e.target.closest('.pin') && !e.target.closest('.popup') && !e.target.closest('.triangle')) {
    document.querySelectorAll('.popup.active').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.pin.active').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.triangle-popup.active').forEach(p => p.classList.remove('active'));
  }
});

const wrap = document.getElementById('mapWrapper');
const zoomIn = document.getElementById('zoom-in-btn');
const zoomOut = document.getElementById('zoom-out-btn');

let scale = 1, min = 1, max = 2.5;
let tx = 0, ty = 0;
let dragging = false;
let startX = 0, startY = 0;
let startTx = 0, startTy = 0;

function apply() {
  wrap.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  wrap.style.transformOrigin = 'center center';
}

function getImageCenter() {
  const rect = wrap.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function zoom(dir) {
  const prevScale = scale;
  scale = Math.min(max, Math.max(min, scale + 0.2 * dir));
  const zoomFactor = scale / prevScale;

  const centerBefore = getImageCenter();

  tx = tx - (centerBefore.x - window.innerWidth / 2) * (zoomFactor - 1);
  ty = ty - (centerBefore.y - window.innerHeight / 2) * (zoomFactor - 1);

  apply();
}

zoomIn.addEventListener('click', () => zoom(1));
zoomOut.addEventListener('click', () => zoom(-1));

document.addEventListener('keydown', e => {
  if (e.key === '+' || e.key === '=') zoom(1);
  if (e.key === '-' || e.key === '_') zoom(-1);
});

wrap.addEventListener('pointerdown', e => {
  if (e.button !== 0 || e.target.closest('.zoom-controls')) return;
  dragging = true;
  startX = e.clientX;
  startY = e.clientY;
  startTx = tx;
  startTy = ty;
  wrap.classList.add('grabbing');
  e.preventDefault();
});

function movePan(e) {
  if (!dragging) return;
  tx = startTx + (e.clientX - startX) / scale;
  ty = startTy + (e.clientY - startY) / scale;
  apply();
}

function stopPan() {
  dragging = false;
  wrap.classList.remove('grabbing');
}

document.addEventListener('pointermove', movePan);
document.addEventListener('pointerup', stopPan);
document.addEventListener('pointercancel', stopPan);
