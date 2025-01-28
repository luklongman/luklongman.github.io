// qrThree.js

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const materials = Array.from({ length: 6 }, () => new THREE.MeshStandardMaterial({
  map: currentTexture,
  metalness: 0,
  roughness: 0.2,
  envMapIntensity: 1,
  color: 0xffffff, // Color of the material
  emissive: 0x000000, // Emissive color of the material
  emissiveIntensity: 1, // Intensity of the emissive color
  opacity: 1, // Opacity of the material
  transparent: false, // Whether the material is transparent
  wireframe: false, // Whether to render the material as a wireframe
  flatShading: false // Whether to use flat shading
}));

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

function easeOutQuint(t) {
  return 1 + (--t) * t * t * t * t;
}

var Posz_start = 9000;
var Posz_end = 4.5;
var Posy_start = 1200;
var Posy_end = -0.333;
const approachDuration = 3200;
camera.position.z = Posz_start;
camera.position.y = Posy_start;

// Start with a random angle
cube.rotation.x = Math.random() * Math.PI * 2;
cube.rotation.y = Math.random() * Math.PI * 2;

const startTime = Date.now();

const levitationAmplitude = 0.0015;
const levitationFrequency = 0.0008;

const animate = function () {
  requestAnimationFrame(animate);
  
  const elapsedTime = Date.now() - startTime;
  const levitation = levitationAmplitude * Math.sin(elapsedTime * levitationFrequency);
  
  if (elapsedTime < approachDuration) {
    const t = elapsedTime / approachDuration;
    const easedT = easeOutQuint(t);
    camera.position.z = Posz_start - ((Posz_start - Posz_end) * easedT); // Approach to z = 4.5
    camera.position.y = Posy_start + ((Posy_end - Posy_start) * easedT); // Approach to y = 0
    cube.rotation.x += 0.06 * (1 - easedT) + 0.003 * easedT; // Ease into constant rotation speed
    cube.rotation.y += 0.04 * (1 - easedT) + 0.002 * easedT; // Ease into constant rotation speed
  } else {
    camera.position.z = Posz_end; // Final position
    camera.position.y = Posy_end; // Final position
    cube.rotation.x += 0.003; // Constant rotation speed
    cube.rotation.y += 0.002; // Constant rotation speed
    cube.position.y += levitation; // Levitating motion
  }

  renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.35); // Dim ambient light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 85); // Brighter point light
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create a particle system for the background
const particleCount = 8000;
const particles = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const qrTextures = [];

// Generate QR code textures
qrSamples.forEach((text, index) => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  QRCode.toCanvas(canvas, text, { width: 64, margin: 0 }, (error) => {
    if (error) console.error(error);
    qrTextures[index] = new THREE.CanvasTexture(canvas);
  });
});

// Generate random positions for particles
for (let i = 0; i < particleCount; i++) {
  const x = (Math.random() * 2 - 1) * 3000;
  const y = (Math.random() * 2 - 1) * 300;
  const z = (Math.random() * 2 - 1) * 1500;

  particlePositions[i * 3] = x;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = z;
}

particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

const particleMaterial = new THREE.PointsMaterial({
  color: 0xaaaaaa,
  size: 1,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

function animateParticles() {
  requestAnimationFrame(animateParticles);

  // Rotate the particle system
  particleSystem.rotation.y += 0.001;

  // Billboarding: make particles always face the camera
  particleSystem.children.forEach(particle => {
    particle.lookAt(camera.position);
  });

  // Assign QR code textures to close particles
  const positions = particles.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    const distance = Math.sqrt(
      positions[i * 3] ** 2 +
      positions[i * 3 + 1] ** 2 +
      positions[i * 3 + 2] ** 2
    );
    if (distance < 50) {
      const textureIndex = Math.floor(Math.random() * qrSamples.length);
      particleMaterial.map = qrTextures[textureIndex];
      particleMaterial.needsUpdate = true;
    }
  }

  renderer.render(scene, camera);
}

animateParticles();
