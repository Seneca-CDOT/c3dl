c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("duck.dae");

var timeSinceLastChange = 0;
var duck, scn;
var testDone = false;

function canvasMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if(renderer.isReady()) {   
  for(var x = 0; x < 5; x++){
    for(var y = 0; y < 5; y++){
      var duck = new c3dl.Cube(1,1,1);
      duck.setPosition([x * 1.6, y* 1.6, 0]);
      scn.addObjectToScene(duck);
      duck.setStatic(true)
    }
  }
    
    var cam = new c3dl.FreeCamera();
    cam.setPosition([3.5, 4.0, 12.0]);
    cam.setLookAtPoint([3.5, 4.0, 0.0]);
    scn.setCamera(cam);
    scn.setUpdateCallback(checktime);
    scn.startScene();
  }
}

function checktime(time){
  document.getElementById('fps').innerHTML = scn.getFPS();
}

