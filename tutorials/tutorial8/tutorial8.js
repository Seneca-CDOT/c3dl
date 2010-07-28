//Particle Systems Tutorial
var psys;
var cam;

c3dl.addMainCallBack(canvasMain, "tutorial");

// The program main
function canvasMain(canvasName)
{
  // Create new c3dl.Scene object
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);

  // Create GL context
  renderer = new c3dl.WebGL();
  //set the background of the scene
  scn.setBackgroundColor([0,0,0]);

  // Attach renderer to the scene
  scn.setRenderer(renderer);
  scn.init();
  //create a camera
  cam = new c3dl.FreeCamera();
      
  // Place the camera.
  cam.setPosition([0, 0, 0]);

  // Point the camera.
  // Here it is pointed directly down the Z-axis..
  cam.setLookAtPoint([0, 0, -1]);

  // Add the camera to the scene
  scn.setCamera(cam);

  // Start the scene
  scn.startScene();

  //This is the new code for the particle system
  //add the particle system
  psys = new c3dl.ParticleSystem();
  //position it in the scene, in full view of the camera
  psys.setPosition([0,0,-20]);
  //set the initial range of velocities possible for each particle
  psys.setMinVelocity([-4,-4,-4]);
  psys.setMaxVelocity([-2,2,2]);
  //set the range of time (in seconds) that a particle can last
  psys.setMinLifetime(0.5);
  psys.setMaxLifetime(3);
  //Set the range of colours for particles
  psys.setMinColor([0.8,0.4,0.4,0.5]);
  psys.setMaxColor([1,0.6,0.6,1]);
  //set range of sizes for particle
  psys.setMinSize(0.1);
  psys.setMaxSize(0.5);
  //specify how overlapping particles will be rendered
  psys.setSrcBlend(c3dl.ONE);
  psys.setDstBlend(c3dl.DST_ALPHA);
  //set the texture the particles will use
  psys.setTexture("flare.png");
  //Set the acceleration that will be applied to every particle
  psys.setAcceleration([0,-5,0]);
  //Set how many particles the system will emit every second
  psys.setEmitRate(5);
  //Set the total number of particles available to the system
  psys.init(50);

  //add the particle system to the scene
  scn.addObjectToScene(psys);

//END OF NEW CODE
}
