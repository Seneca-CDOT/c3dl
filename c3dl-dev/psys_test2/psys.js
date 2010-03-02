var scn;
var psys;

var isDragging = false;
var rotationStartCoords = [0,0];
const SENSITIVITY = 1;
const KB_SENSITIVITY = 5;
const ZOOM_SENSITIVITY = 3;

var orbitCam = new c3dl.OrbitCamera();
orbitCam.setFarthestDistance(100);
orbitCam.setClosestDistance(10);
orbitCam.setPosition([0,0,90]);

function applychanges()
{
	var f = document.forms[0];

	var emitRate = parseInt(f.emitrate.value);

	var mincolor = [parseFloat(f.mincolr.value), parseFloat(f.mincolg.value), parseFloat(f.mincolb.value), parseFloat(f.mincola.value)];
	var maxcolor = [parseFloat(f.maxcolr.value), parseFloat(f.maxcolg.value), parseFloat(f.maxcolb.value), parseFloat(f.maxcola.value)];

//	var srcblend = parseInt(f.srcblend.options[f.srcblend.selectedIndex].value);
//	var dstblend = parseInt(f.dstblend.options[f.dstblend.selectedIndex].value);

	var minvel	= [parseFloat(f.minvelx.value), parseFloat(f.minvely.value), parseFloat(f.minvelz.value)];
	var maxvel	= [parseFloat(f.maxvelx.value), parseFloat(f.maxvely.value), parseFloat(f.maxvelz.value)];

	var accel = [parseFloat(f.accelx.value), parseFloat(f.accely.value), parseFloat(f.accelz.value)];

	var minlife = parseFloat(f.minlife.value);
	var maxlife = parseFloat(f.maxlife.value);
  
  var maxsize = parseFloat(f.maxsize.value);
  var minsize = parseFloat(f.minsize.value);

	psys.setEmitRate(emitRate);
	psys.setMinColor(mincolor);
	psys.setMaxColor(maxcolor);
//	psys.setSrcBlend(srcblend);
//	psys.setDstBlend(dstblend);
	psys.setTexture(f.texture.options[f.texture.selectedIndex].value);
	//c3dl.debug.logError(f.texture.options[f.texture.selectedIndex].value);

	psys.setMinLifetime(minlife);
	psys.setMaxLifetime(maxlife);

	psys.setMinVelocity(minvel);
	psys.setMaxVelocity(maxvel);
  
  psys.setMinSize(minsize);
  psys.setMaxSize(maxsize);

	psys.setAcceleration(accel);
}

c3dl.addMainCallBack(canvasMain, 'psys');

function canvasMain(canvasName)
{
	scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	renderer.addTexture('flare.jpg');
	scn.setRenderer(renderer);
	scn.init();
  scn.setBackgroundColor([0,0,0,0]);
	
	psys = new c3dl.ParticleSystem();
	psys.setMinVelocity([-2,15,-2]);
	psys.setMaxVelocity([2,25, 2]);
  
	psys.setMinLifetime(0.3);
	psys.setMaxLifetime(0.7);
  
	psys.setMinColor([0.4,0,0,0]);
	psys.setMaxColor([1,0.4,0,1]);
  
	psys.setSrcBlend(c3dl.ONE);
	psys.setDstBlend(c3dl.ONE);
  
  psys.setMinSize(1.0);
  psys.setMaxSize(5.0);
  
	psys.setTexture("flare.gif");
	psys.setAcceleration([0,0,0]);
	psys.setEmitRate(80);
	psys.init(150);
	scn.addObjectToScene(psys);
  
	scn.setCamera(orbitCam);
	scn.startScene();
	scn.setMouseCallback(mouseUp, mouseDown, mouseMove, null) 
	scn.setUpdateCallback(update);
}

function update()
{
	document.getElementById('fps').innerHTML = Math.floor(scn.getFPS());
}


function changedEffect()
{
  var f = document.forms[0];
  var effectID = parseInt(f.effects.options[f.effects.selectedIndex].value);
  
  // Debug
  if(effectID == 0)
  {
    f.emitrate.value = 2;

    f.mincolr.value = 0.5;
    f.mincolg.value = 0;
    f.mincolb.value = 0;
    f.mincola.value = 0;

    f.maxcolr.value = 1;
    f.maxcolg.value = 0;
    f.maxcolb.value = 0;
    f.maxcola.value = 1;

    f.texture.selectedIndex = 0;

    f.minvelx.value = -2;
    f.minvely.value = -2;
    f.minvelz.value = -2;

    f.maxvelx.value = 2;
    f.maxvely.value = 2
    f.maxvelz.value = 2;

    f.accelx.value = 0;
    f.accely.value = 0;
    f.accelz.value = 0;

    f.minlife.value = 5;
    f.maxlife.value = 7;
  }
  
  // Flame
  else if(effectID == 1)
  {
      u(document.forms[0],
      80,2,
      0.4,0,0,0,
      1,0.4,0,1,
      -2,15,-2,
      2,25,2,
      0,0,0,    
      0.5,0.7,
      0.5,2);
  }
  
  // Bubbles
  else if(effectID == 2)
  {
    u(document.forms[0],
      5,3,
      0,0,0.3,0,
      0,0.3,0.5,1,
      -2,0,-2,
      2,15,2,
      0,9,0,
      4,6,
      0.5,2);
  }
  
  // Dazzle
  else if(effectID == 3)
  {
     u(document.forms[0],
      50,1,
      0,0,0,0,
      1,1,1,1,
      -15,-15,-15,
      15,15,15,
      0,0,0,
      0.5,0.8,
      0.5,3);
  }
  
  // ??
  else if(effectID == 4)
  {
     u(document.forms[0],
      30,2,
      0,0,0,0,
      0,0.1,1,1,
      -1,46,0,
      1,40,0,
      4,-30,0,
      3,5,
      4,5);
  }

  // Gassy
  else if(effectID == 5)
  {
     u(document.forms[0],
      8,2,
      0.2,0.15,0.15,0.55,
      0.18,0.3,0.65,0.5,
      8.1,0.2,9.2,
      -6.8,0.44,7.5,
      1.2,5,-7.5,
      2,8,
      0.5,3);
  }
  
   // Starfield
  else if(effectID == 6)
  {
    u(document.forms[0],
    20,1,
    1,1,1,1,
    1,1,1,1,
    -10,-10,-10,
    10,10,10,
    0,0,0,      
    4,5,
    0.5,3);
  }
  
  // Weave
  else if(effectID == 7)
  {
    u(document.forms[0],
    4,2,
    0.65,0.25,0.55,0.25,
    0.4,0.3,0.6,0,
    -6.5,-0.5,-3.5,
    -2.5,0.15,0.5,
    1.5,-1.5,0.68,     
    4,11,
    0.5,2);
  }

  // Cotton Candy
  else if(effectID == 8)
  {
    u(document.forms[0],
    20,2,
    0.85,0.2,0.8,0.5,
    0,0,0.5,0.5,
    -3.5,9.5,0,
    3.5,8.0,0,
    0,0,0,    
    0.5,2,
    0.8,2);
  }
  
  // Large flame
  else if(effectID == 9)
  {
    u(document.forms[0],
    60,2,
    0.9,0.4,0.45,0,
    0.55,0.5,0,0.5,
    -5,0,-8,
    -5,18,-9,
    0,0,0,    
    2,4,
    2,3);
  }
  
  // Fast Bubbles
  else if(effectID == 10)
  {
    u(document.forms[0],
    40,3,
    0.2,0.15,0.9,0.5,
    0.3,0.15,0.45,0.9,     
    5,-35,5,
    -5,5,-5,
    10,20,0,    
    3,8,
    0.2,2);
  }
}

function u(f,emitRate, tex,
            minr,ming,minb,mina, 
            maxr,maxg,maxb,maxa, 
            minx,miny,minz,
            maxx,maxy,maxz,
            acx,acy,acz,
            minl,maxl,
            mins,maxs)
{
  // update the form
  f.emitrate.value = emitRate

  f.mincolr.value = minr;
  f.mincolg.value = ming;
  f.mincolb.value = minb;
  f.mincola.value = mina;

  f.texture.selectedIndex = tex;

  f.maxcolr.value = maxr;
  f.maxcolg.value = maxg;
  f.maxcolb.value = maxb;
  f.maxcola.value = maxa;

  f.minvelx.value = minx;
  f.minvely.value = miny;
  f.minvelz.value = minz;

  f.maxvelx.value = maxx;
  f.maxvely.value = maxy;
  f.maxvelz.value = maxz;

  f.accelx.value = acx;
  f.accely.value = acy;
  f.accelz.value = acz;

  f.minlife.value = minl;
  f.maxlife.value = maxl;

  f.minsize.value = mins;
  f.maxsize.value = maxs;

  // create aliases
	var emitRate = parseInt(f.emitrate.value);

	var mincolor = [parseFloat(f.mincolr.value), parseFloat(f.mincolg.value), parseFloat(f.mincolb.value), parseFloat(f.mincola.value)];
	var maxcolor = [parseFloat(f.maxcolr.value), parseFloat(f.maxcolg.value), parseFloat(f.maxcolb.value), parseFloat(f.maxcola.value)];

	//var srcblend = parseInt(f.srcblend.options[f.srcblend.selectedIndex].value);
	//var dstblend = parseInt(f.dstblend.options[f.dstblend.selectedIndex].value);

	var minvel	= [parseFloat(f.minvelx.value), parseFloat(f.minvely.value), parseFloat(f.minvelz.value)];
	var maxvel	= [parseFloat(f.maxvelx.value), parseFloat(f.maxvely.value), parseFloat(f.maxvelz.value)];

	var accel = [parseFloat(f.accelx.value), parseFloat(f.accely.value), parseFloat(f.accelz.value)];

	var minlife = parseFloat(f.minlife.value);
	var maxlife = parseFloat(f.maxlife.value);
  
  var maxsize = parseFloat(f.maxsize.value);
  var minsize = parseFloat(f.minsize.value);

  // update the particle system
	psys.setEmitRate(emitRate);
	psys.setMinColor(mincolor);
	psys.setMaxColor(maxcolor);
	//psys.setSrcBlend(srcblend);
	//psys.setDstBlend(dstblend);
	psys.setTexture(f.texture.options[f.texture.selectedIndex].value);

	psys.setMinLifetime(minlife);
	psys.setMaxLifetime(maxlife);

	psys.setMinVelocity(minvel);
	psys.setMaxVelocity(maxvel);
  
  psys.setMinSize(minsize);
  psys.setMaxSize(maxsize);

	psys.setAcceleration(accel);
}

function getRandom(min, max)
{
  var a = c3dl.getRandom();
}

function trimNums(value)
{
  // convert to string
  var s = "" + value;
  s = s.substr(0,4);

  // convert back to number
  return parseFloat(s);
}


function getRandom(min,max)
{
  return trimNums(c3dl.getRandom(min,max));
}

function abc()
{
    var minsize = getRandom(0.1,2);   
    var maxsize = minsize + getRandom(0,2);
    var minlife = getRandom(0.1,3);
    var maxlife = minsize + getRandom(0,2);
    var ax,ay,az;
    
    if(c3dl.getRandom(0,1) > 0.8)
    {
      ax = getRandom(-2,2);
      ay = getRandom(-2,2);
      az = getRandom(-2,2);
    }
    else
    {
      ax = 0;
      ay = 0;
      az = 0;
    }
   
    u(document.forms[0],
    getRandom(1,80), getRandom(0,4),
    getRandom(0,1), getRandom(0,1), getRandom(0,1), getRandom(0,1),
    getRandom(0,1), getRandom(0,1), getRandom(0,1), getRandom(0,1),
    getRandom(-10,10), getRandom(-10,10), getRandom(-10,10),
    getRandom(-10,10), getRandom(-10,10), getRandom(-10,10),
    ax,ay,az,
    minsize, maxsize,
    minlife, maxlife);
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

function xevtpos(evt)
{
  return 2 * (evt.clientX / evt.target.width) - 1;
}

function yevtpos(evt)
{
  return 2 * (evt.clientY / evt.target.height) - 1;
}
