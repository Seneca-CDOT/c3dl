//c3dl.addMainCallBack(boxMain, "box");
//c3dl.addMainCallBack(planeMain, "plane");
c3dl.addMainCallBack(sphereMain, "sphere");
//c3dl.addMainCallBack(custPlaneMain, "cplane");
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
    cam.setPosition([0.0, 0.0, 25.0]);
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
    cam.setPosition([0.0, 3, 10]);
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
   //var sphere = new c3dl.Sphere(10);
    var colladasphere = new c3dl.Collada();
    colladasphere.init("sphere.dae");
    scn.addObjectToScene(colladasphere);
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 0, 25.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    //scn.addObjectToScene(sphere);
    scn.setCamera(cam);
    scn.startScene();
  }
}

function custPlaneMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var cplane = new c3dl.Plane();
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 10.0, 1.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(cplane);
    scn.setCamera(cam);
    scn.startScene();
  }
}