import * as THREE from 'three';

var container;
var camera, scene, renderer, group, particle;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0005);

  group = new THREE.Group();
  scene.add(group);

  for (var i = 0; i < 1000; i++) {
    var material = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(generateSprite()),
      color: Math.random() * 0x808080 + 0x808080,
    });

    particle = new THREE.Sprite(material);
    particle.position.x = Math.random() * 2000 - 1000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = Math.random() * 2000 - 1000;
    particle.scale.x = particle.scale.y = Math.random() * 30 + 15;
    group.add(particle);
  }

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('pointermove', onPointerMove, false);
  window.addEventListener('resize', onWindowResize, false);
}

function generateSprite() {
  var canvas = document.createElement('canvas');
  const size = 128;
  canvas.width = size;
  canvas.height = size;
  var context = canvas.getContext('2d');
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'rgba(255, 255, 255, 1)';
  context.fill();
  return canvas;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.001;
  camera.position.y += (-mouseY - camera.position.y) * 0.001;
  camera.lookAt(scene.position);

  //group.rotation.x += 0.001;
  //group.rotation.y += 0.001;

  renderer.render(scene, camera);
}