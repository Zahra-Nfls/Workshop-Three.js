// import * as THREE from 'three'

// // Canvas
// const canvas = document.querySelector('.webgl')

// Scene
// const scene = new THREE.Scene()

// // Objet
// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color : 0xff0000})
// const mesh = new THREE.Mesh(geometry, material)

// scene.add(mesh)

// // Sizes

// const sizes = {
// 	width : 800, 
// 	height: 600
// }

// // Camera

// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z = 3
// scene.add(camera)

// // Renderer

// const renderer = new THREE.WebGLRenderer({
// 	canvas : canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)

// // Animation

// const tick = () => {
// 	// Update de l'objet
// 	mesh.rotation.y += 0.01
// 	mesh.rotation.x += 0.01

	
// 	// On déplace le render dans la fonction pour que à chaque frame, on réaffiche l'objet avec sa position modifiée
// 	renderer.render(scene, camera)
	
// 	// On appelle tick sur la prochaine frame
// 	window.requestAnimationFrame(tick)
// }

// tick()



// // Created heart shape object
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create heart shape using a custom path
// const heartShape = new THREE.Shape();
// heartShape.moveTo(0, 0.5);
// heartShape.bezierCurveTo(0.5, 1.5, 2, 1, 0, -1.5);
// heartShape.bezierCurveTo(-2, 1, -0.5, 1.5, 0, 0.5);

// // Create the geometry from the heart shape and add volume using ExtrudeGeometry
// const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.2, bevelThickness: 0.1 };
// const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

// // Create material and mesh
// const material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 });
// const heartMesh = new THREE.Mesh(heartGeometry, material);
// scene.add(heartMesh);

// // Add lighting
// const ambientLight = new THREE.AmbientLight(0x404040); // Soft light
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

// // Position the camera
// camera.position.z = 5;

// // Animation function
// function animate() {
//     requestAnimationFrame(animate);
    
//     // Rotate the heart for animation
//     heartMesh.rotation.x += 0.01;
//     heartMesh.rotation.y += 0.01;
    
//     renderer.render(scene, camera);
// }

// // Start the animation
// animate();

// // Handle window resizing
// window.addEventListener('resize', () => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
// });

import * as THREE from 'three'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { TextGeometry } from 'three/examples/jsm/Addons.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Font
const fontLoader = new FontLoader()
const font = fontLoader.parse(typefaceFont)

//Geometry

const textGeometry = new TextGeometry(
  'Hi There <3',
  {
    font: font, 
    size: 0.5,
    depth: 0.2,
    curveSegments:12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  }
)

textGeometry.center()

//texture
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('./texture/2.png')
  matcapTexture.colorSpace = THREE.SRGBColorSpace


const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture,
})
const text= new THREE.Mesh(textGeometry, material)
scene.add(text)

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 100);
const donutMaterial = new THREE.MeshMatcapMaterial({
  matcap : matcapTexture,
})
for (let i = 0; i < 80 ; i++) {
  const donut = new THREE.Mesh(donutGeometry, donutMaterial)
  scene.add(donut)

  donut.position.x = (Math.random() - 0.5) * 10
donut.position.y = (Math.random() - 0.5) * 10
donut.position.z = (Math.random() - 0.5) * 10

donut.rotation.x = Math.random() * Math.PI
donut.rotation.y = Math.random() * Math.PI

const scale = Math.random()
donut.scale.set(scale, scale, scale) 

}



//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 3
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

const controls = new OrbitControls( camera, renderer.domElement ); 
camera.position.set(0, 5, 7);
controls.update() 



const animate = () => {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

animate()