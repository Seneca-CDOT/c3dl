c3dl.addModel("duck.dae");
c3dl.addMainCallBack(yawCallback, "yaw");
c3dl.addMainCallBack(pitchCallback, "pitch");
c3dl.addMainCallBack(rollCallback, "roll");

var yawCamera;
var pitchCamera;
var rollCamera;
var yawDir = 1;
var pitchDir = 1;
var rollDir = 1;
var yawTimer = 0;
var pitchTimer = 0;
var rollTimer = 0;

function yawUpdate(time)
{
	yawTimer += time;
	yawCamera.yaw(yawDir * time * Math.PI/6000);
	
	var diff = c3dl.getAngleBetweenVectors(yawCamera.getDir(),[0,0,-1]);
	if(diff >= 60)
	{
		if(yawDir == 1)
		{
			yawCamera.yaw(c3dl.degreesToRadians(-2 * (diff-60)));
		}
		else if(yawDir == -1)
		{
			yawCamera.yaw(c3dl.degreesToRadians(2 * (diff-60)));
		}
		yawDir *= -1;
	}
}

function rollUpdate(time)
{
	rollTimer += time;
	rollCamera.roll(rollDir * time * Math.PI/6000);
	
	var diff = c3dl.getAngleBetweenVectors(rollCamera.getUp(),[0,1,0]);
	if(diff >= 60)
	{
		if(rollDir == 1)
		{
			rollCamera.roll(c3dl.degreesToRadians(-2 * (diff-60)));
		}
		else if(rollDir == -1)
		{
			rollCamera.roll(c3dl.degreesToRadians(2 * (diff-60)));
		}
		rollDir *= -1;
	}
}

function pitchUpdate(time)
{
	pitchTimer += time;
	pitchCamera.pitch(pitchDir * time * Math.PI/6000);
	
	var diff = c3dl.getAngleBetweenVectors(pitchCamera.getDir(),[0,0,-1]);
	if(diff >= 60)
	{
		if(pitchDir == 1)
		{
			pitchCamera.pitch(c3dl.degreesToRadians(-2 * (diff-60)));
		}
		else if(pitchDir == -1)
		{
			pitchCamera.pitch(c3dl.degreesToRadians(2 * (diff-60)));
		}
		pitchDir *= -1;
	}
}

function yawCallback(canvasName)
{
	var scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();
	
	var dir = new c3dl.DirectionalLight();
	dir.setDirection([0,0,1]);
	dir.setDiffuse([.3,.3,.3]);
	dir.setOn(true);
	scn.addLight(dir);
	
	var ducks = [];
	for(var i = 0; i < 10; i++)
	{
			ducks[i] = new c3dl.Collada();
			ducks[i].init("duck.dae");
			ducks[i].scale([0.2,0.2,0.2]);
	
			ducks[i].setPosition([60*i-300,0,0]);
			scn.addObjectToScene(ducks[i]);		
	}

	yawCamera = new c3dl.FreeCamera();
	yawCamera.setPosition(new Array(0, 100, 200));
	yawCamera.setLookAtPoint(new Array(0.0, 50.0, 0.0));

	scn.setCamera(yawCamera);
	scn.setUpdateCallback(yawUpdate);
	scn.startScene();
}

function pitchCallback(canvasName)
{
	var scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();
	
	var dir = new c3dl.DirectionalLight();
	dir.setDirection([0,0,1]);
	dir.setDiffuse([.3,.3,.3]);
	dir.setOn(true);
	scn.addLight(dir);
	
	var ducks = [];
	for(var i = 0; i < 10; i++)
	{
			ducks[i] = new c3dl.Collada();
			ducks[i].init("duck.dae");
			ducks[i].scale([0.2,0.2,0.2]);
	
			ducks[i].setPosition([0,60*i-300,0]);
			scn.addObjectToScene(ducks[i]);		
	}
	
	pitchCamera = new c3dl.FreeCamera();
	pitchCamera.setPosition(new Array(0, 100, 200));
	pitchCamera.setLookAtPoint(new Array(0.0, 50.0, 0.0));

	scn.setCamera(pitchCamera);
	scn.setUpdateCallback(pitchUpdate);
	scn.startScene();
}

function rollCallback(canvasName)
{
	var scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();
	
	var dir = new c3dl.DirectionalLight();
	dir.setDirection([0,0,1]);
	dir.setDiffuse([.3,.3,.3]);
	dir.setOn(true);
	scn.addLight(dir);

	rollCamera = new c3dl.FreeCamera();
	rollCamera.setPosition(new Array(0, 100, 200));
	rollCamera.setLookAtPoint(new Array(0.0, 50.0, 0.0));
	
	var ducks = [];
	for(var i = 0; i < 10; i++)
	{
			ducks[i] = new c3dl.Collada();
			ducks[i].init("duck.dae");
			ducks[i].scale([0.2,0.2,0.2]);
	
			ducks[i].setPosition([60*i-300,0,0]);
			scn.addObjectToScene(ducks[i]);		
	}

	
	scn.setCamera(rollCamera);
	scn.setUpdateCallback(rollUpdate);
	scn.startScene();
}