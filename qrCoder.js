const qrCanvas1 = document.createElement('canvas');
const qrCanvas2 = document.createElement('canvas');
const moduleCount = 29;
const moduleWidth = 8;
const size = moduleCount * moduleWidth;

qrCanvas1.width = size;
qrCanvas1.height = size;
qrCanvas2.width = size;
qrCanvas2.height = size;

const qrColors = {
  dark: '#002040',
  light: '#FDF5E6',
};

const qrSamples = [
  "Hello World",
  "What? You found me?",
  "Keep exploring!",
  "Awesome!",
  "Keep going!",
  "Nice to meet you!",
  "How are enjoying the journey?"
];

function getFormattedDateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${hours}:${minutes}:${seconds}, ${day}/${month}/${year}`;
}

let toggleTitle = true;

let currentTexture = new THREE.CanvasTexture(qrCanvas1);
let nextTexture = new THREE.CanvasTexture(qrCanvas2);
let blendFactor = 0;
let blending = false;
let blendFactorIncrement = 1 / 12; // Initial blend factor increment

function updateQRCode() {
  const datetime = getFormattedDateTime();
  const text = `${datetime}`;
  const targetCanvas = blending ? qrCanvas2 : qrCanvas1;
  QRCode.toCanvas(
    targetCanvas,
    text,
    {
      width: size,
      margin: 0,
      version: 3,
      color: {
        dark: qrColors.dark,
        light: qrColors.light,
      },
    },
    (error) => {
      if (error) console.error(error);

      if (blending) {
        nextTexture = new THREE.CanvasTexture(targetCanvas);
      } else {
        currentTexture = new THREE.CanvasTexture(targetCanvas);
      }

      blendFactor = 0;
      blending = true;

      // Swap textures
      const temp = currentTexture;
      currentTexture = nextTexture;
      nextTexture = temp;

      for (let i = 0; i < 6; i++) {
        cube.material[i].map = currentTexture;
        cube.material[i].needsUpdate = true;
      }
    }
  );

  document.title = toggleTitle ? "Time" : "Time.";
  toggleTitle = !toggleTitle;
}

  // Toggle blend factor increment every minute
  setInterval(() => {
    if (blendFactorIncrement === 1 / 12) {
      blendFactorIncrement = 1;
    } else if (Math.random() < 0.01) {
      blendFactorIncrement = 1 / 12;
      setTimeout(() => {
        blendFactorIncrement = 1;
      }, 12000);
    }
}, 1000);

// Update QR code every second
setInterval(updateQRCode, 1000);
updateQRCode(); // Initial call
