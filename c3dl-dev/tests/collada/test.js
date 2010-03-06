c3dl.addModel("models/gun.dae");
c3dl.addMainCallBack(gun, "gun");

c3dl.addModel("models/teapot.dae");
c3dl.addMainCallBack(teapot, "teapot");

c3dl.addModel("models/gingerbread_house.dae");
c3dl.addMainCallBack(gingerbread_house, "gingerbread_house");

c3dl.addModel("models/swiss_army_usb.dae");
c3dl.addMainCallBack(swiss_army_usb, "swiss_army_usb");

c3dl.addModel("models/firehall.dae");
c3dl.addMainCallBack(firehall, "firehall");

c3dl.addModel("models/duck.dae");
c3dl.addMainCallBack(duck, "duck");

c3dl.addModel("models/old_cottage.dae");
c3dl.addMainCallBack(old_cottage, "old_cottage");

c3dl.addModel("models/transform_test.dae");
c3dl.addMainCallBack(transform_test, "transform_test");

c3dl.addModel("models/fly_plane_polylist.dae");
c3dl.addMainCallBack(fly_plane_polylist, "fly_plane_polylist");

function gun(canvasName)
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
	
	var obj = new c3dl.Collada();
	obj.init("models/gun.dae");
	obj.setAngularVel([0.001,0.001,0]);

	scn.addObjectToScene(obj);
	scn.setAmbientLight([.3,.3,.3]);

  var cam = new c3dl.FreeCamera();
	cam.setPosition([0,0,-5]);

	scn.setCamera(cam);
	scn.startScene();
}

function firehall(canvasName)
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
	
	var obj = new c3dl.Collada();
	obj.init("models/firehall.dae");
	obj.setAngularVel([0,0.001,0]);

	scn.addObjectToScene(obj);
	scn.setAmbientLight([.3,.3,.3]);

  var cam = new c3dl.FreeCamera();
	cam.setPosition([0,5,-20]);

	scn.setCamera(cam);
	scn.startScene();
}

function teapot(canvasName)
{
	var scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();
	
	var dir = new c3dl.DirectionalLight();
	dir.setDirection([0,0,-1]);
	dir.setDiffuse([1,1,1]);
	dir.setOn(true);
	scn.addLight(dir);

	var obj = new c3dl.Collada();
	obj.init("models/teapot.dae");
  obj.setTexture("models/images/teapot/teapot.png");
	obj.setAngularVel([0,0.001,0]);
	scn.addObjectToScene(obj);

  var cam = new c3dl.FreeCamera();
	cam.setPosition([0,0,50]);
  cam.setLookAtPoint([0,0,0]);
  
  scn.setAmbientLight([.1,.1,.1]);
	scn.setCamera(cam);
	scn.startScene();
}

function gingerbread_house(canvasName)
{
	var scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();
	
	var dir = new c3dl.PositionalLight();
	dir.setPosition([0,50,00]);
	dir.setDiffuse([1,1,1]);
	dir.setOn(true);
	scn.addLight(dir);

	var obj = new c3dl.Collada();
	obj.init("models/gingerbread_house.dae");
  obj.translate([0,-100,-80]);
	obj.setAngularVel([0,0.0001,0.0]);
	scn.addObjectToScene(obj);

  var cam = new c3dl.FreeCamera();
	cam.setPosition([0,0,600]);
  cam.setLookAtPoint([0,0,0]);
	scn.setCamera(cam);

  scn.setAmbientLight([0.3,0.3,0.3]);
	scn.startScene();
}

function swiss_army_usb(canvasName)
{
	var scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();
	
	var dir = new c3dl.DirectionalLight();
	dir.setDirection([0,0,-1]);
	dir.setDiffuse([.8,.8,.8]);
  dir.setOn(true);
	scn.addLight(dir);

	var obj = new c3dl.Collada();
	obj.init("models/swiss_army_usb.dae");
  obj.translate([0,-300,0]);
	obj.setAngularVel([0.0001,0.0001,0.0001]);
	scn.addObjectToScene(obj);

  var cam = new c3dl.FreeCamera();
	cam.setPosition([0,0,3000]);
  cam.setLookAtPoint([0,0,0]);
	scn.setCamera(cam);

  scn.setAmbientLight([0.3,0.3,0.3]);
	scn.startScene();
}

function duck(canvasName)
{
	var scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();
	
	var light = new c3dl.DirectionalLight();
	light.setDirection([0,0,1]);
	light.setDiffuse([.3,.3,.3]);
	light.setOn(true);
	scn.addLight(light);
	
	var obj = new c3dl.Collada();
	obj.init("models/duck.dae");
  obj.scale([.2,.2,.2]);
  obj.translate([0,-15,0]);
//	obj.setAngularVel([0,0.001,0]);

	scn.addObjectToScene(obj);
	scn.setAmbientLight([.3,.3,.3]);

  var cam = new c3dl.FreeCamera();
	cam.setPosition([0,0,-50]);

	scn.setCamera(cam);
	scn.startScene();
}

function old_cottage(canvasName)
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
	
	var obj = new c3dl.Collada();
	obj.init("models/old_cottage.dae");
  obj.translate([0,-2,0]);
//	obj.setAngularVel([0,0.001,0]);

	scn.addObjectToScene(obj);
	scn.setAmbientLight([.3,.3,.3]);

  var cam = new c3dl.FreeCamera();
	cam.setPosition([0,0,-12]);

	scn.setCamera(cam);
	scn.startScene();
}

function transform_test(canvasName)
{
	var scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();
	
	var light = new c3dl.DirectionalLight();
  light.setDiffuse([1,1,1]);
	light.setAmbient([1,1,1]);
	//light.setSpecular([1,1,1]);
	light.setDirection([0,0,-1]);
	light.setOn(true);
	scn.addLight(light);

	var obj = new c3dl.Collada();
	obj.init("models/transform_test.dae");
  obj.translate([0,-5,0]);
  obj.setAngularVel([0,0.001,0]);

	scn.addObjectToScene(obj);
	scn.setAmbientLight([0,0,0]);

  var cam = new c3dl.FreeCamera();
	cam.setPosition([0,0,20]);
  cam.setLookAtPoint([0,0,0]);

	scn.setCamera(cam);
	scn.startScene();
}

function fly_plane_polylist(canvasName)
{
	var scn = new c3dl.Scene();
	scn.setCanvasTag(canvasName);
	var renderer = new c3dl.WebGL();
	scn.setRenderer(renderer);
	scn.init();
	
	var light = new c3dl.DirectionalLight();
  light.setDiffuse([1,1,1]);
	light.setAmbient([1,1,1]);
	light.setDirection([0,0,-1]);
	light.setOn(true);
	scn.addLight(light);

	var obj = new c3dl.Collada();
  obj.init("models/fly_plane_polylist.dae");
  obj.setAngularVel([0,0.001,0]);

	scn.addObjectToScene(obj);
	scn.setAmbientLight([0,0,0]);

  var cam = new c3dl.FreeCamera();
	cam.setPosition([0,0,20]);
  cam.setLookAtPoint([0,0,0]);

	scn.setCamera(cam);
	scn.startScene();
}
