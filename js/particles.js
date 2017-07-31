var container, stats;
var camera, scene, renderer, group, particle;
var mouseX = 0,
  mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 1000;

  scene = new THREE.Scene();

  var PI2 = Math.PI * 2;
  var program = function (context) {
    context.beginPath();
    context.arc(0, 0, 0.5, 0, PI2, true);
    context.fill();
  };

  group = new THREE.Group();
  scene.add(group);

  for (var i = 0; i < 1000; i++) {
    var material = new THREE.SpriteCanvasMaterial({
      color: Math.random() * 0x808080 + 0x808080,
      program: program
    });

    var material2 = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(generateSprite()),
      blending: THREE.AdditiveBlending
    });

    particle = new THREE.Sprite(material);
    particle.position.x = Math.random() * 2000 - 1000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = Math.random() * 2000 - 1000;
    particle.scale.x = particle.scale.y = Math.random() * 30 + 15;
    group.add(particle);
  }

  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //stats = new Stats();
  //container.appendChild(stats.dom);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);

  window.addEventListener('resize', onWindowResize, false);
}

function generateSprite() {
  var canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  var context = canvas.getContext('2d');
  var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height /
    2, canvas.width / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  //gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
  gradient.addColorStop(0.2, rndrnd());
  gradient.addColorStop(0.6, 'rgba(0,0,64,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,1)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

function rnd() {
  return Math.floor(Math.random() * 128 + 127);
}

function rndrnd() {
  return `rgba(${rnd()},${rnd()},${rnd()},1)`;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function animate() {
  requestAnimationFrame(animate);

  render();
  //stats.update();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.001;
  camera.position.y += (-mouseY - camera.position.y) * 0.001;
  camera.lookAt(scene.position);

  //group.rotation.x += 0.001;
  //group.rotation.y += 0.001;

  renderer.render(scene, camera);
}