// This test consists of a duck slowly rotating in
//front of the camera.  If parsing of the
//float_array occurs correctly, the duck shows up
//normally.  If anything is wrong, the duck fails
//to show up, or shows up covered in jagged points.

c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("models/duck.dae");
var duck;

function canvasMain(canvasName){

 scn = new c3dl.Scene();
 scn.setCanvasTag(canvasName);
 renderer = new c3dl.WebGL();
 renderer.createRenderer(this);
 scn.setRenderer(renderer);
 scn.init(canvasName);
 if(renderer.isReady() )
 {
  duck = new c3dl.Model();
  duck.init("models/duck.dae");
  duck.setAngularVel(new Array(0.0, 0.001, 0.0));
  scn.addObjectToScene(duck);
  var cam = new c3dl.FreeCamera();
  cam.setPosition(new Array(200.0, 300.0, 500.0));
  cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
  scn.setCamera(cam);
  scn.startScene();
 }
}