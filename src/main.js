import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js";
import { buildQuery, debounce, logEvent } from "./src/utils.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm";


logEvent('Wooden Design viewer initialized');
logEvent('THREE revision ' + THREE.REVISION);
logEvent('GLTFLoader available: ' + (typeof GLTFLoader === 'function'));

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

let scene, camera, renderer, controls, model;
let lastTextureName = "";
let currentTexture = null;
const params = {
  model: "models/plank1.gltf",
  roughness: 0.5,
  metalness: 0.0,
  clearcoat: 0,
  clearcoatRoughness: 0,
  specularIntensity: 1,
  specularColor: "#111111",
  sheenColor: "#000000",
  sheenRoughness: 0.5,
  anisotropy: 0,
  anisotropyRotation: 0,
  finish: "custom",
};

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("model")) params.model = urlParams.get("model");
if (urlParams.has("roughness"))
  params.roughness = parseFloat(urlParams.get("roughness"));
if (urlParams.has("metalness"))
  params.metalness = parseFloat(urlParams.get("metalness"));
if (urlParams.has("clearcoat"))
  params.clearcoat = parseFloat(urlParams.get("clearcoat"));
if (urlParams.has("clearcoatRoughness"))
  params.clearcoatRoughness = parseFloat(
    urlParams.get("clearcoatRoughness"),
  );
if (urlParams.has("specularIntensity"))
  params.specularIntensity = parseFloat(
    urlParams.get("specularIntensity"),
  );
if (urlParams.has("specularColor"))
  params.specularColor = urlParams.get("specularColor");
if (urlParams.has("sheenColor"))
  params.sheenColor = urlParams.get("sheenColor");
if (urlParams.has("sheenRoughness"))
  params.sheenRoughness = parseFloat(urlParams.get("sheenRoughness"));
if (urlParams.has("anisotropy"))
  params.anisotropy = parseFloat(urlParams.get("anisotropy"));
if (urlParams.has("anisotropyRotation"))
  params.anisotropyRotation = parseFloat(
    urlParams.get("anisotropyRotation"),
  );

const updateURL = debounce(() => {
  const q = buildQuery({
    model: params.model,
    roughness: params.roughness,
    metalness: params.metalness,
    clearcoat: params.clearcoat,
    clearcoatRoughness: params.clearcoatRoughness,
    specularIntensity: params.specularIntensity,
    specularColor: params.specularColor,
    sheenColor: params.sheenColor,
    sheenRoughness: params.sheenRoughness,
    anisotropy: params.anisotropy,
    anisotropyRotation: params.anisotropyRotation,
  });
  history.replaceState(null, "", `?${q}`);
}, 200);

init();
document.getElementById("modelSelect").value = params.model;
document.getElementById("finishSelect").value = params.finish;
loadModel(params.model);

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 2, 5);

  const container = document.getElementById("viewer");
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  logEvent('Renderer created at ' + renderer.domElement.width + 'x' + renderer.domElement.height);
  logEvent('WebGL version: ' + (renderer.capabilities.isWebGL2 ? 'WebGL2' : 'WebGL1'));

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = true;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE,
  };
  controls.update();
  logEvent('Camera initialized at ' + camera.position.toArray().join(', '));

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  window.addEventListener("resize", onWindowResize);
  animate();
}

function onWindowResize() {
  const container = document.getElementById("viewer");
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}
function loadModel(path) {
  if (["cube", "sphere", "cylinder"].includes(path)) {
    if (model) scene.remove(model);
    let geometry;
    if (path === "cube") geometry = new THREE.BoxGeometry();
    else if (path === "sphere") geometry = new THREE.SphereGeometry(1, 32, 16);
    else geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const material = new THREE.MeshPhysicalMaterial({
      roughness: params.roughness,
      metalness: params.metalness,
      clearcoat: params.clearcoat,
      clearcoatRoughness: params.clearcoatRoughness,
      specularIntensity: params.specularIntensity,
      specularColor: new THREE.Color(params.specularColor),
      sheenColor: new THREE.Color(params.sheenColor),
      sheenRoughness: params.sheenRoughness,
      anisotropy: params.anisotropy,
      anisotropyRotation: params.anisotropyRotation,
      side: THREE.DoubleSide,
      map: currentTexture || null,
    });
    model = new THREE.Mesh(geometry, material);
    scene.add(model);
    logEvent('Loaded model ' + path);
    updateURL();
    return;
  }
  const loader = new GLTFLoader();
  logEvent('Loading model ' + path);
  loader.load(
    path,
    (gltf) => {
      if (model) scene.remove(model);
      model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          // give paper-thin planks some thickness
          const pos = child.geometry.attributes.position;
          if (pos && pos.count === 4) {
            const box = new THREE.Box3().setFromBufferAttribute(pos);
            const w = box.max.x - box.min.x;
            const d = box.max.z - box.min.z;
            const thickness = 0.1;
            const geom = new THREE.BoxGeometry(w, thickness, d);
            geom.translate((box.max.x + box.min.x) / 2, thickness / 2, (box.max.z + box.min.z) / 2);
            child.geometry.dispose();
            child.geometry = geom;
          }
          const mat = new THREE.MeshPhysicalMaterial({
            map: currentTexture || child.material.map,
            roughness: params.roughness,
            metalness: params.metalness,
            clearcoat: params.clearcoat,
            clearcoatRoughness: params.clearcoatRoughness,
            specularIntensity: params.specularIntensity,
            specularColor: new THREE.Color(params.specularColor),
            sheenColor: new THREE.Color(params.sheenColor),
            sheenRoughness: params.sheenRoughness,
            anisotropy: params.anisotropy,
            anisotropyRotation: params.anisotropyRotation,
            side: THREE.DoubleSide,
          });
          child.material = mat;
        }
      });
      scene.add(model);
      logEvent('Loaded model ' + path);
      updateURL();
    },
    undefined,
    (err) => {
      logEvent('Failed to load model ' + err.message);
      console.error('Failed to load model', err);
    },
  );
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

document.getElementById("modelSelect").addEventListener("change", (e) => {
  params.model = e.target.value;
  loadModel(params.model);
});

document
  .getElementById("finishSelect")
  .addEventListener("change", (e) => {
    params.finish = e.target.value;
    if (params.finish === "matte") {
      params.roughness = 0.9;
      params.metalness = 0.0;
    } else if (params.finish === "satin") {
      params.roughness = 0.5;
      params.metalness = 0.0;
    } else if (params.finish === "gloss") {
      params.roughness = 0.1;
      params.metalness = 0.0;
    }
    roughCtrl.setValue(params.roughness);
    metalCtrl.setValue(params.metalness);
    updateMaterials();
  });

const textureLoader = new THREE.TextureLoader();
const dropArea = document.getElementById("dropArea");
const dropMessage = document.getElementById("dropMessage");
const preview = document.getElementById("texturePreview");
const fileInput = document.getElementById("textureInput");

dropArea.textContent = 'Drag & Drop Texture Here';
dropMessage.style.display = 'block';
preview.style.display = 'none';

function applyTexture(file) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const previewUrl = URL.createObjectURL(file);
  logEvent('Loading texture ' + file.name);
  preview.src = previewUrl;
  preview.style.display = 'block';
  dropMessage.style.display = 'none';
  preview.onload = () => {
    URL.revokeObjectURL(previewUrl);
  };
  textureLoader.load(
    url,
    (tex) => {
      if (model) {
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.map = tex;
            child.material.needsUpdate = true;
          }
        });
      }
      currentTexture = tex;
      URL.revokeObjectURL(url);
      updateMaterials();
      lastTextureName = file.name;
      logEvent('Texture applied to model');
    },
    undefined,
    (err) => {
      logEvent('Failed to load texture ' + err.message);
      console.error('Failed to load texture', err);
    },
  );
}

// Prevent the browser from opening files when dropped outside the drop zone
["dragenter", "dragover", "drop"].forEach((evt) => {
  window.addEventListener(evt, (e) => {
    e.preventDefault();
  });
});

dropArea.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dropArea.classList.add("hover");
});
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("hover");
});
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("hover");
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("hover");
  const file = e.dataTransfer.files[0];
  applyTexture(file);
});

dropArea.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  applyTexture(file);
  fileInput.value = "";
});

const gui = new GUI();
const roughCtrl = gui
  .add(params, "roughness", 0, 1, 0.01)
  .onChange(updateMaterials);
const metalCtrl = gui
  .add(params, "metalness", 0, 1, 0.01)
  .onChange(updateMaterials);
const ccCtrl = gui
  .add(params, "clearcoat", 0, 1, 0.01)
  .onChange(updateMaterials);
const ccrCtrl = gui
  .add(params, "clearcoatRoughness", 0, 1, 0.01)
  .onChange(updateMaterials);
const specCtrl = gui
  .add(params, "specularIntensity", 0, 2, 0.01)
  .onChange(updateMaterials);
const specColorCtrl = gui
  .addColor(params, "specularColor")
  .onChange(updateMaterials);
const sheenColorCtrl = gui
  .addColor(params, "sheenColor")
  .onChange(updateMaterials);
const sheenRoughCtrl = gui
  .add(params, "sheenRoughness", 0, 1, 0.01)
  .onChange(updateMaterials);
const anisoCtrl = gui
  .add(params, "anisotropy", 0, 1, 0.01)
  .onChange(updateMaterials);
const anisoRotCtrl = gui
  .add(params, "anisotropyRotation", 0, Math.PI * 2, 0.01)
  .onChange(updateMaterials);

roughCtrl.setValue(params.roughness);
metalCtrl.setValue(params.metalness);
ccCtrl.setValue(params.clearcoat);
ccrCtrl.setValue(params.clearcoatRoughness);
specCtrl.setValue(params.specularIntensity);
specColorCtrl.setValue(params.specularColor);
sheenColorCtrl.setValue(params.sheenColor);
sheenRoughCtrl.setValue(params.sheenRoughness);
anisoCtrl.setValue(params.anisotropy);
anisoRotCtrl.setValue(params.anisotropyRotation);

  function updateMaterials() {
    if (model) {
      model.traverse((child) => {
        if (child.isMesh) {
          Object.assign(child.material, {
            roughness: params.roughness,
            metalness: params.metalness,
            clearcoat: params.clearcoat,
            clearcoatRoughness: params.clearcoatRoughness,
            specularIntensity: params.specularIntensity,
            specularColor: new THREE.Color(params.specularColor),
            sheenColor: new THREE.Color(params.sheenColor),
            sheenRoughness: params.sheenRoughness,
            anisotropy: params.anisotropy,
            anisotropyRotation: params.anisotropyRotation,
            side: THREE.DoubleSide,
          });
          child.material.needsUpdate = true;
        }
      });
    }
    updateURL();
  }

const ev = document.getElementById('eventViewer');
const evSummary = ev.querySelector('summary');
let startY = 0;
let startH = 0;
evSummary.addEventListener('mousedown', (e) => {
  e.preventDefault();
  startY = e.clientY;
  startH = ev.offsetHeight;
  document.body.style.userSelect = 'none';
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', endDrag);
});

function onDrag(e) {
  const diff = startY - e.clientY;
  const minH = evSummary.offsetHeight;
  const h = Math.max(minH, startH + diff);
  ev.style.height = h + 'px';
}

function endDrag() {
  document.body.style.userSelect = '';
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', endDrag);
}
