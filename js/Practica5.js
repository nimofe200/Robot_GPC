

// Variables globales que van siempre
var renderer, scene, camera;
var cameraControls;
var baseAltura = 15;
var baseRadio = 50;
var ejeRadio=20;
var ejeAltura = 18;
var esparragoX = 18;
var esparragoY = 120;
var esparragoZ = 12;
var rotulaRadio = 20;
var discoRadio=22;
var discoAltura = 6; 
var nervioX = 4;
var nervioY = 80;
var nervioZ = 4;
var manoRadio = 15;
var manoAltura = 40;
var posAnt;
var robot;

// 1-inicializa 
init();
// 2-Crea una escena
loadScene();

crearControles();
// 3-renderiza
render();

function init()
{
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( new THREE.Color(0xFFFFFF) );
  document.getElementById('container').appendChild( renderer.domElement );

  scene = new THREE.Scene();

  var aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera( 50, aspectRatio , 0.1, 2000 );
  camera.position.set( 200, 500, 200 );

  cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
  cameraControls.target.set( 0, 0, 0 );

  camaraMini = new THREE.PerspectiveCamera( 50, 1 , 0.1, 2000 );
  camaraMini.position.set(0, 500, 0);
  camaraMini.lookAt(0, 0, 0);

  window.addEventListener('resize', updateAspectRatio );
}


function loadScene()
{
	// Añade el objeto grafico a la escena
  let material = new THREE.MeshBasicMaterial({ color: 0xb8b9ba }); 
  //let material = new THREE.MeshStandardMaterial({color: 0xb8b9ba});          

  //Un suelo (1000 x 1000) en el plano XZ
  let geometriaSuelo = new THREE.PlaneGeometry(1000, 1000);
  let suelo =  new THREE.Mesh(geometriaSuelo,material);
  suelo.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2) ;
  scene.add(suelo)

  let geometriaBase = new THREE.CylinderGeometry(baseRadio, baseRadio, baseAltura, 32);
  let materialBase = new THREE.MeshBasicMaterial({color: 0xe60e07});
  let base = new THREE.Mesh(geometriaBase, materialBase);
  base.position.y = baseAltura/2;
  //scene.add(base);

  let geometriaEje =  new THREE.CylinderGeometry(ejeRadio, ejeRadio, ejeAltura, 32);
  let materialEje = new THREE.MeshBasicMaterial({color: 0xfce914});
  let eje = new THREE.Mesh(geometriaEje, materialEje);
  eje.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2) ;
  eje.position.y = baseAltura;
  //scene.add(eje);

  let geometriaEsparrago = new THREE.BoxGeometry(esparragoX, esparragoY, esparragoZ);
  let materialEsparrago = new THREE.MeshBasicMaterial({color: 0xe60e07});
  let esparrago = new THREE.Mesh(geometriaEsparrago, materialEsparrago);
  esparrago.position.y = baseAltura+esparragoY/2;
  //scene.add(esparrago);

  let rotulaGeometria = new THREE.SphereGeometry(rotulaRadio, 32, 32);
  let rotulaMaterial = new THREE.MeshBasicMaterial({color: 0xfce914});
  let rotula = new THREE.Mesh(rotulaGeometria, rotulaMaterial);
  rotula.position.y = baseAltura+esparragoY;
  //scene.add(rotula);


  let discoGeometria = new THREE.CylinderGeometry(discoRadio, discoRadio, discoAltura, 32);
  let discoMaterial = new THREE.MeshBasicMaterial({color: 0xe60e07});
  let disco = new THREE.Mesh(discoGeometria, discoMaterial);
  disco.position.y=baseAltura +esparragoY;
  //scene.add(disco);

  let nervioGeometria = new THREE.BoxGeometry(nervioX, nervioY, nervioZ);
  let nervioMaterial = new THREE.MeshBasicMaterial({color: 0xe60e07});
  let nervio1 = new THREE.Mesh(nervioGeometria, nervioMaterial);
  nervio1.position.y = baseAltura +esparragoY+ discoAltura+ nervioY/2;
  nervio1.position.x = 10;
  nervio1.position.z = 10;
  //scene.add(nervio1);

  let nervio2 = new THREE.Mesh(nervioGeometria, nervioMaterial);
  nervio2.position.y = baseAltura +esparragoY+ discoAltura+ nervioY/2;
  nervio2.position.x = -10;
  nervio2.position.z = 10;
  //scene.add(nervio2);

  let nervio3 = new THREE.Mesh(nervioGeometria, nervioMaterial);
  nervio3.position.y = baseAltura +esparragoY+ discoAltura+ nervioY/2;
  nervio3.position.x = -10;
  nervio3.position.z = -10;
  //scene.add(nervio3);

  let nervio4 = new THREE.Mesh(nervioGeometria, nervioMaterial);
  nervio4.position.y = baseAltura +esparragoY+ discoAltura+ nervioY/2;
  nervio4.position.x = 10;
  nervio4.position.z = -10;
  //scene.add(nervio4);

  let manoGeometria =  new THREE.CylinderGeometry(manoRadio, manoRadio, manoAltura, 32);
  let manoMaterial = new THREE.MeshBasicMaterial({color: 0xfce914});
  let mano = new THREE.Mesh(manoGeometria, manoMaterial);
  mano.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2) ;
  mano.position.y = baseAltura +esparragoY+ discoAltura+ nervioY;
  //scene.add(mano);

    let agarreGeometria = new THREE.BoxGeometry(19, 20, 4);
  let agarreMaterial = new THREE.MeshBasicMaterial({color: 0xe60e07});
  let agarre = new THREE.Mesh(agarreGeometria, agarreMaterial);
  agarre.position.y = baseAltura +esparragoY+ discoAltura+ nervioY;
  agarre.position.x=19/2;
  agarre.position.z=10
  //scene.add(agarre)

  var dedoGeometria = new THREE.BufferGeometry();
  var verticesDedo = new Float32Array([
    0, 0, 0,
    19, 5, 0,
    19, 5, 2,

    0, 0, 0,
    19, 5, 2,
    0, 0, 4,

    0, 20, 4,
    0, 0, 4,
    19, 15, 2,

    0, 0, 4,
    19, 5, 2,
    19, 15, 2,

    0, 0, 0,
    0, 20, 0,
    19, 15, 0,

    19, 15, 0,
    19, 5, 0,
    0, 0, 0,

    0, 20, 0,
    0, 20, 4,
    19, 15, 2,

    19, 15, 2,
    19, 15, 0,
    0, 20, 0,
    
    19, 5, 0, 
    19, 15, 0,
    19, 5, 2,

    19, 15, 2,
    19, 5, 2,
    19, 15, 0,
  ]);
  dedoGeometria.setAttribute('position', new THREE.BufferAttribute(verticesDedo, 3));
  let dedoMaterial = new THREE.MeshBasicMaterial({color: 0xe60e07});
  let dedo = new THREE.Mesh(dedoGeometria, dedoMaterial);
  dedo.position.y = dedo.position.y + baseAltura +esparragoY+ discoAltura+ nervioY -10;
  dedo.position.x = 19;
  dedo.position.z = -2+10;
  //scene.add(dedo);

  pinzaDe = new THREE.Group();
  pinzaDe.add(agarre);
  pinzaDe.add(dedo);
  //scene.add(pinzaDe);

  let agarre2 = new THREE.Mesh(agarreGeometria, agarreMaterial);
  agarre2.position.y = baseAltura +esparragoY+ discoAltura+ nervioY;
  agarre2.position.x=19/2;
  agarre2.position.z = -10
  //scene.add(agarre2)

  let dedo2 = new THREE.Mesh(dedoGeometria, dedoMaterial);
  dedo2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI) ;
  dedo2.position.x = 19;
  dedo2.position.y = dedo2.position.y + baseAltura +esparragoY+ discoAltura+ nervioY -10+20;
  dedo2.position.z = -8;   
  //scene.add(dedo2)

  pinzaIz = new THREE.Group();
  pinzaIz.add(agarre2);
  pinzaIz.add(dedo2);
  //scene.add(pinzaIz);

  mano_completa = new THREE.Group();
  mano_completa.add(mano);
  mano_completa.add(pinzaDe);
  mano_completa.add(pinzaIz);
  //scene.add(mano_completa);

  nervios = new THREE.Group();
  nervios.add(nervio1);
  nervios.add(nervio2);
  nervios.add(nervio3);
  nervios.add(nervio4);
  //scene.add(nervios);
  
  antebrazo = new THREE.Group();
  antebrazo.add(mano_completa);
  antebrazo.add(nervios);
  antebrazo.add(disco);
  //scene.add(antebrazo);

  brazo = new THREE.Group();
  brazo.add(eje);
  brazo.add(esparrago);
  brazo.add(rotula);
  brazo.add(antebrazo);
  //scene.add(brazo);

  robot = new THREE.Group();
  robot.add(base);
  robot.add(brazo);
  scene.add(robot);


}


function updateAspectRatio()
{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function update()
{
  // Cambios para actualizar la camara segun mvto del raton
  cameraControls.update();
}

function render()
{
	requestAnimationFrame( render );
  update();

  renderer.setScissorTest(false);
  renderer.setViewport(0,0,window.innerWidth,window.innerHeight);
  renderer.render( scene, camera );

  const menor = Math.min(window.innerWidth, window.innerHeight);
  const miniSize = menor / 4;
  const miniX = 0;
  const miniY = window.innerHeight - miniSize;
	
	
  renderer.setScissorTest(true);
  renderer.setScissor(miniX, miniY, miniSize, miniSize);
  renderer.setViewport(miniX, miniY, miniSize, miniSize);
  

  renderer.render(scene, camaraMini);
  renderer.setScissorTest(false);
}


function crearControles() {

  const controles = {
      giroBase: 0,
      giroBrazo: 0,
      giroAntebrazoY: 0,
      giroAntebrazoZ: 0,
  };

  const gui = new lil.GUI();

  gui.add(controles, "giroBase", -180, 180, 1)
      .name("Giro Base")
      .onChange((angulo) => {
          robot.rotation.y =
              THREE.MathUtils.degToRad(angulo);
      });

    gui.add(controles, "giroBrazo", -45, 45, 1)
      .name("Giro Brazo")
      .onChange((angulo) => {
          brazo.rotation.z =
              THREE.MathUtils.degToRad(angulo);
      });

    gui.add(controles, "giroAntebrazoY", -180, 180, 1)
      .name("Giro Antebrazo Y")
      .onChange((angulo) => {
          antebrazo.rotation.y =
              THREE.MathUtils.degToRad(angulo);
      });

    /*gui.add(controles, "giroAntebrazoZ", -90, 90, 1)
      .name("Giro Antebrazo Y")
      .onChange((angulo) => {
          antebrazo.rotation.z =
              THREE.MathUtils.degToRad(angulo);
      });*/
    
}