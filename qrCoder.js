const qrCanvas = document.createElement('canvas');
const moduleCount = 29;
const moduleWidth = 8;
const size = moduleCount * moduleWidth;

qrCanvas.width = size;
qrCanvas.height = size;

const qrColors = {
  dark: '#002040',
  light: '#FDF5E6',
};

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

function updateQRCode() {
  const datetime = getFormattedDateTime();
  const text = `${datetime}`;
  QRCode.toCanvas(
    qrCanvas,
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

      const texture = new THREE.CanvasTexture(qrCanvas);
      for (let i = 0; i < 6; i++) {
        materials[i] = new THREE.MeshStandardMaterial({
          map: texture,
          envMap: scene.background,
          metalness: 0,
          roughness: 0.5,
          reflectivity: 1,
          clearcoat: 0.5,
          clearcoatRoughness: 0,
          envMapIntensity: 1,
        });
      }
      cube.material = materials;
    }
  );

  document.title = toggleTitle ? "Time" : "Time.";
  toggleTitle = !toggleTitle;
}

// Update QR code every second
setInterval(updateQRCode, 1000);
updateQRCode(); // Initial call
