c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("models/duck.dae");
var scn;
var spotLights = [];


function up(event) {
  switch(event.keyCode) {
    case 49: scn.removeLightFromScene(0);
      break;
    case 50: scn.removeLightFromScene(1);
      break;
    case 51: scn.removeLight(spotLights[2]);
      break;
    case 52: scn.removeLightFromScene(3);
      break;
    case 53: scn.removeLight("red");
      break;
  }
}

function down(event) {
  //DNGN
}

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
    scn.setAmbientLight([0,0,0,0]);

    var things = [];
    //spotLights = [];
    if(scn.init(canvasName))
    {
      for(var i=0;i<4;i++)
      {
        things[i] = new c3dl.Model();
        things[i].init("models/duck.dae");
        things[i].scale(new Array(0.05,0.05,0.05));
        // set the position of each duck
        things[i].translate(new Array(-30 + i*20,1,-25));
        // Add each duck to the scene
        scn.addObjectToScene(things[i]);

        spotLights[i] = new c3dl.SpotLight();
        spotLights[i].setPosition([-30 + i*20,30,-25]);
        spotLights[i].setDirection([0,-1,0]);
        spotLights[i].setDiffuse([0.5,1,0.5]);
        spotLights[i].setOn(true);
        spotLights[i].setCutoff(40);
        scn.addLight(spotLights[i]);
      }
      
      //create the reddish directional light
      var posLight = new c3dl.PositionalLight();
      posLight.setName("red");
      posLight.setPosition([0,-50,100]);
      posLight.setDiffuse([0.8,0.4,0.4]);
      posLight.setOn(true);
      scn.addLight(posLight);

      // Create a camera
      var cam = new c3dl.FreeCamera();

      // Place the camera at the origin.
      // Canvas3d uses a right handed co-ordinate system.
      cam.setPosition([0.0, 0.0, 100.0]);

      // Point the camera.
      // Here it is pointed directly along the z-axis
      cam.setLookAtPoint([0.0, 0.0, -10.0]);

      // Add the camera to the scene
      scn.setCamera(cam);
      scn.setKeyboardCallback(up,down);

      // Start the scene
      scn.startScene();

    }
}