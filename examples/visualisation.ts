// const THREE = require('three');
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import AABB from '../src/AABB';
import AABBTree from '../src/AABBTree';
import Shape from './shape';

// Basic setup for camera
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera);
camera.position.z = 5;

// Add Shapes
const tree = new AABBTree();
const Shape1 = new Shape(-2, -2, -2, -1, -1, -1);
const Shape2 = new Shape(-1, -1, -1, 0, 0, 0);
const Shape3 = new Shape(0, 0, 0, 1, 1, 1);
const Shape4 = new Shape(1, 1, 1, 2, 2, 2);
const Shape5 = new Shape(1, 1, -2, 2, 2, -1);
tree.AddShape(Shape1);
tree.AddShape(Shape2);
tree.AddShape(Shape3);
tree.AddShape(Shape4);
tree.AddShape(Shape5);

tree.GetAllNodes().forEach(node => {
  if (node.Shape === undefined) {
    AddCubeOutline(node.Aabb);
  } else {
    AddCube(node.Aabb);
  }
});

function AddCubeOutline(aabb: AABB) {
  const geom = new THREE.BoxBufferGeometry(aabb.Width, aabb.Height, aabb.Depth);
  const edges = new THREE.EdgesGeometry(geom);
  const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
  const centerX = (aabb.MaxX + aabb.MinX) / 2;
  const centerY = (aabb.MaxY + aabb.MinY) / 2;
  const centerZ = (aabb.MaxZ + aabb.MinZ) / 2;
  lines.position.set(centerX, centerY, centerZ);
  scene.add(lines);
}

function AddCube(aabb: AABB) {
  const geom = new THREE.BoxGeometry(aabb.Width, aabb.Height, aabb.Depth);
  const mat = new THREE.MeshBasicMaterial({ color: 0x2cddab });
  let cube = new THREE.Mesh(geom, mat);
  const centerX = (aabb.MaxX + aabb.MinX) / 2;
  const centerY = (aabb.MaxY + aabb.MinY) / 2;
  const centerZ = (aabb.MaxZ + aabb.MinZ) / 2;
  cube.position.set(centerX, centerY, centerZ);
  scene.add(cube);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function Clear() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
}

animate();
