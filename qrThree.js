// qrThree.js

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const materials = [];

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

function easeOutQuint(t) {
  return 1 + (--t) * t * t * t * t;
}

var Posz_start = 50;
var Posz_end = 4.5;
var Posy_start = 40;
var Posy_end = -0.333;
const approachDuration = 3000;
camera.position.z = Posz_start;
camera.position.y = Posy_start;

// Start with a random angle
cube.rotation.x = Math.random() * Math.PI * 2;
cube.rotation.y = Math.random() * Math.PI * 2;

const startTime = Date.now();

const animate = function () {
  requestAnimationFrame(animate);

  const elapsedTime = Date.now() - startTime;
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
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create a particle system for the background
const particleCount = 5000;
const particles = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  const x = Math.random() * 2000 - 1000;
  const y = Math.random() * 2000 - 1000;
  const z = Math.random() * 2000 - 1000;

  particlePositions[i * 3] = x;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = z;
}

particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

const particleMaterial = new THREE.PointsMaterial({
  color: 0x888888,
  size: 1,
  transparent: true,
  opacity: 0.7,
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

function animateParticles() {
  requestAnimationFrame(animateParticles);

  particleSystem.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animateParticles();
