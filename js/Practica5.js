

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
var gui = new lil.GUI();
var animacionActiva = false;
var objetivos = {
    giroBase: 0,
    giroBrazo: 0,
    giroAntebrazoY: 0,
    giroAntebrazoZ: 0,
    RotacionPinzaZ: 0,
    Apertura: 0
};

const textureLoader = new THREE.TextureLoader();
const texturaSuelo = textureLoader.load('images/suelo-fabrica2.jpg');
const texturaOro = textureLoader.load('images/oro.jpg');
const texturaRojo = textureLoader.load('images/rojo2.jpg');
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
    
  let material = new THREE.MeshStandardMaterial({ map: texturaSuelo}); 
  //let material = new THREE.MeshStandardMaterial({color: 0xb8b9ba});          

  //Un suelo (1000 x 1000) en el plano XZ
  let geometriaSuelo = new THREE.PlaneGeometry(1000, 1000);
  let suelo =  new THREE.Mesh(geometriaSuelo,material);
  suelo.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2) ;
  scene.add(suelo)

  let geometriaBase = new THREE.CylinderGeometry(baseRadio, baseRadio, baseAltura, 32);
  let materialBase = new THREE.MeshStandardMaterial({map: texturaRojo});
  let base = new THREE.Mesh(geometriaBase, materialBase);
  base.position.y = baseAltura/2;
  //scene.add(base);

  let geometriaEje =  new THREE.CylinderGeometry(ejeRadio, ejeRadio, ejeAltura, 32);
  let materialEje = new THREE.MeshStandardMaterial({map: texturaOro});
  let eje = new THREE.Mesh(geometriaEje, materialEje);
  eje.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2) ;
  
  //scene.add(eje);

  let geometriaEsparrago = new THREE.BoxGeometry(esparragoX, esparragoY, esparragoZ);
  let materialEsparrago = new THREE.MeshStandardMaterial({map: texturaRojo});
  let esparrago = new THREE.Mesh(geometriaEsparrago, materialEsparrago);
  esparrago.position.y = esparragoY/2;
  //scene.add(esparrago);

  let rotulaGeometria = new THREE.SphereGeometry(rotulaRadio, 32, 32);
  let rotulaMaterial = new THREE.MeshStandardMaterial({map: texturaOro});
  let rotula = new THREE.Mesh(rotulaGeometria, rotulaMaterial);
  rotula.position.y = esparragoY;
  //scene.add(rotula);


  let discoGeometria = new THREE.CylinderGeometry(discoRadio, discoRadio, discoAltura, 32);
  let discoMaterial = new THREE.MeshStandardMaterial({map: texturaRojo});
  let disco = new THREE.Mesh(discoGeometria, discoMaterial);
  //scene.add(disco);

  let nervioGeometria = new THREE.BoxGeometry(nervioX, nervioY, nervioZ);
  let nervioMaterial = new THREE.MeshStandardMaterial({map: texturaRojo});
  let nervio1 = new THREE.Mesh(nervioGeometria, nervioMaterial);
  nervio1.position.y = discoAltura+ nervioY/2;
  nervio1.position.x = 10;
  nervio1.position.z = 10;
  //scene.add(nervio1);

  let nervio2 = new THREE.Mesh(nervioGeometria, nervioMaterial);
  nervio2.position.y = discoAltura+ nervioY/2;
  nervio2.position.x = -10;
  nervio2.position.z = 10;
  //scene.add(nervio2);

  let nervio3 = new THREE.Mesh(nervioGeometria, nervioMaterial);
  nervio3.position.y = discoAltura+ nervioY/2;
  nervio3.position.x = -10;
  nervio3.position.z = -10;
  //scene.add(nervio3);

  let nervio4 = new THREE.Mesh(nervioGeometria, nervioMaterial);
  nervio4.position.y = discoAltura+ nervioY/2;
  nervio4.position.x = 10;
  nervio4.position.z = -10;
  //scene.add(nervio4);

  let manoGeometria =  new THREE.CylinderGeometry(manoRadio, manoRadio, manoAltura, 32);
  let manoMaterial = new THREE.MeshStandardMaterial({map: texturaOro});
  let mano = new THREE.Mesh(manoGeometria, manoMaterial);
  mano.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2) ;
  
  //scene.add(mano);

    let agarreGeometria = new THREE.BoxGeometry(19, 20, 4);
  let agarreMaterial = new THREE.MeshStandardMaterial({map: texturaRojo});
  let agarre = new THREE.Mesh(agarreGeometria, agarreMaterial);
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
  dedoGeometria.computeVertexNormals();
  let dedoMaterial = new THREE.MeshStandardMaterial({map: texturaRojo});
  const uvs = new Float32Array([
    0, 0,
    1, 0,
    1, 1,

    0, 0,
    1, 1,
    0, 1,

    0, 1,
    0, 0,
    1, 0,

    0, 0,
    1, 1,
    1, 0,

    0, 0,
    0, 1,
    1, 1,

    1, 1,
    1, 0,
    0, 0,

    0, 1,
    0, 0,
    1, 0,

    1, 0,
    1, 1,
    0, 1,

    0, 0,
    0, 1,
    1, 0,

    1, 1,
    1, 0,
    0, 1,
  ]);
  dedoGeometria.setAttribute(
    'uv',
    new THREE.BufferAttribute(uvs, 2)
  );
  let dedo = new THREE.Mesh(dedoGeometria, dedoMaterial);
  dedo.position.y = dedo.position.y -10;
  dedo.position.x = 19;
  dedo.position.z = -2+10;
  //scene.add(dedo);

  pinzaDe = new THREE.Group();
  pinzaDe.add(agarre);
  pinzaDe.add(dedo);
  //scene.add(pinzaDe);

  let agarre2 = new THREE.Mesh(agarreGeometria, agarreMaterial);
  agarre2.position.x=19/2;
  agarre2.position.z = -10
  //scene.add(agarre2)

  let dedo2 = new THREE.Mesh(dedoGeometria, dedoMaterial);
  dedo2.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI) ;
  dedo2.position.x = 19;
  dedo2.position.y = dedo2.position.y -10+20;
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
  mano_completa.position.y = discoAltura+ nervioY;
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
  antebrazo.position.y = esparragoY;
  //scene.add(antebrazo);

  brazo = new THREE.Group();
  brazo.add(eje);
  brazo.add(esparrago);
  brazo.add(rotula);
  brazo.add(antebrazo);
  brazo.position.y = baseAltura;
  //scene.add(brazo);

  robot = new THREE.Group();
  robot.add(base);
  robot.add(brazo);
  scene.add(robot);

  //Luces
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // luz ambiental
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(300, 300, 300);
  
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 2000;
  directionalLight.shadow.camera.left = -300;
  directionalLight.shadow.camera.right = 300;
  directionalLight.shadow.camera.top = 300;
  directionalLight.shadow.camera.bottom = -300;
  scene.add(directionalLight);  

  const spotLight = new THREE.SpotLight(0xffffff, 1); // color, intensidad
  spotLight.position.set(0, 300, 0); // Posicionar la luz de foco
  spotLight.target.position.set(0, 0, 0); // Apuntar hacia el origen (o hacia cualquier objeto)
  scene.add(spotLight);

  
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024; 
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 0.5;
  spotLight.shadow.camera.far = 2000;

    //Hacer que los objetos proyecten y reciban sombras
    base.castShadow = true;
    base.receiveShadow = true;
    eje.castShadow = true;
    eje.receiveShadow = true;
    esparrago.castShadow = true;
    esparrago.receiveShadow = true;
    rotula.castShadow = true;
    rotula.receiveShadow = true;
    disco.castShadow = true;
    disco.receiveShadow = true;
    nervio1.castShadow = true;
    nervio1.receiveShadow = true;
    nervio2.castShadow = true;
    nervio2.receiveShadow = true;
    nervio3.castShadow = true;
    nervio3.receiveShadow = true;
    nervio4.castShadow = true;
    nervio4.receiveShadow = true;
    mano.castShadow = true;
    mano.receiveShadow = true;
    pinzaDe.castShadow = true;
    pinzaDe.receiveShadow = true;
    pinzaIz.castShadow = true;
    pinzaIz.receiveShadow = true;
    suelo.castShadow = true;
    suelo.receiveShadow = true;
    agarre.castShadow = true;
    agarre.receiveShadow = true;
    agarre2.castShadow = true;
    agarre2.receiveShadow = true;
    dedo.castShadow = true;
    dedo.receiveShadow = true;
    dedo2.castShadow = true;
    dedo2.receiveShadow = true;

    brazo.castShadow = true;
    brazo.receiveShadow = true;
    antebrazo.castShadow = true;
    antebrazo.receiveShadow = true;
    mano_completa.castShadow = true;
    mano_completa.receiveShadow = true;

    robot.castShadow = true;
    robot.receiveShadow = true;
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
  actualizarAnimacion();
  
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
      RotacionPinzaZ: 0,
      Apertura: 7,
      Alambre: false,
      Animacion: function() {
        animacionActiva = true;
        //Crear animacion, elegir un valor para cada articulacion y hacer que se mueva a ese valor
        // Generar nuevos valores aleatorios
        controles.giroBase = aleatorio(-180, 180);
        controles.giroBrazo = aleatorio(-45, 45);
        controles.giroAntebrazoY = aleatorio(-180, 180);
        controles.giroAntebrazoZ = aleatorio(-90, 90);
        controles.RotacionPinzaZ = aleatorio(-40, 220);
        controles.Apertura = aleatorio(0, 15);

        // Copiar los valores a los objetivos
        objetivos.giroBase = controles.giroBase;
        objetivos.giroBrazo = controles.giroBrazo;
        objetivos.giroAntebrazoY = controles.giroAntebrazoY;
        objetivos.giroAntebrazoZ = controles.giroAntebrazoZ;
        objetivos.RotacionPinzaZ = controles.RotacionPinzaZ;
        objetivos.Apertura = controles.Apertura;

        gui.controllersRecursive().forEach(c => c.updateDisplay());
        actualizarAnimacion();
        
      }
  };

  

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

    gui.add(controles, "giroAntebrazoZ", -90, 90, 1)
      .name("Giro Antebrazo Z")
      .onChange((angulo) => {
          antebrazo.rotation.z =
              THREE.MathUtils.degToRad(angulo);
      });
    gui.add(controles, "RotacionPinzaZ", -40, 220, 1)
      .name("Giro Pinza")
      .onChange((angulo) => {
          mano_completa.rotation.z =
              THREE.MathUtils.degToRad(angulo);
      });
      gui.add(controles, "Apertura", 0, 15, 1)
      .name("Separación Pinza")
      .onChange((sep) => {
          pinzaDe.position.z = -7.1+sep;
          pinzaIz.position.z = 7.1-sep;
      }
    );

    gui.add(controles, "Alambre")
      .name("Alambre")
      .onChange((value) => {
        if (value) {
            robot.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material.wireframe = true;
                }
            });
        } else {
            robot.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material.wireframe = false;
                }
            });
        }
    });

    gui.add(controles, "Animacion")
      .name("Animacion");
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function actualizarAnimacion() {

    if (!animacionActiva) return;

    const velocidad = 0.05;

    robot.rotation.y = THREE.MathUtils.lerp(
        robot.rotation.y,
        THREE.MathUtils.degToRad(objetivos.giroBase),
        velocidad
    );

    brazo.rotation.z = THREE.MathUtils.lerp(
        brazo.rotation.z,
        THREE.MathUtils.degToRad(objetivos.giroBrazo),
        velocidad
    );

    antebrazo.rotation.y = THREE.MathUtils.lerp(
        antebrazo.rotation.y,
        THREE.MathUtils.degToRad(objetivos.giroAntebrazoY),
        velocidad
    );

    antebrazo.rotation.z = THREE.MathUtils.lerp(
        antebrazo.rotation.z,
        THREE.MathUtils.degToRad(objetivos.giroAntebrazoZ),
        velocidad
    );

    mano_completa.rotation.z = THREE.MathUtils.lerp(
        mano_completa.rotation.z,
        THREE.MathUtils.degToRad(objetivos.RotacionPinzaZ),
        velocidad
    );

    pinzaDe.position.z = THREE.MathUtils.lerp(
        pinzaDe.position.z,
        -7.1 + objetivos.Apertura,
        velocidad
    );

    pinzaIz.position.z = THREE.MathUtils.lerp(
        pinzaIz.position.z,
        7.1 - objetivos.Apertura,
        velocidad
    );

    // Comprobar si ha llegado al destino
    const destinoAlcanzado =
        Math.abs(robot.rotation.y - THREE.MathUtils.degToRad(objetivos.giroBase)) < 0.1 &&
        Math.abs(brazo.rotation.z - THREE.MathUtils.degToRad(objetivos.giroBrazo)) < 0.1 &&
        Math.abs(antebrazo.rotation.y - THREE.MathUtils.degToRad(objetivos.giroAntebrazoY)) < 0.1 &&
        Math.abs(antebrazo.rotation.z - THREE.MathUtils.degToRad(objetivos.giroAntebrazoZ)) < 0.1 &&
        Math.abs(mano_completa.rotation.z - THREE.MathUtils.degToRad(objetivos.RotacionPinzaZ)) < 0.1 &&
        Math.abs(pinzaDe.position.z - (-7.1 + objetivos.Apertura)) < 0.1;

    //Si no ha llegado al destino, sigue animando
    
    if (destinoAlcanzado) {
        animacionActiva = false;
        console.log("Animación completada");
    }
    
}