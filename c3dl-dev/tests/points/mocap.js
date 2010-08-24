/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/*
  This demo reads some mocap data from an xml file (selected through a dropDown List)
  and displays a simple collada object to represent each point. 
*/

// Global variables
var cam;
var scn;
var pick;
var elapsed;
var frame;
var maxFrames;
var xmlDoc;
var x;
var frate;
var pointList;
var totaltime;
var sphereSize = 25;

var isDragging = false;
var rotationStartCoords = [0,0];
const SENSITIVITY = 1;
const KB_SENSITIVITY = 5;
const ZOOM_SENSITIVITY = 30;

// pitch, yaw and zoom
var keysPressed = [false,false,false,false];

// indices into keysPressed array
const PITCH = 0;
const YAW = 1;
const ZOOM = 2;
const TOGGLE_CAM = 3;

var orbitCam = new c3dl.OrbitCamera();
orbitCam.setFarthestDistance(10000);
orbitCam.setClosestDistance(100);
orbitCam.setPosition([4900,900,0]);

// load the model before rendering page
c3dl.addMainCallBack(canvasMain, "mocap");
c3dl.addModel("cube.dae");

/* This callback function is used by the scene class.  Every time
   the scene is updated, it will get called.  This function tests
   the amount of time elapsed since the last update and selects
   the frame to display accordingly. */
function updatePoints(time)
{
	// totaltime stores amount of time passed since page was loaded.
	// elapsed stores teh time since the last update
	// time is in milliseconds.
	totaltime = totaltime+time;
	elapsed += time;
	frame += Math.round(elapsed / (2500/frate));
	if(frame >= maxFrames) {
		frame = 0;
	}
	if(Math.round(elapsed / (2500/frate)) > 0) {
		elapsed = 0;
		var currentObjects = x[frame].getElementsByTagName("point");

		for(var i = 0; i < pointList.length; i++)
		{
			var px = parseInt(currentObjects[i].attributes.item(0).nodeValue);
			var py = parseInt(currentObjects[i].attributes.item(1).nodeValue);
			var pz = parseInt(currentObjects[i].attributes.item(2).nodeValue);
			
			//pointList.setPointCoord(i, [px,py,pz]);
			var p = pointList[i];
			p.setPosition([px, py, pz]);
		}
	}
	document.getElementById('fps').innerHTML = Math.floor(scn.getFPS());

  frate = $("#frateSlider").slider("value");
  document.getElementById('frameRate').innerHTML = frate;

  sphereSize = $("#sphereSizeSlider").slider("value");
  document.getElementById('sphereSize').innerHTML = sphereSize;

  scn.setPointSize(sphereSize);
}

// the function that will be called by the web page. canvasName is the name
// of the canvas where the scene will show.
function canvasMain(canvasName)
{
	// create a new Scene object
	scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);

	totaltime = 0;
	elapsed = 0;
	frame = 0;

	scn.init();

	// floor
	var cube = new c3dl.Collada();
	cube.init('cube.dae');
	cube.translate([0,-100,0]);
	cube.scale([2800,1,3000]);
	scn.addObjectToScene(cube);
		
	// light the floor green
	var spotlight = new c3dl.DirectionalLight();
	spotlight.setOn(true);
	spotlight.setAmbient([0.3,0.5,0.2]);
	spotlight.setDirection([0,-1,0]);
	scn.addLight(spotlight);
	
	scn.setPointRenderingMode(c3dl.POINT_MODE_POINT);
	scn.setAmbientLight([0,0,0]);
	newScene("ff_3on3.combined_rom.xml");
		
	// create a camera
	cam = new c3dl.FreeCamera();
	cam.setPosition(new Array(3000,600,0));

	cam.setLookAtPoint(new Array(0,600,0));
	cam.roll(0.9);
	cam.yaw(0.5);
	
	scn.setCamera(orbitCam);
	scn.setUpdateCallback(updatePoints);
	scn.setKeyboardCallback(up,down);
	scn.setMouseCallback(mouseUp, mouseDown, mouseMove, updateM);
	scn.setPickingCallback(pickCallback);
	scn.startScene();
}

function down(){}

function updateM(event)
{	
	// towards user
	if(-event.detail*ZOOM_SENSITIVITY < 0)
	{
		orbitCam.goFarther(-1 * -event.detail*ZOOM_SENSITIVITY);
	}
	// towards screen
	else
	{
		orbitCam.goCloser(-event.detail*ZOOM_SENSITIVITY);
	}
}

function pickCallback(pickingObj)
{
	var objects = pickingObj.getObjects();

	var done = false;

	for(var i = 0; !done && i < objects.length; i++)
	{
		if( objects[i] instanceof c3dl.Point)
		{
			var color = objects[i].getColor();

			var r = (parseInt(color[0] * 16)).toString(16);
			var g = (parseInt(color[1] * 16)).toString(16);
			var b = (parseInt(color[2] * 16)).toString(16);							

			document.getElementById('fps').color =	 "#" + r+r + g+g + b+b;
			done = true;
		}
	}
}

function changeKeyState(event, keyState)
{
	switch( event.keyCode)
	{
		case KEY_ZOOM: keysPressed[ZOOM] = keyState;break;
		case KEY_PITCH: keysPressed[PITCH] = keyState;break;
		case KEY_YAW: keysPressed[YAW] = keyState;break; 
	}
}

function up(event)
{	
	var glCanvas3D = scn.getRenderer().getGLContext();

	// C - color change
	if(event.keyCode == 67)
	{
		for(var i = 0; i < pointList.length; i++)
		{
			// create a random color for each point so we can distinguish
			// them easily.
			pointList[i].setColor([Math.random(),Math.random(),Math.random()]);
		}
	}
	
	// A
	if(event.keyCode == 65)
	{
		if(frate - 10 >= 0)
		{
			frate -= 10;
			document.getElementById('debug').innerHTML = "Frame Rate = " + frate;
		}
	}

	// E
	if(event.keyCode == 69)
	{
		for(var i=0; i < 50; i++)
		{
			var p = new c3dl.Point();
			p.setColor([255,255,255]);
			p.setPosition([0,0,i*10]);
			scn.addObjectToScene(p);
		}
	}
	
  // D
	if(event.keyCode == 68)
	{
		scn.setPointSize( scn.getPointSize() - 2);
	}

	// Q
	if(event.keyCode == 81)
	{
		frate += 10;
		document.getElementById('debug').innerHTML = "Frame Rate = " + frate;
	}

	// R - fix this
	if(event.keyCode == 82)
	{
		//cam.roll(0.1);
		//newScene("ff_3on3.combined_rom.xml");
	}

	// V change visibility
	if(event.keyCode == 86)
	{
		for(var i = 0; i < 20; i++)
		{
			pointList[i].setVisible(!pointList[i].isVisible());
		}
	}	
}

function changePointRenderingMode(mode)
{
	if(mode == 1)
	{
		scn.setPointRenderingMode(c3dl.POINT_MODE_SPHERE);
	}
	else if( mode == 0)
	{
		scn.setPointRenderingMode(c3dl.POINT_MODE_POINT);
	}
}

function newPointColors()
{
	for(var i = 0; i < pointList.length; i++)
	{
		// create a random color for each point so we can distinguish
		// them easily.
		pointList[i].setColor([Math.random(),Math.random(),Math.random()]);
	}
}

function newScene(fName)
{
	totaltime = 0;
	elapsed = 0;
	frame = 0;

  xmlDoc = document.implementation.createDocument("","",null);
  xmlDoc.async = false;
  var xmlReq = new XMLHttpRequest();
  xmlReq.open("GET", fName, false);
  xmlReq.send(null);
  xmlDoc=xmlReq.responseXML;
	x = xmlDoc.getElementsByTagName("frame");
	maxFrames = x.length;
	var fileInfo = xmlDoc.getElementsByTagName("info");
	frate = parseInt(fileInfo[0].attributes.item(3).nodeValue);
	var currentObjects = x[0].getElementsByTagName("point");//get just the point nodes from the first frame

//	pointList.setAttenuation([0,0,0.000000008]);
//	pointList.setAttenuation([0,0.00001,0.00000001]);
//	pointList.setAttenuation([0.15,0,0]);
//	pointList.setAttenuation([1e-2,1e-9,1e-8]);
//	pointList.setAttenuation([0,1e-5,1e-8]);
//	pointList.setAttenuation([0,0.00005,0]);

	scn.setPointAttenuation([0.1, 0, 0]);

	pointList = new Array();

	for(var i = 0; i < currentObjects.length; i++)
	{
		var p = new c3dl.Point();
		p.setPosition(
						[parseInt(currentObjects[i].attributes.item(0).nodeValue), 
						parseInt(currentObjects[i].attributes.item(1).nodeValue),
						parseInt(currentObjects[i].attributes.item(2).nodeValue)]
					);

		// create a random color for each point so we can distinguish them easily.
		p.setColor([Math.random(),
					Math.random(),
					Math.random()]);

		pointList.push(p);
		scn.addObjectToScene(p);		
	}
}

function mouseUp(event)
{
	// user released the LMB.
	if(event.which == 1)
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

		orbitCam.yaw(-deltaX * SENSITIVITY);
		orbitCam.pitch(deltaY * SENSITIVITY);
		
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