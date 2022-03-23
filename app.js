const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const modeBtn = document.querySelector('#jsMode');
const eraseBtn = document.querySelector('#jsErase');
const resetBtn = document.querySelector('#jsReset');
const saveBtn = document.querySelector('#jsSave');
const rainbow = document.querySelector('.rainbow');

const INITIAL_COLOR = '#2c2c2c';

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.lineCap = 'round';

let painting = false;
let filling = false;

function startPainting() {
  if (!filling) {
    painting = true;
  }
}

function stopPainting(e) {
  painting = false;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeSize(e) {
  const rangeSize = e.target.value;
  ctx.lineWidth = rangeSize;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleModelick() {
  if (filling) {
    modeBtn.innerHTML = '<i class="fa-solid fa-fill">';
    filling = false;
    ctx.globalCompositeOperation = 'source-over';
    canvas.style.cursor = "url(' img/paintbrush.png'), pointer";
  } else {
    modeBtn.innerHTML = '<i class="fa-solid fa-paintbrush"></i>';
    filling = true;
    ctx.globalCompositeOperation = 'source-over';
    canvas.style.cursor = "url('img/paintbucket.png'), pointer";
  }
}

function handleEraseClick() {
  ctx.globalCompositeOperation = 'destination-out';
  canvas.style.cursor = "url('img/eraser2.png') 10 10, pointer";
  filling = false;
  modeBtn.innerHTML = '<i class="fa-solid fa-fill">';
}

function handleResetClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleContextMenu(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS🎨';
  link.click();
}

/* rainbow */
function setRgbColor(rgb) {
  ctx.strokeStyle = rgb;
  ctx.fillStyle = rgb;
}

function rgb() {
  let randomColor = 'rgb(';
  for (let i = 0; i < 3; i++) {
    randomColor += Math.floor(Math.random() * 255) + ',';
  }
  return randomColor.replace(/\,$/, ')');
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleContextMenu);
}

colors.forEach((color) => color.addEventListener('click', handleColorClick));

if (range) {
  range.addEventListener('input', handleRangeSize);
}

if (modeBtn) {
  modeBtn.addEventListener('click', handleModelick);
}

if (eraseBtn) {
  eraseBtn.addEventListener('click', handleEraseClick);
}

if (resetBtn) {
  resetBtn.addEventListener('click', handleResetClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}

rainbow.addEventListener('click', () => {
  setRgbColor(rgb());
});
