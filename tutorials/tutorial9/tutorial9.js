// Tutorial 9: the javascript

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");
var cam; //The cameras are going to be global so that we can access them from the event handler
var otherCam;

//This function is going to be called when the user releases a key.
// If the key they release is the space bar (keyCode 32), the camera currently
// in use by the scene will switch.
function up(event){//a key is released
    switch(event.keyCode) {//deterime the key
    case 32://space bar
      if(cam == scn.getCamera()) {
        scn.setCamera(otherCam);
      }
      else {
        scn.setCamera(cam);
      }
    break;
    }
} 

function canvasMain(canvasName){

 scn = new c3dl.Scene();
 scn.setCanvasTag(canvasName);

 renderer = new c3dl.WebGL();
 renderer.createRenderer(this);

 scn.setRenderer(renderer);
 scn.init(canvasName);

 if(renderer.isReady() )
 {
  var duck = new c3dl.Model();
  duck.init("duck.dae");
  scn.addObjectToScene(duck);

  cam = new c3dl.FreeCamera();
  cam.setPosition(new Array(200.0, 300.0, 500.0));
  cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
  scn.setCamera(cam);

  //create a second camera, looking at the duck broadside.
  otherCam = new c3dl.FreeCamera();
  otherCam.setPosition(new Array(500.0, 0.0, 0.0));
  otherCam.setLookAtPoint(new Array(0.0, 0.0, 0.0));

  //let the scene know which function to call when a key is pressed (down) 
  //and released (up).  
  scn.setKeyboardCallback(up);

  scn.startScene();
 }
}