import './style.css'
import * as THREE from 'three'


// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('NormalMap.png')

// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.SphereGeometry( 1.2 , 200, 500, 10 );
const geometry = new THREE.TorusKnotGeometry( 3 , .09, 200, 8, 3, 4 );
// const geometry = new THREE.PlaneGeometry( 1 , 5, 100, 100 );

// Materials

const material = new THREE.MeshPhysicalMaterial()
material.color = new THREE.Color(0xffffff)
material.reflectivity = 0;
material.normalMap = normalTexture;
material.thickness = 1;
material.ior = 0;

// Mesh

const sphere = new THREE.Mesh(geometry,material)

scene.add(sphere)

// Lights

// Light One 

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light Two

const pointLight2 = new THREE.PointLight(0xffffff, 1)
pointLight2.position.set(-3.5,1.79,-3.06)
pointLight2.intensity = 1;
scene.add(pointLight2)

// Light three

const pointLight3 = new THREE.PointLight(0x4d4d61, 1)
pointLight3.position.set(-10,1,1)
pointLight3.intensity = .5;
pointLight3.decay = 2;
pointLight3.distance = 'Physically';
pointLight3.shadow = 1000;
scene.add(pointLight3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove )
let mouseX = 0;
let mouseY = 0;

let targetX = 0; 
let targetY  = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove (event) {
     mouseX = (event.clientX - windowHalfX)
     mouseY = (event.clientY - windowHalfY)
}

window.addEventListener('scroll', updateSphere);

function updateSphere (event) {
    sphere.position.y = window.scrollY * .01;
}

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .08 * elapsedTime

    sphere.rotation.y += .3 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .3 * (targetY  - sphere.rotation.x)
    sphere.position.z += -1 * (targetY - sphere.rotation.x)



    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()