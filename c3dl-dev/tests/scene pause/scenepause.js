c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("duck.dae");
var timeSinceLastChange=0;
var duck;
var scn;
function canvasMain(canvasName){
    scn = new c3dl.Scene();
    scn.setCanvasTag(canvasName);
    renderer = new c3dl.WebGL();
    renderer.createRenderer(this);
    scn.setRenderer(renderer);
    scn.init(canvasName);
    if(renderer.isReady() )
    {
        duck = new c3dl.Collada();
        duck.init("duck.dae");
        duck.setAngularVel(new Array(0.0, -0.001, 0.0));
        duck.setPosition([300,0,0]);
        scn.addObjectToScene(duck);
        var cam = new c3dl.FreeCamera();
        cam.setPosition(new Array(200.0, 300.0, 1000.0));
        cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
        scn.setCamera(cam);
        scn.setUpdateCallback(test);
        scn.startScene();
       
    }
}

function pauseR() {
  scn.pauseSceneRender();
}
function unpauseR() {
  scn.unpauseSceneRender();
}
function pauseU() {
  scn.pauseSceneUpdate();
}
function unpauseU() {
  scn.unpauseSceneUpdate();
}
function pause() {
  scn.pauseScene();
}
function unpause() {
  scn.unpauseScene();
}
function test(time) {
  timeSinceLastChange += time; 
  document.getElementById('res').innerHTML = (timeSinceLastChange/1000).toFixed(2) + " sec";
}
function addDuck() {
  oldPos = duck.getPosition();
  duck = new c3dl.Collada();
  duck.init("duck.dae");
  duck.setPosition([oldPos[0]-150,oldPos[1],oldPos[2]]);
  duck.setAngularVel(new Array(0.0, -0.001, 0.0));
  scn.addObjectToScene(duck);
}