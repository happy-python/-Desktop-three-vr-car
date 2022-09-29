import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 图片
const front = require("./lk06-front.jpeg");
const back = require("./lk06-back.jpeg");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  1,
  1100
);
camera.position.set(0, 0, 50);

// 纹理
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load(front);
const texture2 = textureLoader.load(back);

// 球体
const geometry = new THREE.SphereGeometry(50, 50, 50);
geometry.scale(-1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  map: texture1,
  alphaMap: texture2,
});
const cube = new THREE.Mesh(geometry, material);
// 旋转
cube.rotateY(5);
cube.rotateZ(-0.5);
scene.add(cube);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").replaceChildren(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
// 阻尼感
controls.enableDamping = true;
// 缩放速度、距离
controls.zoomSpeed = 2;
controls.maxDistance = 70;
controls.minDistance = 10;
// 自动旋转
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
function animation() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}

// 前排
document.getElementById("front").onclick = () => {
  material.map = texture1;
};

// 后排
document.getElementById("back").onclick = () => {
  material.map = texture2;
};

// 页面缩放
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// 双击全屏
window.addEventListener("dblclick", () => {
  const fullscreen = document.fullscreenElement;
  fullscreen ? document.exitFullscreen() : document.body.requestFullscreen();
});

animation();
