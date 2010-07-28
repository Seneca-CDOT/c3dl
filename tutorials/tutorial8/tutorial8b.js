//Particle Systems Tutorial part 2
var flames;
var fire;
var bubbles;
var cam;

c3dl.addMainCallBack(canvasMain, "tutorial");
c3dl.addModel("duck.dae");
c3dl.addModel("teapot.dae");

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
  scn.init(canvasName);
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
  
  //add a light
  var sun = new c3dl.DirectionalLight();
  sun.setName('mr. sun');
  sun.setDirection([-5,-200,-1]);
  sun.setDiffuse([1,0.8,0.6]);
  sun.setOn(true);
  scn.addLight(sun);

  //add a duck in the lower right portion of the screen, facing left.
  var thing = new c3dl.Collada();
  thing.init("duck.dae");
  thing.setTexture("duck.png");
  thing.scale([0.05,0.05,0.05]);
  thing.setPosition([10,-10,-50]);
  thing.yaw(Math.PI);//rotate the duck to face the other way (pi radians = 10 degrees)
  scn.addObjectToScene(thing);
  
  //create a particle system of flames from the duck's mouth
  flames = new c3dl.ParticleSystem();
  flames.setPosition([6.5,-4,-50]);
  //make the coming out move rapidly left (-x) in a cone
  flames.setMinVelocity([-15,-2,-2]);
  flames.setMaxVelocity([-12,4,2]);
  //keep the lifespan of the particles short without too much variety
  flames.setMinLifetime(0.5);
  flames.setMaxLifetime(0.6);
  //trying to make bluish flame colour...
  flames.setMinColor([0.4,0.4,0.8,0.8]);
  flames.setMaxColor([0.6,0.6,1.0,1]);
  //keep the particles small
  flames.setMinSize(0.5);
  flames.setMaxSize(0.8);
  flames.setSrcBlend(c3dl.ONE);
  flames.setDstBlend(c3dl.DST_ALPHA);
  flames.setTexture("flare.png");
  //make the flames slow down, and start to rise
  flames.setAcceleration([10,5,0]);
  //many particles per second
  flames.setEmitRate(500);
  flames.init(300);
  scn.addObjectToScene(flames);
  
  //create a particle system of the flame body heating the teapot.
  //because of the difference between the flames the duck is breathing and
  // the body of the flames beneath the teapot (we want a distinct change in the way
  // the flames act), we need a second system.
  fire = new c3dl.ParticleSystem();
  //position in front of the duck
  fire.setPosition([2,-4,-50]);
  //low velocity, rising
  fire.setMinVelocity([-2,2,-2]);
  fire.setMaxVelocity([2,4,2]);
  //short duration
  fire.setMinLifetime(0.5);
  fire.setMaxLifetime(0.8);
  // again, bluish-white colour for fire
  fire.setMinColor([0.4,0.4,0.8,0.5]);
  fire.setMaxColor([0.6,0.6,1.0,1]);
  //small particles
  fire.setMinSize(0.1);
  fire.setMaxSize(0.5);
  fire.setSrcBlend(c3dl.ONE);
  fire.setDstBlend(c3dl.DST_ALPHA);
  fire.setTexture("flare.png");
  //make them go up
  fire.setAcceleration([0,5,0]);
  //many particles per second
  fire.setEmitRate(500);
  fire.init(300);
  scn.addObjectToScene(fire);
  
  //add a teapot in front of and above the duck (and above the fire)
  var thing = new c3dl.Collada();
  thing.init("teapot.dae");
  thing.setTexture("teapot.png");
  thing.setPosition([2,4,-50]);
  thing.scale([0.5,0.5,0.5]);
  scn.addObjectToScene(thing);
  
  //add a particle system of steam at the teapot's spout
  bubbles = new c3dl.ParticleSystem();
  bubbles.setPosition([9.5,6.5,-50]);
  //allow a little variety in the x and z axes, but make the particles go up (+y)
  bubbles.setMinVelocity([-1,1,-2]);
  bubbles.setMaxVelocity([2,5,2]);
  //allow a wider range of time
  bubbles.setMinLifetime(1);
  bubbles.setMaxLifetime(2);
  //set to a fairly dark gray colour
  bubbles.setMinColor([0.2,0.2,0.2,0.3]);
  bubbles.setMaxColor([0.2,0.2,0.2,0.5]);
  //allow larger particles
  bubbles.setMinSize(1);
  bubbles.setMaxSize(2);
  bubbles.setSrcBlend(c3dl.ONE);
  bubbles.setDstBlend(c3dl.DST_ALPHA);
  bubbles.setTexture("flare.png");
  //accelerate the particles upwards
  bubbles.setAcceleration([0,5,0]);
  //less particles per second
  bubbles.setEmitRate(50);
  bubbles.init(300);
  scn.addObjectToScene(bubbles);
}
