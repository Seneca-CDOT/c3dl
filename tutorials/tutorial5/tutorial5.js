// Tutorial 5: the javascript
// The models used need to be parsed before the page
// render. This code will parse the model files
// and when this complete the parser will call the
// main. The argument being passed - "tutorial" -
// is the id of the canvas element on the html page.

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");
var duck;
var timesincelastchange=0;
var y=-0.001;

// This callback function is used by the scene class.  Every time
// the scene is updated, it will get called.

function spinduck(time){
 // time is in milliseconds. Thus 3000 millisecond is 3 seconds.
 timesincelastchange+=time;

 //if its been 3 sec or more since we stopped or started the spinning
 //change it.
 if(timesincelastchange >=3000){
 y = -1*y;
 duck.setAngularVel(new Array(0.0,y,0.0));
 timesincelastchange = 0;
 }
}
// The program main
function canvasMain(canvasName){

 // Create new c3dl.Scene object
 scn = new c3dl.Scene();
 scn.setCanvasTag(canvasName);

 // Create GL context
 renderer = new c3dl.WebGL();
 renderer.createRenderer(this);

 // Attach renderer to the scene
 scn.setRenderer(renderer);
 
 //Turn ambient lighting off
 scn.setAmbientLight([0,0,0,0]);
 
 //Turn ambient lighting on to weak gray light
 //scn.setAmbientLight([0.3,0.3,0.3,1.0]);
 
 scn.init(canvasName);

 //the isReady() function tests whether or not a renderer
 //is attached to a scene.  If the renderer failed to
 //initialize this will return false but only after you
 //try to attach it to a scene.
 if(renderer.isReady() )
 {
 // Create a Collado object that
 // will contain a imported
 // model of something to put
 // in the scene.
 duck = new c3dl.Model();

 // If the path is already parsed
 // (as it is in this case)
 // then the model is automatically retrieved
 // from a collada manager.
 duck.init("duck.dae");

 // Give the duck a bit of a spin on y
 duck.setAngularVel(new Array(0.0, -0.001, 0.0));

 // Add the object to the scene
 scn.addObjectToScene(duck);

 // Create a camera
 var cam = new c3dl.FreeCamera();

 // Place the camera.
 // WebGL uses a right handed co-ordinate system.
 // move 200 to the right
 // move 300 up
 // move 500 units out
 cam.setPosition(new Array(200.0, 300.0, 500.0));

 // Point the camera.
 // Here it is pointed at the same location as
 // the duck so the duck will appear centered.
 cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));

 // Add the camera to the scene
 scn.setCamera(cam);

 // add the callback function
 scn.setUpdateCallback(spinduck);
 
// Positional diffuse
//var diffuse = new c3dl.PositionalLight();
//diffuse.setName('diffuse');
//diffuse.setPosition([0,300,0]);
//diffuse.setDiffuse([0.1,0.8,0.4,1]);
//diffuse.setOn(true);
//scn.addLight(diffuse);

// Directional Diffuse
  var directional = new c3dl.DirectionalLight();
  directional.setName('dir');
  directional.setDirection([-2,3,-5]);
  directional.setDiffuse([0.7,0.7,0.7,1]);
  directional.setOn(true);
  scn.addLight(directional);

 // Start the scene
 scn.startScene();
 }
}
