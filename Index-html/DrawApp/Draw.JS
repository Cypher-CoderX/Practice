const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
let tool = 'brush';  // Default tool
let color = '#000000';  // Default color
let size = 5;  // Default brush size
let smudgeStrength = 50;
let stabilizer = 5;

const colorPicker = document.getElementById('colorPicker');
const backgroundColorPicker = document.getElementById('backgroundColorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const stabilizerSlider = document.getElementById('stabilizerSlider');
const smudgeSlider = document.getElementById('smudgeSlider');
const notification = document.getElementById('notification');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

let selectedBackgroundColor = '#ffffff';  // Default background color

colorPicker.addEventListener('change', (e) => color = e.target.value);
sizeSlider.addEventListener('input', (e) => size = e.target.value);
stabilizerSlider.addEventListener('input', (e) => stabilizer = e.target.value);
smudgeSlider.addEventListener('input', (e) => smudgeStrength = e.target.value);

const buttons = {
    brush: document.getElementById('brushButton'),
    eraser: document.getElementById('eraserButton'),
    fill: document.getElementById('fillButton'),
    smudge: document.getElementById('smudgeButton'),
    clear: document.getElementById('clearButton'),
    changeBackground: document.getElementById('changeBackgroundButton')
};

Object.keys(buttons).forEach(key => {
    buttons[key].addEventListener('click', () => selectTool(key));
});

function selectTool(selectedTool) {
    tool = selectedTool;

    // Show smudge slider only when smudge tool is selected
    smudgeSlider.style.display = tool === 'smudge' ? 'block' : 'none';

    // Clear active class on all buttons and add it to the selected button
    Object.keys(buttons).forEach(key => {
        buttons[key].classList.remove('active');
    });
    buttons[tool].classList.add('active');
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(e) {
    drawing = true;
    if (tool === 'fill') {
        floodFill(e.offsetX, e.offsetY, color);
    } else {
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function draw(e) {
    if (!drawing) return;

    if (tool === 'brush') {
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    } else if (tool === 'eraser') {
        ctx.clearRect(e.offsetX, e.offsetY, size, size);
    } else if (tool === 'smudge') {
        smudge(e.offsetX, e.offsetY, smudgeStrength);
    }
}

function floodFill(x, y, fillColor) {
    const targetColor = ctx.getImageData(x, y, 1, 1).data;
    const fillStack = [[x, y]];

    const isSameColor = (color1, color2) => {
        return color1[0] === color2[0] && color1[1] === color2[1] &&
               color1[2] === color2[2] && color1[3] === color2[3];
    };

    while (fillStack.length > 0) {
        const [currentX, currentY] = fillStack.pop();

        const currentColor = ctx.getImageData(currentX, currentY, 1, 1).data;

        if (!isSameColor(currentColor, targetColor)) continue;

        ctx.fillStyle = fillColor;
        ctx.fillRect(currentX, currentY, 1, 1);

        // Push neighboring pixels onto stack
        if (currentX > 0) fillStack.push([currentX - 1, currentY]);
        if (currentX < canvas.width - 1) fillStack.push([currentX + 1, currentY]);
        if (currentY > 0) fillStack.push([currentX, currentY - 1]);
        if (currentY < canvas.height - 1) fillStack.push([currentX, currentY + 1]);
    }
}

function smudge(x, y, strength) {
    const imageData = ctx.getImageData(x - strength / 2, y - strength / 2, strength, strength);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Apply smudge by averaging colors
        data[i] = (data[i] + data[i + 4] + data[i + 4 * strength]) / 3;     // Red
        data[i + 1] = (data[i + 1] + data[i + 5] + data[i + 4 * strength + 1]) / 3; // Green
        data[i + 2] = (data[i + 2] + data[i + 6] + data[i + 4 * strength + 2]) / 3; // Blue
    }

    ctx.putImageData(imageData, x - strength / 2, y - strength / 2);
}

buttons.clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

buttons.changeBackground.addEventListener('click', () => {
    // Show the notification and let user confirm
    notification.style.display = 'block';

    // Store the selected color
    selectedBackgroundColor = backgroundColorPicker.value;
});

confirmYes.addEventListener('click', () => {
    // If user confirms, change the background and clear the canvas
    document.body.style.background= selectedBackgroundColor;
    ctx.fillStyle = selectedBackgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Clear previous drawings

    // Hide notification after changing the background
    notification.style.display = 'none';
});

confirmNo.addEventListener('click', () => {
    // If user cancels, just hide the notification
    notification.style.display = 'none';
});

window.addEventListener('resize', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCanvas.getContext('2d').drawImage(canvas, 0, 0);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.drawImage(tempCanvas, 0, 0);
});
