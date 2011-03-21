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
    scn.setPickingCallback(picking);
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
    var plane = new c3dl.Plain(5,5);
    plane.setTexture("testing.jpg");
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 3, 9]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(plane);
    scn.setCamera(cam);
    scn.startScene();
    scn.setPickingCallback(picking);
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
    scn.setPickingCallback(picking);
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
    scn.setPickingCallback(picking);
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
    cam.setPosition([-10.0, 10.0, 15.01]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(customShape);
    scn.setCamera(cam);
    scn.startScene();
    scn.setPickingCallback(picking);
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
    scn.setPickingCallback(picking);
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
    var vert = [-5,-5, -5,5, 0,5, 0,0, 5,0, 5,-5]; //norm up
    var customPlane = new c3dl.CustomPlane(vert);
    customPlane.setTexture("testing.jpg");
    cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 15, 0.01]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(customPlane);
    scn.setCamera(cam);
    scn.startScene();
    scn.setPickingCallback(picking);
  }
}

function picking(pickingObj) {	
	var objectsHit = pickingObj.getObjects();

	if( objectsHit.length > 0 )	{
    alert("hit");
	}
}

