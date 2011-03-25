c3dl.addMainCallBack(yview, "yview");
c3dl.addMainCallBack(xview, "xview");
c3dl.addMainCallBack(zview, "zview");
var teapot1,teapot2,teapot3;
var scn,scn2,scn3;
var cam1,cam2,cam3;
function yview(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  if(renderer.isReady()) {
    teapot1 = new c3dl.Collada();
    teapot1.init("teapot.dae");
    teapot1.setRenderAabb(true);
    teapot1.setPosition([0,0,10]);
    teapot1.scale([2,1,1]);
    teapot1.setAngularVel(new Array(0.0, 0.0005,0.0));
    scn.addObjectToScene(teapot1);
    cam1 = new c3dl.FreeCamera();
    cam1.setPosition(new Array(0.0, 100.0, 1.0));
    cam1.setLookAtPoint(new Array(0.0, 0.0, 0.0));
    scn.setCamera(cam1);
    scn.startScene();
  }
}
function xview(canvasName){
  scn2 = new c3dl.Scene();
  scn2.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn2.setRenderer(renderer);
  scn2.init(canvasName);
  if(renderer.isReady() ) {
    teapot2 = new c3dl.Collada();
    teapot2.init("teapot.dae");
    teapot2.setRenderAabb(true);
    teapot2.setAngularVel(new Array(0.0005, 0.0,0.0));
    teapot2.setPosition([0,0,-10]);
    teapot2.scale([1,3,1]);
    scn2.addObjectToScene(teapot2);
    cam2 = new c3dl.FreeCamera();
    cam2.setPosition(new Array(0.0, 100.0, 1.0));
    cam2.setLookAtPoint(new Array(0.0, 0.0, 0.0));
    scn2.setCamera(cam2);
    scn2.startScene();
  }
}
function zview(canvasName){
  scn3 = new c3dl.Scene();
  scn3.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn3.setRenderer(renderer);
  scn3.init(canvasName);
  if(renderer.isReady()) {
    teapot3 = new c3dl.Collada();
    teapot3.init("teapot.dae");
    teapot3.setRenderAabb(true);
    teapot3.setAngularVel(new Array(0.0, 0.0,0.0005));
    teapot3.setPosition([0,0,-5]);
    teapot3.scale([2,1,1]);
    scn3.addObjectToScene(teapot3);
    cam3 = new c3dl.FreeCamera();
    cam3.setPosition(new Array(0.0, 100.0, 1.0));
    cam3.setLookAtPoint(new Array(0.0, 0.0, 0.0));
    scn3.setCamera(cam3);
    scn3.startScene();
  }
}
function camy() {
  cam1.setPosition(new Array(0.0, 100.0, 1.0));
  cam1.setLookAtPoint(new Array(0.0, 0.0, 0.0));
  cam2.setPosition(new Array(0.0, 100.0, 1.0));
  cam2.setLookAtPoint(new Array(0.0, 0.0, 0.0));
  cam3.setPosition(new Array(0.0, 100.0, 1.0));
  cam3.setLookAtPoint(new Array(0.0, 0.0, 0.0));
}
function camx() {
  cam1.setPosition(new Array(-100.0, 0.0, 0.0));
  cam1.setLookAtPoint(new Array(0.0, 0.0, 0.0));
  cam2.setPosition(new Array(-100.0, 0.0, 0.0));
  cam2.setLookAtPoint(new Array(0.0, 0.0, 0.0));
  cam3.setPosition(new Array(-100.0, 0.0, 0.0));
  cam3.setLookAtPoint(new Array(0.0, 0.0, 0.0));
}
function toggle() {
  if (teapot1.renderObb) {
    teapot1.setRenderObb(false);
    teapot2.setRenderObb(false);
    teapot3.setRenderObb(false);
  }
  else {
    teapot1.setRenderObb(true);
    teapot2.setRenderObb(true);
    teapot3.setRenderObb(true);
  }
}