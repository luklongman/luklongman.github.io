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
      blendTextures();
    }
  );

  document.title = toggleTitle ? "Time" : "Time.";
  toggleTitle = !toggleTitle;
}

function blendTextures() {
  if (blendFactor < 1) {
    blendFactor += blendFactorIncrement; // Use the toggled blend factor increment
    for (let i = 0; i < 6; i++) {
      materials[i] = new THREE.MeshStandardMaterial({
        envMap: scene.background,
        metalness: 0,
        roughness: 0.5,
        reflectivity: 1,
        clearcoat: 0.5,
        clearcoatRoughness: 0,
        envMapIntensity: 1,
      });
      materials[i].onBeforeCompile = (shader) => {
        shader.uniforms.currentTexture = { value: currentTexture };
        shader.uniforms.nextTexture = { value: nextTexture };
        shader.uniforms.blendFactor = { value: blendFactor };
        shader.vertexShader = `
          varying vec2 vUv;
          ${shader.vertexShader}
        `.replace(
          `#include <uv_vertex>`,
          `#include <uv_vertex>
           vUv = uv;`
        );
        shader.fragmentShader = `
          uniform sampler2D currentTexture;
          uniform sampler2D nextTexture;
          uniform float blendFactor;
          varying vec2 vUv;
          ${shader.fragmentShader}
        `.replace(
          `gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
          `
          vec4 currentColor = texture2D(currentTexture, vUv);
          vec4 nextColor = texture2D(nextTexture, vUv);
          gl_FragColor = mix(currentColor, nextColor, blendFactor);
          `
        );
      };
    }
    cube.material = materials;
    requestAnimationFrame(blendTextures);
  } else {
    blending = false;
    // Swap textures
    const temp = currentTexture;
    currentTexture = nextTexture;
    nextTexture = temp;
  }
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
