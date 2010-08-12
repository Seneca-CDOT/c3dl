c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("obj.dae");
var timesincelastchange = 0;
var obj;
var cam = [];
cam[0] = new c3dl.FreeCamera();
cam[1] = new c3dl.FreeCamera();
cam[2] = new c3dl.FreeCamera();
cam[3] = new c3dl.FreeCamera();
cam[4] = new c3dl.FreeCamera();
cam[5] = new c3dl.FreeCamera();
cam[0].setPosition([0, 0, 50]);
cam[0].setLookAtPoint([0.0, 0.0, 0.0]);
cam[1].setPosition([0, 0, -50]);
cam[1].setLookAtPoint([0.0, 0.0, 0.0]);
cam[2].setPosition([0, 50, 0]);
cam[2].setLookAtPoint([0.01, 0.0, 0.0]);
cam[3].setPosition([0, -50, 0]);
cam[3].setLookAtPoint([0.01, 0.0, 0.0]);
cam[4].setPosition([50, 0, 0]);
cam[4].setLookAtPoint([0.0, 0.0, 0.0]);
cam[5].setPosition([-50, 0, 0]);
cam[5].setLookAtPoint([0.0, 0.0, 0.0]);
var start = +new Date();
var currentCam = 0;

function canvasMain(canvasName) {
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  if (renderer.isReady()) {

    obj = new c3dl.Collada();
    obj.init("obj.dae");
    obj.setPosition(new Array(0.0, 0.0, 0));
    obj.scale([0.5, 0.5, 0.5]);
    scn.addObjectToScene(obj);
    scn.setCamera(cam[0]);
    scn.setUpdateCallback(test);
    scn.startScene();
  }
}

function test() {
  scn.setCamera(cam[currentCam]);
  document.getElementById('fps').value = scn.getFPS();
  var checker;
  var camera = scn.getCamera();
  camera.applyToWorld(scn.getCanvas().width / scn.getCanvas().height);
  var projMatrix = camera.getProjectionMatrix();
  var viewMatrix = camera.getViewMatrix();
  var frustumMatrix = c3dl.multiplyMatrixByMatrix(projMatrix, viewMatrix);
  var frustumCulling = new Frustum(frustumMatrix);
  //Culling using spheres
  var boundingSpheres = obj.getBoundingSpheres();
  for (var j = 0; j < boundingSpheres.length; j++) {
    checker = frustumCulling.sphereInFrustum(boundingSpheres[j]);
    if (checker === "INSIDE") {
      break;
    }
  }
  document.getElementById('InOut').value = checker;

}

function nextCam() {
  (currentCam === 5) ? currentCam = 0 : currentCam++;
}

function prevCam() {
  (currentCam === 0) ? currentCam = 5 : currentCam--;
}

function blastOff() {
  var velocity = [0, 0, 0];
  if (document.getElementById('X').checked) {
    if (document.getElementById('Xlist').value === "Xpos") {
      velocity = [0.01, velocity[1], velocity[2]];
    }
    else {
      velocity = [-0.01, velocity[1], velocity[2]];
    }
  }
  if (document.getElementById('Y').checked) {
    if (document.getElementById('Ylist').value === "Ypos") {
      velocity = [velocity[0], 0.01, velocity[2]];
    }
    else {
      velocity = [velocity[0], -0.01, velocity[2]];
    }
  }
  if (document.getElementById('Z').checked) {
    if (document.getElementById('Zlist').value === "Zpos") {
      velocity = [velocity[0], velocity[1], 0.01];
    }
    else {
      velocity = [velocity[0], velocity[1], -1];
    }
  }
  obj.setPosition(new Array(0.0, 0.0, 0));
  obj.setLinearVel(velocity);
}
function reset() {
    obj.setLinearVel(new Array(0.0, 0.0, 0));
    obj.setPosition(new Array(0.0, 0.0, 0));
}