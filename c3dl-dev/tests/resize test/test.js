

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");
c3dl.addModel("road.dae");
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

    var things = [];
    
      
    if(scn.init(canvasName))
    {
      for(var i=0;i<4;i++)
      {
        things[i] = new c3dl.Collada();
        things[i].init("duck.dae");
        things[i].scale(new Array(0.05,0.05,0.05));

        // set the position of the teapot
        things[i].translate(new Array(-7 + i*9,1,-25));

        // Add the object to the scene
        scn.addObjectToScene(things[i]);
      }
      
      things[4] = new c3dl.Collada();
      things[4].init("road.dae");
      things[4].setPosition([0, 0, -15]);
      scn.addObjectToScene(things[4]);
      
      things[5] = new c3dl.Collada();
      things[5].init("duck.dae");
      things[5].scale([0.05,0.05,0.05]);
      things[5].setPosition([200,0,180]);
      scn.addObjectToScene(things[5]);
      
      things[6] = new c3dl.Collada();
      things[6].init("duck.dae");
      things[6].scale([0.05,0.05,0.05]);
      things[6].setPosition([-200,0,180]);
      scn.addObjectToScene(things[6]);
      
      things[7] = new c3dl.Collada();
      things[7].init("duck.dae");
      things[7].scale([0.05,0.05,0.05]);
      things[7].setPosition([100,0,100]);
      scn.addObjectToScene(things[7]);
      
      things[8] = new c3dl.Collada();
      things[8].init("duck.dae");
      things[8].scale([0.05,0.05,0.05]);
      things[8].setPosition([-100,0,100]);
      scn.addObjectToScene(things[8]);

      things[9] = new c3dl.Collada();
      things[9].init("duck.dae");
      things[9].scale([0.05,0.05,0.05]);
      things[9].setPosition([100,0,300]);
      scn.addObjectToScene(things[9]);
      
      things[10] = new c3dl.Collada();
      things[10].init("duck.dae");
      things[10].scale([0.05,0.05,0.05]);
      things[10].setPosition([-100,0,300]);
      scn.addObjectToScene(things[10]);
      
      things[11] = new c3dl.Collada();
      things[11].init("duck.dae");
      things[11].scale([0.05,0.05,0.05]);
      things[11].setPosition([0,0,-400]);
      scn.addObjectToScene(things[11]);

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

function resize(height,width) {
  scn.setSize(height,width);
}