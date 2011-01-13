c3dl.addMainCallBack(boxMain, "box");
c3dl.addMainCallBack(planeMain, "plane");
c3dl.addMainCallBack(sphereMain, "sphere");
c3dl.addMainCallBack(sphere2Main, "sphereDetail");
c3dl.addMainCallBack(customMain, "custom");
c3dl.addMainCallBack(custom2Main, "customWTexture");
c3dl.addModel("sphere.dae");
function boxMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var box = new c3dl.Box(5,5,5);
    box.setAngularVel([0.0, -0.001, 0.0]);
    box.setTexture("testing.jpg");
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 0.0, 15.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(box);
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