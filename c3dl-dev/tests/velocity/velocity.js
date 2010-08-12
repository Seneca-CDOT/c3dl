c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("duck.dae");
var timesincelastchange=0;
var duck;
function canvasMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  if (renderer.isReady()) {
    var now = new Date();
    duck = new c3dl.Collada();
    duck.init("duck.dae");
    duck.setLinearVel(new Array(0.0, -0.05, 0.0));
    scn.addObjectToScene(duck);
    var cam = new c3dl.FreeCamera();
    cam.setPosition(new Array(200.0, 300.0, 1000.0));
    cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
    scn.setCamera(cam);
    scn.setUpdateCallback(checktime);
    scn.startScene();
  }
}

function checktime(time){
  timesincelastchange+=time; 
  if(timesincelastchange >=8000){
    timesincelastchange = -200000000000000000
    duck.setLinearVel(new Array(0.0,0.0,0.0));
	var pos = duck.getPosition();
	alert("[" + pos[0].toFixed(2) + "," + pos[1].toFixed(2) + "," + pos[2].toFixed(2) + "]");
  }
}
