const SENSITIVITY = 1;
const ZOOM_SENSITIVITY = 3;

var isDragging = false;
var rotationStartCoords = [0,0];

var effectCounter = 0;
var effects, scene;
var light, light2, light3;

c3dl.addModel('models/teapot.dae');
c3dl.addModel('models/fly_plane_tri.dae');
c3dl.addMainCallBack(effect_test, 'effect_test');

var orbitCam = new c3dl.OrbitCamera();
orbitCam.setFarthestDistance(250);
orbitCam.setClosestDistance(30);
orbitCam.setDistance(280);
orbitCam.setPosition([0,0,130]);

var teapots = [];

var simpleIEffect, simpleIEffect2;
var celIEffect;
var goochEffect, goochEffect2;

// outlines for gooch and cel effects
var outlineOn = true;

//
function effect_test(canvasName)
{
  scene = new c3dl.Scene();		
  scene.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();

  scene.setRenderer(renderer);
  scene.init();
  scene.setAmbientLight([0,0,0]);  

  // LIGHTS
  light = new c3dl.PositionalLight();
  light.setPosition([0,200,150]);
  light.setDiffuse([1,1,1]);
  light.setName('light1');
  light.setOn(false);
  scene.addLight(light);

  light2 = new c3dl.DirectionalLight();
  light2.setDirection([0,0,-1]);
  light2.setSpecular([1,0,0]);
  light2.setOn(false);
  scene.addLight(light2);

  /////////////////////////////////////////////////	

  // GREYSCALE
  greyscaleEffect = new c3dl.Effect();
  greyscaleEffect.init(c3dl.effects.GREYSCALE);

  teapots.push(new c3dl.Collada());
  teapots[0].init("models/teapot.dae");
  teapots[0].setTexture("models/images/red.jpg");
  teapots[0].translate([0,40,0]);
  teapots[0].setEffect(greyscaleEffect);
  scene.addObjectToScene(teapots[0]);
  orbitCam.setOrbitPoint(teapots[0].getPosition());

  // SEPIA
  var sepiaEffect = new c3dl.Effect();
  sepiaEffect.init(c3dl.effects.SEPIA);
  sepiaEffect.setParameter("color", [1.2, 1.0, 0.8]);

  teapots[1] = new c3dl.Collada();
  teapots[1].init("models/teapot.dae");
  teapots[1].setTexture("models/images/red.jpg");
  teapots[1].translate([30,40,0]);
  teapots[1].setEffect(sepiaEffect);
  scene.addObjectToScene(teapots[1]);

  // CARTOON
  celIEffect = new c3dl.Effect();
  celIEffect.init(c3dl.effects.CARTOON);
  celIEffect.setParameter("qMap", "models/images/shades.jpg");

  teapots.push(new c3dl.Collada());
  teapots[2].init("models/teapot.dae");
  teapots[2].setTexture("models/images/texture.jpg");
  teapots[2].translate([0,20,0]);
  teapots[2].setEffect(celIEffect);
  scene.addObjectToScene(teapots[2]);

  // SOLID COLOR
  solidColorEffect = new c3dl.Effect();
  solidColorEffect.init(c3dl.effects.SOLID_COLOR);
  solidColorEffect.setParameter("color", [0.0, 1.0, 0.0]);	

  teapots.push(new c3dl.Collada());
  teapots[3].init("models/teapot.dae");
  teapots[3].translate([30,20,0]);
  teapots[3].setEffect(solidColorEffect);
  scene.addObjectToScene(teapots[3]);

  // STANDARD
  teapots.push(new c3dl.Collada());
  teapots[4].init("models/teapot.dae");
  teapots[4].setTexture("modes/images/red.jpg");
  teapots[4].setVisible(false);
  scene.addObjectToScene(teapots[4]);

  // GOOCH
  goochEffect = new c3dl.Effect();
  goochEffect.init(c3dl.effects.GOOCH);

  teapots.push(new c3dl.Collada());
  teapots[5].init("models/teapot.dae");
  teapots[5].translate([30,0,0]);
  teapots[5].setEffect(goochEffect);
  scene.addObjectToScene(teapots[5]);

  // VARYING
  teapots.push(new c3dl.Collada());
  teapots[6].init("models/teapot.dae");
  teapots[6].setTexture("models/images/red.jpg");
  teapots[6].translate([0,-20,0]);
  teapots[6].setEffect(c3dl.effects.STANDARD);
  scene.addObjectToScene(teapots[6]);

  // GOOCH
  goochEffect2 = new c3dl.Effect();
  goochEffect2.init(c3dl.effects.GOOCH);
  goochEffect2.setParameter("warmColor", [1,1,1]);
  goochEffect2.setParameter("coolColor", [0,0,0]);

  teapots.push(new c3dl.Collada());
  teapots[7].init("models/teapot.dae");
  teapots[7].translate([30,-20,0]);
  teapots[7].setEffect(goochEffect2);
  scene.addObjectToScene(teapots[7]);

  var plane = new c3dl.Collada();
  plane.init("models/fly_plane_tri.dae");
  plane.scale([2,2,2]);
  plane.setEffect(celIEffect);

  var propNode = plane.getSceneGraph().findNode('prop');
  var planeNode = plane.getSceneGraph().findNode('plane');
  scene.addObjectToScene(plane);

  propNode.setAngularVel([0,0,0.002]);
  planeNode.setAngularVel([0,0.001,0.0]);

  scene.setCamera(orbitCam);
  scene.startScene();
  scene.setUpdateCallback(update);
  scene.setMouseCallback(mouseUp,mouseDown, mouseMove, mouseScroll);
  scene.setKeyboardCallback(onKeyUp, onKeyDown);

  effects = [c3dl.effects.STANDARD,celIEffect,greyscaleEffect,sepiaEffect, goochEffect];
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

function update(event)
{	
  document.getElementById('debug').innerHTML = "FPS:" + Math.floor(scene.getFPS());
}

function onKeyUp(event)
{
	changeKeyState(event, false);
}

function toggleOutlines()
{
  outlineOn = !outlineOn;
  celIEffect.setParameter("outline", outlineOn);
  goochEffect.setParameter("outline", outlineOn);
  goochEffect2.setParameter("outline", outlineOn);
}

function toggleLight(id)
{
  if(id == 1)
  {
    light.setOn(!light.isOn());
  }
  else if(id == 2)
  {
    light2.setOn(!light2.isOn());
  }
}

function changeOrbit(id)
{
  orbitCam.setOrbitPoint(teapots[id-1].getPosition());
}

function onKeyDown(event)
{
	changeKeyState(event, true);
	
	if(event.keyCode == 65)
	{
		effectCounter++;
		if(effectCounter >= effects.length)
		{
			effectCounter = 0;
		}
		
		teapots[6].setEffect(effects[effectCounter]);
	}

	// B
	if(event.keyCode == 66)
	{
		celIEffect.setParameter("outline", !celIEffect.getParameter("outline"));
		goochEffect.setParameter("outline", !goochEffect.getParameter("outline"));
	}
	
	//E
	if(event.keyCode == 69)
	{
		c3dl.debug.logInfo(goochEffect2.getParameter("warmColor"));
		c3dl.debug.logInfo(goochEffect.getParameter("warmColor"));
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

function mouseScroll(event)
{
  var d = event.wheelDelta ? -event.wheelDelta/100: event.detail;

  // towards user
  if(-d * ZOOM_SENSITIVITY < 0)
  {
    orbitCam.goFarther(-1 * -d * ZOOM_SENSITIVITY);
  }

  // towards screen
  else
  {
    orbitCam.goCloser(-d * ZOOM_SENSITIVITY);
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
