import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

let model = null;

const gltfLoader = new GLTFLoader();
gltfLoader.load('./models/Duck/glTF-Binary/Duck.glb', (gltf) => {
    model = gltf.scene
    model.position.y = -1.2;
   scene.add(model)
    
})

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.9)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 2.1)
directionalLight.position.set(1, 2, 3)
scene.add(directionalLight)
/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3);

const raycaster = new THREE.Raycaster();





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

const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (_event)=> {
mouse.x = _event.clientX / sizes.width * 2 - 1;
mouse.y = - (_event.clientY / sizes.height * 2) + 1;

})

window.addEventListener('click', () => {
if(currentIntersect){}
})




/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()


    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

    raycaster.setFromCamera(mouse, camera)

//     const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
// rayDirection.normalize();

// raycaster.set(rayOrigin, rayDirection);

const objectsToTest = [object1, object2, object3];

const intersects = raycaster.intersectObjects(objectsToTest);

for(const object of objectsToTest){
    object.material.color.set('#ff0000')
}
for(const intersect of intersects){
    intersect.object.material.color.set('#000fff')
}

// if(intersects.length){
//     if(currentIntersect === null){
//         console.log('mouse enter');
        
//     }
// }else{
//     if(currentIntersect){
//         console.log('mouse leave');
//     }
//     console.log('no');
// }

if(model){
const modelIntersects = raycaster.intersectObject(model);
console.log(modelIntersects);
}

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()