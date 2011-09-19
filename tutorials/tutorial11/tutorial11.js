// Tutorial 11

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");

var isDragging = false; //tracks whether or not the user is currently dragging the mouse
var rotationStartCoords = [0,0]; //The mouse coordinates at the beginning of a rotation
var SENSITIVITY = 0.7;

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
  var duck = new c3dl.Model();
  duck.init("duck.dae");
  duck.setTexture("duck.png");
  duck.yaw(Math.PI * 0.5); //rotate the duck to look up the Z axis
  scn.addObjectToScene(duck);

  var cam = new c3dl.OrbitCamera();
  cam.setFarthestDistance(1000);
  cam.setClosestDistance(60);	
  cam.setOrbitPoint([0.0, 0.0, 0.0]);
  cam.setDistance(400);
  scn.setCamera(cam);

  scn.setMouseCallback(mouseUp,mouseDown, mouseMove);
	

  scn.startScene();
 }
}