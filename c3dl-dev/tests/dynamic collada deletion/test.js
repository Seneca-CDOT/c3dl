// Tutorial 6: picking

// The models used need to be parsed before the page
// renders. This code will parse the model files
// and when this is complete the parser will call the
// main. The argument being passed - "tutorial" -
// is the id of the canvas element on the html page.

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("models/duck.dae");
c3dl.addModel("models/teapot.dae");
c3dl.addModel("models/fly_plane_tri.dae");
var drawPoint;

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

    if(scn.init(canvasName))
    {
      var obj;
      obj = new c3dl.Model();
      obj.init("models/duck.dae");
      obj.setTexture("images/duck.png");
      obj.scale([0.05,0.05,0.05]);
      obj.setPosition([-20,0,-100]);
      scn.addObjectToScene(obj);
      
      obj = new c3dl.Model();
      obj.init("models/teapot.dae");
      obj.setTexture("images/teapot.png");
      obj.scale([0.5,0.5,0.5]);
      obj.setPosition([0,5,-100]);
      scn.addObjectToScene(obj);
      
      obj = new c3dl.Model();
      obj.init("models/fly_plane_tri.dae");
      obj.setTexture("images/planeDiffuse.jpg");
      obj.setPosition([20,5,-100]);
      scn.addObjectToScene(obj);

      // Create a camera
      var cam = new c3dl.FreeCamera();

      // Place the camera at the origin.
      // Canvas3d uses a right handed co-ordinate system.
      cam.setPosition([0.0, 0.0, 50.0]);

      // Point the camera.
      // Here it is pointed directly along the z-axis
      cam.setLookAtPoint([0.0, 0.0, -10.0]);

      // Add the camera to the scene
      scn.setCamera(cam);

      // Start the scene
      scn.startScene();
      scn.setUpdateCallback(checktime);
    

      // tell the scene what function to use when
      // a mouse event is detected
      scn.setPickingCallback(handler);

    }
}

// This function is the callback that is passed to the scene.
// When a mouse down event is detected this function is called.
// The handler is given an object that knows what button was
// pressed and has a list of objects picked.
function handler(result)
{
	var buttonUsed = result.getButtonUsed();
	var objectsPicked = result.getObjects();
	if(objectsPicked != undefined)
	{
		// a left mouse click will equal 1;
		// at present that is the only mouse event implemented
		if (buttonUsed == 1)
		{
			// loop through the objects
			for(var i = 0 ; i < objectsPicked.length; i++)
			{
				// get the object that was picked
				obj = objectsPicked[i];
				// delete the object
				scn.removeObjectFromScene(obj);
				c3dl.ModelManager.deleteFile(obj.getPath());
				delete obj;
			}
		}
	}
}

function checktime(time){
  document.getElementById('fps').innerHTML = scn.getFPS();
}