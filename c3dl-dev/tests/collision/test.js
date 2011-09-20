c3dl.addMainCallBack(canvasMain, "test");
c3dl.addModel("models/table.dae");
c3dl.addModel("models/duck.dae");
var timeSinceLastChange=0;
var obj1, obj2, obj3;
var scn, cam, holding;

function canvasMain(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    obj1 = new c3dl.Model();
    obj1.init("models/table.dae");
    obj1.centerObject();
    obj1.setSize(5,5,5);
    obj1.setPosition([0,0,0]);
    obj1.roll(0.7);
    obj1.setName("Table")
    scn.addObjectToScene(obj1);
    //moving object headed to collide
    obj2 = new c3dl.Model();
    obj2.init("models/duck.dae");
    obj2.setSize(5,5,5);
    obj2.roll(-0.7);
    obj2.setPosition([15,0,0]);
    obj2.centerObject();
    obj2.setLinearVel([-0.001,0,0]);
    obj2.setName("MovingDuck")
    scn.addObjectToScene(obj2);
    //object colliding if type set to Collada
    obj3 = new c3dl.Model();
    obj3.init("models/duck.dae");
    obj3.centerObject();
    obj3.setSize(1,1,1);

    obj3.setName("SmallDuck")
    scn.addObjectToScene(obj3);
    cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 0.0, 20.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.setCamera(cam);
    scn.setUpdateCallback(checker);
    scn.setMouseCallback(mouseUp, mouseDown, mouseMove, mouseWheel);
    scn.setKeyboardCallback(onKeyUp, onKeyDown);
    scn.startScene();
    scn.setCollision(true);
    scn.setCollisionType("Geometry");
    scn.setBoundingVolumeVisibility(true);
  }
}

function checker(time){
  var curPos = cam.getPosition();
  if(keysDown.KEY_A){
    var move = cam.getLeft();
    move = c3dl.multiplyVector(move, 2)
    cam.setPosition(c3dl.addVectors(curPos, move));
  }
  //(D)
  if(keysDown.KEY_D){
    var move = cam.getLeft();
    move = c3dl.multiplyVector(move, -2)
    cam.setPosition(c3dl.addVectors(curPos, move));
  }
  //(W)
  if(keysDown.KEY_W){
    var move = cam.getDir();
    move = c3dl.multiplyVector(move, 2)
    cam.setPosition(c3dl.addVectors(curPos, move));
  }
  //(S)
  if(keysDown.KEY_S){
    var move = cam.getDir();
    move = c3dl.multiplyVector(move, -2)
    cam.setPosition(c3dl.addVectors(curPos, move));
  }
  if (holding) {
    camLeftRight = (mouseX - 500 / 2) / 500;
    camUpDown = (500 / 2 - mouseY) / 500;
    cam.rotateOnAxis([0, 1, 0], -camLeftRight / 5);
    cam.pitch(-camUpDown / 5);
  }
  var coll= scn.getCollision();
  var collOutput;
  if (coll.length) { 
    collOutput = "true: ";
    for (var i = 0; i < coll.length; i+=2) {
      collOutput += "<br/>"; 
      collOutput += i/2+1 +". " + coll[i].getName() + " colliding with " + coll[i+1].getName() + " "; 
    }
  }
  else {
    collOutput = false;
  }
  document.getElementById('res').innerHTML = collOutput;
}

function setTypeCollada(){
  scn.setCollisionType("Collada");
  scn.setBoundingVolumeVisibility(false);
  obj1.setRenderObb(true);
  obj2.setRenderObb(true);
  obj3.setRenderObb(true);
}

function setTypeGeometry(){
  scn.setCollisionType("Geometry");
  scn.setBoundingVolumeVisibility(true);
  obj1.setRenderObb(false);
  obj2.setRenderObb(false);
  obj3.setRenderObb(false);
}
function reset(){
  obj2.setPosition([15,0,0]);
}
function pause(){
  if (obj2.getLinearVel()[0] < 0 ) {
    obj2.setLinearVel([0,0,0]);
  }
  else {
    obj2.setLinearVel([-0.001,0,0]);
  }
}

function mouseUp(event) {    
  holding = false;
}

function mouseDown(event) {
  holding = true;
}
 //when the mouse is moved it returns mouse coords relative to window
function mouseMove(event) {
  var viewportCoords = getClickedCoords(event);
  mouseX = viewportCoords[0];   mouseY = viewportCoords[1];
}

//when the mouse wheel is use this is called
function mouseWheel(event) {
  var delta = 0;
  // Chromium
  if (event.wheelDelta) {
    delta = -event.wheelDelta / 20;
  }
  // Minefield
  else if (event.detail) {
    delta = event.detail * 4;
  }
  var curPos = cam.getPosition();
  var move = cam.getUp();
  if (-delta < 0) {
    move = c3dl.multiplyVector(move, -2)
    cam.setPosition(c3dl.addVectors(curPos, move));
  }
  else {
    move = c3dl.multiplyVector(move, 2)
    cam.setPosition(c3dl.addVectors(curPos, move));
  } 
}
  function getClickedCoords(event) {
    var canvas = scn.getCanvas();

    var canvasPosition = c3dl.getObjectPosition(canvas);
    // event.clientX and event.clientY contain where the user clicked 
    // on the client area of the browser
    // canvasPosition holds the coordinate of the top left corner where the canvas resides
    // on the client area.
    // window.pageXOffset, window.pageYOffset hold how much the user has scrolled.
    var X = event.clientX - canvasPosition[0] + window.pageXOffset - 1;
    var Y = event.clientY - canvasPosition[1] + window.pageYOffset - 1;
    return [X, Y];
  }
  
  
var keysDown = (
function keysDown() {
    var key_w = false,
        key_a = false,
        key_s = false,
        key_d = false;
    return {
      "KEY_W": key_w,
      "KEY_A": key_a,
      "KEY_S": key_s,
      "KEY_D": key_d,
    };
  })();
  
  //Keys
  const KEY_D = 68;
  const KEY_A = 65;
  const KEY_W = 87;
  const KEY_S = 83;
  
  function onKeyDown(event) {
    switch (event.keyCode) {
    case KEY_W:
      keysDown.KEY_W = true;
      break;
    case KEY_A:
      keysDown.KEY_A = true;
      break;
    case KEY_S:
      keysDown.KEY_S = true;
      break;
    case KEY_D:
      keysDown.KEY_D = true;
      break;
    default:
      break;
    }
  }

  //When a key is released down

  function onKeyUp(event) {
    switch (event.keyCode) {
    case KEY_W:
      keysDown.KEY_W = false;
      break;
    case KEY_A:
      keysDown.KEY_A = false;
      break;
    case KEY_S:
      keysDown.KEY_S = false;
      break;
    case KEY_D:
      keysDown.KEY_D = false;
      break;
    default:
      break;
    }
  }
