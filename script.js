// Smooth Scroll
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,5000);


// Renderer with transparent background
const renderer=new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background


// Stars
const starsGeometry=new THREE.BufferGeometry();
const starCount=5000;
const positions=new Float32Array(starCount*3);
for(let i=0;i<starCount*3;i++){positions[i]=(Math.random()-0.5)*2000;}
starsGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
const starsMaterial=new THREE.PointsMaterial({color:0xffffff,size:0.5});
const starField=new THREE.Points(starsGeometry,starsMaterial);
scene.add(starField);


// Planets
const textureLoader=new THREE.TextureLoader();
function createPlanet(textureURL,size,distance,speed){
const geometry=new THREE.SphereGeometry(size,32,32);
const material=new THREE.MeshStandardMaterial({map:textureLoader.load(textureURL)});
const planet=new THREE.Mesh(geometry,material);
planet.userData={distance,speed,angle:Math.random()*Math.PI*2};
scene.add(planet);
return planet;
}
const planets=[
createPlanet('images/earth.jpg',10,100,0.01),
createPlanet('images/mars.jpg',7,150,0.008)
];


// Lights
const ambientLight=new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambientLight);
const pointLight=new THREE.PointLight(0xffffff,1);
pointLight.position.set(0,0,0);
scene.add(pointLight);


camera.position.z=300;


// Animate
function animate(){
requestAnimationFrame(animate);
starField.rotation.y+=0.0005;
starField.rotation.x+=0.0002;
planets.forEach(p=>{
p.userData.angle+=p.userData.speed;
p.position.x=Math.cos(p.userData.angle)*p.userData.distance;
p.position.z=Math.sin(p.userData.angle)*p.userData.distance;
});
renderer.render(scene,camera);
}
animate();


// Resize
window.addEventListener('resize',()=>{
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
});
