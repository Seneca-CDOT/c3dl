//This page tests to make sure that picking can be made to react to one of several events.
// here are three different versions of this page.  Version 1 tests the mousedown event,
// version 2 tests mouseup and version 3 tests click.  Each should react the same way (the
// selected duck should start/stop spinning.

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("models/duck.dae");

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

    var things = [];
    if(scn.init(canvasName))
    {
      for(var i=0;i<4;i++)
      {
        things[i] = new c3dl.Model();
        things[i].init("models/duck.dae");
        things[i].scale(new Array(0.05,0.05,0.05));

        // set the position of each duck
        things[i].translate(new Array(-7 + i*9,1,-25));

        // Add the object to the scene
        scn.addObjectToScene(things[i]);
      }

      // Create a camera
      var cam = new c3dl.FreeCamera();

      // Place the camera at the origin.
      // Canvas3d uses a right handed co-ordinate system.
      cam.setPosition([0.0, 0.0, 200.0]);

      // Point the camera.
      // Here it is pointed directly along the z-axis
      cam.setLookAtPoint([0.0, 0.0, -10.0]);

      // Add the camera to the scene
      scn.setCamera(cam);

      // Start the scene
      scn.startScene();

      // tell the scene what function to use when
      // a mouse event is detected
      scn.setPickingCallback(handler,"mouseup");

    }
}

// This function is the callback that is passed to the scene.
// When a mouse up event is detected this function is called.
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
				// manipulate the object
				if(obj.getAngularVel()[0] > 0)
				{
					obj.setAngularVel([0, 0, 0]);
				}
				else
				{
					obj.setAngularVel([0.0003,0.0008,0]);
				}
			}
		}
	}
}