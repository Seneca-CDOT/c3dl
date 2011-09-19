/* This program is one part of a three part test for the rotation functions of
  OrbitCamera.  All three use the same scene with an earth and the moon and
  allow the camera to be rotated around them by clicking and dragging the mouse.
  This test uses roll and yaw.
*/

var scn;
var cam;
var light;
var moon;
var earth;
var orbit = [500,0,0];
var orbittingBody;

c3dl.addMainCallBack(canvasMain, "xcom");
c3dl.addModel('models/earth.dae');
c3dl.addModel('models/skysphere.dae');

const SENSITIVITY = 0.7;
const KB_SENSITIVITY = 485;
const ZOOM_SENSITIVITY = 3;

// pitch, yaw and zoom
var keysPressed = [false,false,false];

// indices into keysPressed array
const ROLL = 0;
const YAW = 1;
const ZOOM = 2;

// ascii values, P,Y and Z
const KEY_ROLL = 82;
const KEY_YAW = 89;
const KEY_ZOOM = 90;

var isDragging = false;
var rotationStartCoords = [0,0];

function canvasMain(canvasName)
{
	// create a new Scene object
	scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();

	// EARTH
	earth = new c3dl.Model();
	earth.init('models/earth.dae');
	earth.pitch(-3.14159/2);
	scn.addObjectToScene(earth);
	orbittingBody = earth;
	
	// MOON
	moon = new c3dl.Model();
	moon.init('models/earth.dae');
	moon.pitch(-3.14159/2);
	moon.setTexture('images/moon.png');
	moon.scale([0.25,0.25,0.25]);
	moon.setAngularVel([0,0,0.001]);
	scn.addObjectToScene(moon);

	// create the skymodel which has the stars
	var sm = new c3dl.Model();
	sm.init('models/skysphere.dae');
	
	// light the earth
	light = new c3dl.DirectionalLight();
	light.setDiffuse([1,1,1]);
	light.setAmbient([0.1,0.1,0.1]);
	light.setDirection([0,0,-1]);
	light.setOn(true);
	scn.addLight(light);

	// orbit camera will orbit the earth.
	cam = new c3dl.OrbitCamera();
	
	cam.setFarthestDistance(1000);
	cam.setClosestDistance(60);
	cam.setDistance(200);

	scn.setAmbientLight([0,0,0]);
	scn.setPointAttenuation([.15,0,0]);
	scn.setPointRenderingMode(c3dl.POINT_MODE_POINT);
	scn.setSkyModel(sm);
	scn.setCamera(cam);
	scn.setMouseCallback(mouseUp,mouseDown, mouseMove, camUpdate);
	scn.setKeyboardCallback(onKeyUp, onKeyDown);
	scn.setUpdateCallback(updateCB);
	scn.startScene();
}


function changeKeyState(event, keyState)
{
	switch( event.keyCode)
	{
		case KEY_ZOOM: keysPressed[ZOOM] = keyState;break;
		case KEY_ROLL: keysPressed[ROLL] = keyState;break;
		case KEY_YAW: keysPressed[YAW] = keyState;break;
	}
}

function mouseUp(evt)
{
	// user released the LMB.
	if(evt.which == 1)
	{
		isDragging = false;
	}
}


function mouseDown(evt)
{
	// user pressed the LMB.
	if(evt.which == 1)
	{
		isDragging = true;

		rotationStartCoords[0] = xevtpos(evt);
		rotationStartCoords[1] = yevtpos(evt);
	}
}


function mouseMove(evt)
{
	if(isDragging == true)
	{
		var x = xevtpos(evt);
		var y = yevtpos(evt);
		
		// how much was the cursor moved compared to last time
		// this function was called?
		var deltaX = x - rotationStartCoords[0];
                var deltaY = y - rotationStartCoords[1];

		cam.yaw(-deltaX * SENSITIVITY);
		cam.roll(deltaY * SENSITIVITY);
		
		// now that the camera was updated, reset where the
		// rotation will start for the next time this function is 
		// called.
		rotationStartCoords = [x,y];
	}
}


function xevtpos(evt)
{
    return 2 * (evt.clientX / evt.target.width) - 1;
}

function yevtpos(evt)
{
    return 2 * (evt.clientY / evt.target.height) - 1;
}

/**
*/
function onKeyUp(event)
{
	// the key has been released
	changeKeyState(event, false);
}


/**
*/
function onKeyDown(event)
{
	changeKeyState(event, true);
	
	// m is for moon
	if(event.keyCode == 77)
	{
		cam.setOrbitPoint(moon.getPosition());
		orbittingBody = moon;
	}
	
	// e is for earth
	if(event.keyCode == 69)
	{
		cam.setOrbitPoint(earth.getPosition());
		orbittingBody = earth;		
	}

	// s is for setPosition
	if(event.keyCode == 83)
	{
		cam.setPosition([0,200,0]);
	}
}


function camUpdate(event)
{
	if(keysPressed[ROLL])
	{
		cam.roll(-event.detail/KB_SENSITIVITY);
	}

	// z is for zoom
	else if(keysPressed[ZOOM])
	{	
		// towards user
		if(-event.detail*ZOOM_SENSITIVITY < 0)
		{
			cam.goFarther(-1 * -event.detail*ZOOM_SENSITIVITY);
		}
		
		// towards screen
		else
		{
			cam.goCloser(-event.detail*ZOOM_SENSITIVITY);
		}
	}
	else if(keysPressed[YAW])
	{
		cam.yaw(-event.detail/KB_SENSITIVITY);
	}
}

function updateCB(deltaTime)
{
	var pos = light.getDirection();

	var quat = c3dl.axisAngleToQuat([0,1,0], deltaTime/1800);
	var mat = c3dl.quatToMatrix(quat);
	c3dl.multiplyMatrixByVector(mat, pos, pos);
	
	light.setDirection(pos);
	
	var orbitMat = c3dl.quatToMatrix(c3dl.axisAngleToQuat([0,1,0], deltaTime/40000));
	c3dl.multiplyMatrixByVector(orbitMat, orbit, orbit);
	
	moon.setPosition(orbit);
	
	// keep the camera orbiting whatever it is orbitting.
	cam.setOrbitPoint(orbittingBody.getPosition());
}