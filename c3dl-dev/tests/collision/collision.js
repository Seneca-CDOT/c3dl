c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("chair.dae");
c3dl.addModel("duck.dae");
var timeSinceLastChange=0;
var obj1, obj2, obj3;
var scn;

function canvasMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    obj1 = new c3dl.Collada();
    obj1.init("duck.dae");
    obj1.setSize(5,5,5);
    obj1.setPosition([15,0,0]);
    obj1.centerObject();
    obj1.setLinearVel([-0.01,0,0]);
    scn.addObjectToScene(obj1);
    obj2 = new c3dl.Collada();
    obj2.init("chair.dae");
    obj2.centerObject();
    obj2.setSize(5,5,5);
    obj2.setPosition([0,0,0]);
    scn.addObjectToScene(obj2);
    obj3 = new c3dl.Collada();
    obj3.init("duck.dae");
    obj3.centerObject();
    obj3.setSize(2,2,2);
    obj3.setPosition([2,1.7,0]);
    scn.addObjectToScene(obj3);
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 0.0, 20.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.setCamera(cam);
    scn.setUpdateCallback(checker);
    scn.startScene();
    scn.setCollision(true);
  }
}

function checker(time){
  var coll= scn.getCollision();
  if (coll.length) {
    coll = true;
  }
  else {
    coll = false;
  }
  document.getElementById('res').innerHTML = coll;
}
