c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("models/table.dae");
var table, scn, cam;

function canvasMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    table = new c3dl.Collada();
    table.init("models/table.dae");
    table.centerObject();
    table.setSize(5,5,5);
    table.setPosition([0,0,0]);
    scn.addObjectToScene(table);
    cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 0.0, 20.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.setCamera(cam);
    scn.setUpdateCallback(checker);
    scn.startScene();
  }
}

function checker(time){
  document.getElementById('fps').innerHTML = "FPS:" + scn.getFPS().toFixed(2);
}
