// Tutorial 11

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");
c3dl.addModel("teapot.dae");

var isDragging = false; //tracks whether or not the user is currently dragging the mouse
var rotationStartCoords = [0,0]; //The mouse coordinates at the beginning of a rotation
var SENSITIVITY = 0.7;
const ZOOM_SENSITIVITY = 3;

var duck;
var teapot;

//Called when the user releases the left mouse button.
//Records that the user is no longer dragging the mouse
function mouseUp(evt)
{
	if(evt.which == 1)
	{
		isDragging = false;
	}
}

//Called when the user presses the left mouse button.
//Records that the user may start to drag the mouse, along with the current X & Y
// coordinates of the mouse.
function mouseDown(evt)
{
	if(evt.which == 1)
	{
		isDragging = true;
		rotationStartCoords[0] = xevtpos(evt);
		rotationStartCoords[1] = yevtpos(evt);
	}
}

//Called when the mouse moves
//This function will only do anything when the user is currently holding
// the left mouse button.  It will determine how far the cursor has moved
// since the last update and will pitch and yaw the camera based on that
// amount and the sensitivity variable.
function mouseMove(evt)
{
	if(isDragging == true)
	{
                var cam = scn.getCamera();
		var x = xevtpos(evt);
		var y = yevtpos(evt);
		
		// how much was the cursor moved compared to last time
		// this function was called?
		var deltaX = x - rotationStartCoords[0];
                var deltaY = y - rotationStartCoords[1];

		cam.yaw(-deltaX * SENSITIVITY);
		cam.pitch(deltaY * SENSITIVITY);
		
		// now that the camera was updated, reset where the
		// rotation will start for the next time this function is 
		// called.
		rotationStartCoords = [x,y];
	}
}

//This function is called when the user moves the scroll-wheel on the mouse
//Depending on the direction of the action, the camera will either get
// closer to or farther from the orbit point.
function mouseScroll(evt) {
	var cam = scn.getCamera();
	if(-evt.detail*ZOOM_SENSITIVITY < 0)
		{
			cam.goFarther(-1 * -evt.detail*ZOOM_SENSITIVITY);
		}
		
		// towards screen
		else
		{
			cam.goCloser(-evt.detail*ZOOM_SENSITIVITY);
		}
}

//This function is called whenever a key is released.
//If the key released was the space-bar, the camera will switch
// which object it is orbiting.
function swapOrbitPoint(evt) {
	if(evt.keyCode == 32) {
		var cam = scn.getCamera();
		//compare the camera's orbit point with the location of the duck
		if(c3dl.isVectorEqual(cam.getOrbitPoint(),duck.getPosition())) {
			cam.setOrbitPoint(teapot.getPosition());
		}
		else{
			cam.setOrbitPoint(duck.getPosition());
		}
	}
}

//Calculates the current X coordinate of the mouse in the client window
function xevtpos(evt)
{
    return 2 * (evt.clientX / evt.target.width) - 1;
}

//Calculates the current Y coordinate of the mouse in the client window
function yevtpos(evt)
{
    return 2 * (evt.clientY / evt.target.height) - 1;
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
  duck = new c3dl.Model();
  duck.init("duck.dae");
  duck.setTexture("duck.png");
  duck.yaw(Math.PI * 0.5); //rotate the duck to look up the Z axis
  scn.addObjectToScene(duck);
  
  teapot = new c3dl.Model();
  teapot.init("teapot.dae");
  teapot.setTexture("teapot.png");
  teapot.setPosition([-600,0,0]);
  teapot.scale([5,5,5]);
  scn.addObjectToScene(teapot);

  var cam = new c3dl.OrbitCamera();
  cam.setFarthestDistance(1000);
  cam.setClosestDistance(20);	
  cam.setOrbitPoint(duck.getPosition());
  cam.setDistance(400);
  scn.setCamera(cam);

  scn.setMouseCallback(mouseUp,mouseDown, mouseMove,mouseScroll);
  scn.setKeyboardCallback(swapOrbitPoint);
  scn.startScene();
 }
}