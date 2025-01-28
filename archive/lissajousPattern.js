const leftOscCanvas = document.getElementById('leftOsc');
const rightOscCanvas = document.getElementById('rightOsc');
const xyOscCanvas = document.getElementById('xyOsc');
const leftOscCtx = leftOscCanvas.getContext('2d');
const rightOscCtx = rightOscCanvas.getContext('2d');
const xyOscCtx = xyOscCanvas.getContext('2d');

let leftFreq = 440, rightFreq = 440;
let leftShape = 0, rightShape = 0;

// Function to draw the Lissajous pattern
function drawLissajous() {
    leftOscCtx.clearRect(0, 0, leftOscCanvas.width, leftOscCanvas.height);
    rightOscCtx.clearRect(0, 0, rightOscCanvas.width, rightOscCanvas.height);
    xyOscCtx.clearRect(0, 0, xyOscCanvas.width, xyOscCanvas.height);

    const amp = 100;
    const samples = 1000;

    // Draw left and right oscillators
    leftOscCtx.beginPath();
    rightOscCtx.beginPath();
    xyOscCtx.beginPath();

    for (let i = 0; i < samples; i++) {
        let x = i / samples * 2 * Math.PI;
        let leftVal = amp * Math.sin(leftFreq * x + leftShape);
        let rightVal = amp * Math.sin(rightFreq * x + rightShape);

        leftOscCtx.lineTo(i, amp + leftVal);
        rightOscCtx.lineTo(i, amp + rightVal);

        // Draw on XY oscilloscope
        xyOscCtx.lineTo(amp + leftVal, amp + rightVal);
    }

    leftOscCtx.stroke();
    rightOscCtx.stroke();
    xyOscCtx.stroke();
}

// Update the frequencies and shapes based on sliders
document.getElementById('leftFreq').addEventListener('input', function() {
    leftFreq = this.value;
    drawLissajous();
});

document.getElementById('rightFreq').addEventListener('input', function() {
    rightFreq = this.value;
    drawLissajous();
});

document.getElementById('leftShape').addEventListener('input', function() {
    leftShape = this.value;
    drawLissajous();
});

document.getElementById('rightShape').addEventListener('input', function() {
    rightShape = this.value;
    drawLissajous();
});

// Bonus: Save functionality
document.getElementById('saveBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'lissajous.png';
    link.href = xyOscCanvas.toDataURL();
    link.click();
});

drawLissajous();