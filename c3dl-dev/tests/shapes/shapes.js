c3dl.addMainCallBack(cubeMain, "cube");
c3dl.addMainCallBack(planeMain, "plane");
c3dl.addMainCallBack(sphereMain, "sphere");
c3dl.addMainCallBack(sphere2Main, "sphereDetail");
c3dl.addMainCallBack(customMain, "custom");
c3dl.addMainCallBack(custom2Main, "customWTexture");
c3dl.addMainCallBack(customPlaneMain, "customPlane");
c3dl.addModel("sphere.dae");
function cubeMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var cube = new c3dl.Cube(5,5,5);
    cube.setAngularVel([0.0, -0.001, 0.0]);
    cube.setTexture("testing.jpg");
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 0.0, 15.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(cube);
    scn.setCamera(cam);
    scn.startScene();
  }
}

function planeMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var plane = new c3dl.Plane(5,5);
    plane.setTexture("testing.jpg");
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 3, 9]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(plane);
    scn.setCamera(cam);
    scn.startScene();
  }
}

function sphereMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var sphere = new c3dl.Sphere(10);
    sphere.setTexture("testing.jpg"); 
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 0, 20]);
    sphere.setAngularVel([0.0, -0.001, 0.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(sphere);
    scn.setCamera(cam);
    scn.startScene();
  }
}

function sphere2Main(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var sphere = new c3dl.Sphere(10,5,5);
    sphere.setTexture("testing.jpg"); 
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 0, 20]);
    sphere.setAngularVel([0.0, -0.001, 0.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(sphere);
    scn.setCamera(cam);
    scn.startScene();
  }
}
function customMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var vert = [-5,0,-5,-5,0,5,0,0,2.5, -5,0,5,5,0,5,0,0,2.5, 5,0,5,0,10,0,0,0,2.5];
    var norm = [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];
    var customShape = new c3dl.CustomShape(vert,norm);
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 25.0, 0.01]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(customShape);
    scn.setCamera(cam);
    scn.startScene();
  }
}

function custom2Main(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var vert = [-5,0,-5,-5,0,5,0,0,0, 5,0,5,5,0,-5,0,0,0];
    var norm = [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];
    var text = [0,0,0,1,0.5,0.5,1,1,1,0,0.5,0.5];
    var customShapeWithTexture = new c3dl.CustomShape(vert,norm,text);
    customShapeWithTexture.setTexture("testing.jpg");
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 15.0, 0.01]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(customShapeWithTexture);
    scn.setCamera(cam);
    scn.startScene();
  }
}
var cam;
function customPlaneMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    //var vert = [-5,-5, -5,5, 0,5, 0,0, 5,0, 5,-5]; //norm up
    //var vert = [-5,-5, -5,5, 5,5, 5,-5]; //norm up
   // var vert = [5,5, -5,5, -5,-5, 5,-5]; //norm down
   
    var vert= [0,0, 5,-5, 0,-5]; //norm up
    //var vert= [0,-5, 0,0, 5,-5]; //norm up
    //var vert= [5,-5, 0,-5, 0,0]; //norm up
    //var vert= [0,0, 0,-5, 5,-5]; //norm down
    //var vert= [0,-5, 5,-5, 0,0]; //norm down
    //var vert= [5,-5, 0,0, 0,-5]; //norm down
    var customPlane = new c3dl.CustomPlane(vert);
    cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 3, 10]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(customPlane);
    scn.setCamera(cam);
    scn.startScene();
    scn.setKeyboardCallback(onKeyUp, onKeyDown);
  }
}

var keysDown = (
function keysDown() {
  var key_w = false,
      key_a = false,
      key_s = false,
      key_d = false;
  return {
    "KEY_W": key_w,
    "KEY_A": key_a,
    "KEY_S": key_s,
    "KEY_D": key_d,
  };
})();
  
//Keys
const KEY_D = 68;
const KEY_A = 65;
const KEY_W = 87;
const KEY_S = 83;

function onKeyDown(event) {
  switch (event.keyCode) {
  case KEY_W:
    cam.setPosition([cam.getPosition()[0],cam.getPosition()[1]-0.5,cam.getPosition()[2]]);
       cam.setLookAtPoint([0.0, 0.0, 0.0]);
    break;
  case KEY_A:
    keysDown.KEY_A = true;
    break;
  case KEY_S:
      cam.setPosition([cam.getPosition()[0],cam.getPosition()[1]+0.5,cam.getPosition()[2]]);
       cam.setLookAtPoint([0.0, 0.0, 0.0]);
    break;
  case KEY_D:
    keysDown.KEY_D = true;
    break;
  default:
    break;
  }
}

//When a key is released down
function onKeyUp(event) {
  switch (event.keyCode) {
  case KEY_W:
    keysDown.KEY_W = false;
    break;
  case KEY_A:
    keysDown.KEY_A = false;
    break;
  case KEY_S:
    keysDown.KEY_S = false;
    break;
  case KEY_D:
    keysDown.KEY_D = false;
    break;
  default:
    break;
  }
}