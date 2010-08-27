c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("duck.dae");

var timeSinceLastChange = 0;
var duck;
var testDone = false;

function canvasMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if(renderer.isReady()) {   
    duck = new c3dl.Collada();
    duck.init("duck.dae");
    duck.setAngularVel([0.0, -0.001, 0.0]);
    scn.addObjectToScene(duck);
    var cam = new c3dl.FreeCamera();
    cam.setPosition([200.0, 300.0, 1000.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.setCamera(cam);
    scn.setUpdateCallback(checktime);
    scn.startScene();
  }
}

function checktime(time){
  if(!testDone){
    timeSinceLastChange += time; 
    if(timeSinceLastChange >= 8000){
      testDone = true;
      duck.setAngularVel([0.0, 0.0, 0.0]);
      var dir = duck.getDirection();
      document.getElementById('res').innerHTML = "[" + dir[0].toFixed(2) + "," + dir[1].toFixed(2) + "," + dir[2].toFixed(2) + "]";
    }
  }
}
